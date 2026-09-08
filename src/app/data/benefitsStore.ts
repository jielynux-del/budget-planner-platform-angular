import { signal, type WritableSignal } from '@angular/core';
import { defaultBenefits } from './benefitsData';
import { workstreams } from './workstreams';
import type { Benefit } from './models';

/**
 * Session store for benefit records, keyed by workstream. Held here rather than
 * derived per screen so an edit survives navigation, and so the approvals queue
 * can see every workstream's benefits at once.
 */
const store = new Map<string, WritableSignal<Benefit[]>>();

export function benefitsFor(workstreamId: string): WritableSignal<Benefit[]> {
  let entry = store.get(workstreamId);
  if (!entry) {
    const ws = workstreams.find((w) => w.id === workstreamId);
    entry = signal<Benefit[]>(ws ? defaultBenefits(ws) : []);
    store.set(workstreamId, entry);
  }
  return entry;
}

export interface ApprovalItem {
  benefit: Benefit;
  workstreamId: string;
  workstreamName: string;
  /** What is being decided. */
  kind: 'Baseline Change' | 'Benefit Closure';
  reference: string;
  requestedBy: string;
  requestedOn: string;
  pendingWith: string;
  /** Waiting on a decision, or sent back to the requester to amend. */
  state: 'Pending Approval' | 'Changes Requested';
  detail: string;
}

/** Only workstreams a user could plausibly have open are seeded, to keep it quick. */
const SCOPE = 24;

/**
 * Every live request across the portfolio — the queue behind the approvals
 * table. Derived rather than stored, so it can never drift from the records.
 */
export function approvalQueue(): ApprovalItem[] {
  const items: ApprovalItem[] = [];

  for (const ws of workstreams.slice(0, SCOPE)) {
    for (const b of benefitsFor(ws.id)()) {
      const latestBaseline = b.baselineHistory[b.baselineHistory.length - 1];

      if (b.approvalStatus === 'Pending Approval' || b.approvalStatus === 'Changes Requested') {
        items.push({
          benefit: b,
          workstreamId: ws.id,
          workstreamName: ws.name,
          kind: 'Baseline Change',
          reference: b.baselineId,
          requestedBy: latestBaseline?.requestedBy ?? '-',
          requestedOn: latestBaseline?.requestedOn ?? latestBaseline?.effectiveDate ?? '-',
          pendingWith: b.pendingWith ?? 'Finance Business Partner',
          state: b.approvalStatus,
          detail: latestBaseline?.changeReason ?? ''
        });
      }

      if (b.status === 'Closure Pending Approval' || b.status === 'Closure Changes Requested') {
        const submitted = [...b.auditLog].reverse().find((a) => a.action.includes('Closure Submitted'));
        items.push({
          benefit: b,
          workstreamId: ws.id,
          workstreamName: ws.name,
          kind: 'Benefit Closure',
          reference: b.benefitRef,
          requestedBy: submitted?.user ?? '-',
          requestedOn: submitted?.date ?? '-',
          pendingWith: b.pendingWith ?? 'Portfolio Approver',
          state: b.status === 'Closure Pending Approval' ? 'Pending Approval' : 'Changes Requested',
          detail: submitted?.comments ?? ''
        });
      }
    }
  }

  return items.sort((a, b) => (a.requestedOn < b.requestedOn ? 1 : -1));
}
