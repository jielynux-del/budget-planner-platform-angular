import { signal, type WritableSignal } from '@angular/core';
import { defaultBenefits } from './benefitsData';
import { ATS_RECORDS, atsById } from './ats';
import type { Benefit } from './models';

/**
 * Session store for benefit records, keyed by ATS request. Held here rather
 * than derived per screen so an edit survives navigation, and so the approvals
 * queue can see every request's benefits at once.
 *
 * Benefits moved from the workstream to the ATS: they are logged and tracked
 * against the request that funds them, and travel with it through approval.
 */
const store = new Map<string, WritableSignal<Benefit[]>>();

export function benefitsFor(atsId: string): WritableSignal<Benefit[]> {
  let entry = store.get(atsId);
  if (!entry) {
    const ats = atsById(atsId);
    entry = signal<Benefit[]>(ats ? defaultBenefits(ats) : []);
    store.set(atsId, entry);
  }
  return entry;
}

export interface ApprovalItem {
  benefit: Benefit;
  atsId: string;
  atsName: string;
  /** What is being decided. */
  kind: 'Baseline Change' | 'Benefit Closure' | 'Benefit Update';
  reference: string;
  requestedBy: string;
  requestedOn: string;
  pendingWith: string;
  /** Waiting on a decision, or sent back to the requester to amend. */
  state: 'Pending Approval' | 'Rework';
  detail: string;
}



/**
 * Every live request across the portfolio — the queue behind the approvals
 * table. Derived rather than stored, so it can never drift from the records.
 */
export function approvalQueue(): ApprovalItem[] {
  const items: ApprovalItem[] = [];

  for (const ats of ATS_RECORDS) {
    for (const b of benefitsFor(ats.id)()) {
      const latestBaseline = b.baselineHistory[b.baselineHistory.length - 1];

      // A baseline moved through Update benefit is part of THAT package and is
      // decided with it, so it must not also stand as its own queue item. Only
      // a baseline raised on its own (Request Baseline Change) queues here.
      const baselineInPackage = b.pendingUpdate?.status === 'Pending Approval';

      if (!baselineInPackage &&
          (b.approvalStatus === 'Pending Approval' || b.approvalStatus === 'Rework')) {
        items.push({
          benefit: b,
          atsId: ats.id,
          atsName: ats.name,
          kind: 'Baseline Change',
          reference: b.baselineId,
          requestedBy: latestBaseline?.requestedBy ?? '-',
          requestedOn: latestBaseline?.requestedOn ?? latestBaseline?.startDate ?? '-',
          pendingWith: b.pendingWith ?? 'Sponsor',
          state: b.approvalStatus,
          detail: latestBaseline?.changeReason ?? ''
        });
      }

      const upd = b.pendingUpdate;
      if (upd && (upd.status === 'Pending Approval' || upd.status === 'Rework')) {
        items.push({
          benefit: b,
          atsId: ats.id,
          atsName: ats.name,
          kind: 'Benefit Update',
          reference: b.benefitRef,
          requestedBy: upd.requestedBy,
          requestedOn: upd.requestedOn,
          // Descriptive changes are a portfolio governance matter, so they do
          // not share the baseline queue's approver.
          pendingWith: 'Sponsor',
          state: upd.status,
          detail: [
            ...upd.fields.map((f) => `${f.label}: ${f.from || '-'} → ${f.to || '-'}`),
            ...(upd.reportingLines?.length
              ? [`${upd.reportingLines.length} new reporting line${upd.reportingLines.length > 1 ? 's' : ''}`]
              : [])
          ].join('; ')
        });
      }

      if (b.status === 'Closure Pending Approval' || b.status === 'Closure Rework') {
        const submitted = [...b.auditLog].reverse().find((a) => a.action.includes('Closure Submitted'));
        items.push({
          benefit: b,
          atsId: ats.id,
          atsName: ats.name,
          kind: 'Benefit Closure',
          reference: b.benefitRef,
          requestedBy: submitted?.user ?? '-',
          requestedOn: submitted?.date ?? '-',
          pendingWith: b.pendingWith ?? 'Sponsor',
          state: b.status === 'Closure Pending Approval' ? 'Pending Approval' : 'Rework',
          detail: submitted?.comments ?? ''
        });
      }
    }
  }

  return items.sort((a, b) => (a.requestedOn < b.requestedOn ? 1 : -1));
}
