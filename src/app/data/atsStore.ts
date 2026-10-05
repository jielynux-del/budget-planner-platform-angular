import { computed, signal } from '@angular/core';
import { ATS_RECORDS, type Ats, type AtsAuditEntry, type AtsStatus } from './ats';

/**
 * Session store for ATS requests.
 *
 * `ATS_RECORDS` is the seed; this is the living copy. A request is the unit
 * that gets approved — everything in it, benefits included, is approved with
 * it — so its status has to be something the app can move, not a constant.
 */
const records = signal<Ats[]>(ATS_RECORDS.map((a) => ({ ...a, auditLog: [...a.auditLog] })));

export const allAts = records.asReadonly();

export const atsRecord = (id: string) => computed(() => records().find((a) => a.id === id) ?? null);

/** Counts behind the listing's status pills, from the live records. */
export function atsStatusCounts() {
  const counts = new Map<string, number>();
  for (const a of records()) counts.set(a.status, (counts.get(a.status) ?? 0) + 1);
  return counts;
}

const today = () => new Date().toISOString().slice(0, 10);

function patch(id: string, fn: (a: Ats) => Ats) {
  records.update((rows) => rows.map((a) => (a.id === id ? fn(a) : a)));
}

function entry(a: Ats, user: string, action: string, comments: string): AtsAuditEntry {
  return { id: `${a.id}-t${a.auditLog.length + 1}-${Date.now()}`, date: today(), user, action, comments };
}

/**
 * Which transitions exist, in one place.
 *
 * A request is editable while it is the requester's — Draft, or returned for
 * rework. It is the approver's while Pending Approval, and nobody's once it is
 * Approved or Closed.
 */
export const canSubmit = (a: Ats | null) =>
  !!a && (a.status === 'Draft' || a.status === 'Sent for Rework');

export const canDecide = (a: Ats | null) => !!a && a.status === 'Pending Approval';

/** Sends the request, and everything in it, to its DOA approver. */
export function submitAts(id: string, user: string) {
  patch(id, (a) => ({
    ...a,
    status: 'Pending Approval' as AtsStatus,
    submittedBy: user,
    submittedOn: today(),
    // Cleared on resubmission: the note described the version being replaced.
    reworkNote: undefined,
    lastEditedBy: user,
    lastEditedOn: today(),
    auditLog: [...a.auditLog, entry(a, user, 'Submitted for Approval',
      a.reworkNote ? 'Resubmitted after rework.' : 'Sent to the DOA approver.')]
  }));
}

export function approveAts(id: string, user: string, note: string) {
  patch(id, (a) => ({
    ...a,
    status: 'Approved' as AtsStatus,
    approvedDate: today(),
    reworkNote: undefined,
    lastEditedBy: user,
    lastEditedOn: today(),
    auditLog: [...a.auditLog, entry(a, user, 'Approved',
      note.trim() || 'Approved within delegated authority.')]
  }));
}

/** Returns it to the requester. The note is required — see the dialog. */
export function reworkAts(id: string, user: string, note: string) {
  patch(id, (a) => ({
    ...a,
    status: 'Sent for Rework' as AtsStatus,
    reworkNote: note.trim(),
    lastEditedBy: user,
    lastEditedOn: today(),
    auditLog: [...a.auditLog, entry(a, user, 'Sent for Rework', note.trim())]
  }));
}
