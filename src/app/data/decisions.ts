import { snapshotOf } from './benefitsData';
import type { AuditEntry, Benefit } from './models';

/**
 * Deciding on a request, in one place.
 *
 * A sponsor can now reach a decision from two directions — the approval queue,
 * or the benefit's own page after reading it — and both must produce exactly
 * the same record. Kept as a pure function over a Benefit so neither component
 * owns the rules, and neither can drift from the other.
 */
export type DecisionKind = 'approve' | 'rework';

export type RequestKind = 'Baseline Change' | 'Benefit Update' | 'Benefit Closure';

export interface Decision {
  kind: DecisionKind;
  /** Required for a rework: the requester cannot act on "no". */
  note: string;
  approver: string;
  /** What the queue called this request, for the audit line. */
  reference: string;
}

const today = () => new Date().toISOString().slice(0, 10);

function audit(b: Benefit, user: string, action: string, comments: string): Benefit {
  const entry: AuditEntry = {
    id: `ba-${Date.now()}-${Math.round(Math.random() * 1e4)}`,
    date: today(),
    user,
    action,
    comments,
    // Taken of the record AFTER the decision, so the entry shows what the
    // benefit became rather than what it was leaving.
    snapshot: snapshotOf(b)
  };
  return { ...b, auditLog: [...b.auditLog, entry] };
}

/** What the request covers, for the audit line. */
function updateSummary(upd: NonNullable<Benefit['pendingUpdate']>) {
  const parts: string[] = [];
  if (upd.fields.length) parts.push(`${upd.fields.length} field${upd.fields.length > 1 ? 's' : ''}`);
  const lines = upd.reportingLines?.length ?? 0;
  if (lines) parts.push(`${lines} reporting line${lines > 1 ? 's' : ''}`);
  return parts.join(' and ') || 'No changes';
}

export function decide(b: Benefit, requestKind: RequestKind, d: Decision): Benefit {
  const approved = d.kind === 'approve';
  const verb = approved ? 'approved' : 'sent back for rework';
  const status = (approved ? 'Approved' : 'Rework') as Benefit['approvalStatus'];
  const stamp = <T extends { status: unknown }>(h: T) => ({
    ...h,
    status,
    approvedBy: approved ? d.approver : '-',
    approvalDate: approved ? today() : '-',
    decisionNote: d.note
  });

  if (requestKind === 'Baseline Change') {
    const idx = b.baselineHistory.length - 1;
    const history = b.baselineHistory.map((h, i) => (i === idx ? stamp(h) : h));
    return audit({
      ...b,
      baselineHistory: history,
      approvalStatus: status,
      // Only an approval promotes the proposed value to the current baseline.
      currentApprovedBaseline: approved ? history[idx].baselineValue : b.currentApprovedBaseline,
      startDate: approved ? history[idx].startDate : b.startDate,
      endDate: approved ? history[idx].endDate : b.endDate,
      approvedBy: approved ? d.approver : '-',
      approvalDate: approved ? today() : '-',
      pendingWith: approved ? undefined : b.pendingWith
    },
    d.approver,
    approved ? 'Baseline Change Approved' : 'Baseline Change Returned',
    `${d.reference} ${verb}.` + (d.note ? ` ${d.note}` : ''));
  }

  if (requestKind === 'Benefit Update') {
    const upd = b.pendingUpdate;
    if (!upd) return b;
    // Only an approval writes the requested values onto the benefit; a rework
    // keeps the request alive so the requester can amend and resubmit it.
    const applied = approved
      ? upd.fields.reduce<Record<string, unknown>>((acc, f) => { acc[f.key] = f.value; return acc; }, {})
      : {};
    // A baseline moved in the same package has a pending record waiting in the
    // history; it is decided with everything else, not separately.
    const idx = b.baselineHistory.findIndex((h) => h.status === 'Pending Approval');
    const history = idx === -1 ? b.baselineHistory : b.baselineHistory.map((h, i) => (i === idx ? stamp(h) : h));
    return audit({
      ...b,
      ...applied,
      baselineHistory: history,
      baselineId: approved && idx !== -1 ? history[idx].baselineId : b.baselineId,
      approvalStatus: idx === -1 ? b.approvalStatus : status,
      // The staged reporting lines join the history only on approval — they
      // were part of the same review as the field changes.
      reportingHistory: approved
        ? [...b.reportingHistory, ...(upd.reportingLines ?? [])]
        : b.reportingHistory,
      pendingUpdate: approved
        ? undefined
        : { ...upd, status: 'Rework' as const, decisionNote: d.note }
    } as Benefit,
    d.approver,
    approved ? 'Benefit Update Approved' : 'Benefit Update Returned',
    `${updateSummary(upd)} ${verb}.` + (d.note ? ` ${d.note}` : ''));
  }

  return audit({
    ...b,
    status: approved ? 'Closed' : 'Closure Rework',
    pendingWith: approved ? undefined : b.pendingWith,
    closureNote: approved ? undefined : d.note
  } as Benefit,
  d.approver,
  approved ? 'Closure Approved' : 'Closure Returned',
  `Closure ${verb}.` + (d.note ? ` ${d.note}` : ''));
}

/**
 * The note a requester still has to act on, if any. Drives the banner that
 * cannot be dismissed until the work is resubmitted.
 */
export function reworkNote(b: Benefit): string | null {
  if (b.pendingUpdate?.status === 'Rework') return b.pendingUpdate.decisionNote || 'No comments given.';
  if (b.status === 'Closure Rework') return b.closureNote || 'No comments given.';
  if (b.approvalStatus === 'Rework') {
    const last = [...b.baselineHistory].reverse().find((h) => h.status === 'Rework');
    return last?.decisionNote || 'No comments given.';
  }
  return null;
}
