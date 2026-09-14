import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  UiButton, UiCard, UiColumnHeader, UiIcon, UiInfoBanner, UiModalShell, UiPill, UiSelect,
  UiStatusTag, UiTable, UiTableCard, UiTableHeader, UiTableRow, UiTextarea,
  type UiTagVariant
} from 'ai-dls-kit';
import { approvalQueue, benefitsFor, type ApprovalItem } from '../../data/benefitsStore';
import { currentPersona } from '../../data/personas';
import type { Benefit } from '../../data/models';

const ALL = 'All';

@Component({
  selector: 'app-approvals',
  imports: [
    UiCard, UiInfoBanner, UiSelect, UiButton, UiIcon, UiTableCard, UiTableHeader, UiTable,
    UiColumnHeader, UiTableRow, UiStatusTag, UiPill, UiModalShell, UiTextarea
  ],
  templateUrl: './approvals.html',
  styleUrl: './approvals.scss'
})
export class Approvals {
  private readonly router = inject(Router);

  /** Scopes the queue to one workstream — a benefit only exists on a workstream. */
  readonly workstreamId = input<string | null>(null);

  protected readonly persona = currentPersona;
  protected readonly all = ALL;
  protected readonly kindOptions = [ALL, 'Baseline Change', 'Benefit Update', 'Benefit Closure'];
  protected readonly stateOptions = [ALL, 'Pending Approval', 'Changes Requested'];

  protected readonly kind = signal(ALL);
  protected readonly state = signal(ALL);
  /** Re-runs the derived queue after a decision. */
  protected readonly version = signal(0);

  private readonly scoped = computed(() => {
    this.version();
    const ws = this.workstreamId();
    return ws ? approvalQueue().filter((i) => i.workstreamId === ws) : approvalQueue();
  });

  protected readonly queue = computed<ApprovalItem[]>(() =>
    this.scoped().filter((i) =>
      (this.kind() === ALL || i.kind === this.kind()) &&
      (this.state() === ALL || i.state === this.state())));

  /** What is sitting with the signed-in persona specifically. */
  protected readonly mine = computed(() => {
    const p = this.persona();
    return this.scoped().filter((i) => i.pendingWith === p.role && i.state === 'Pending Approval');
  });

  protected readonly myRework = computed(() =>
    this.scoped().filter((i) => i.state === 'Changes Requested'));

  protected readonly counts = computed(() => {
    const q = this.scoped();
    return {
      total: q.length,
      pending: q.filter((i) => i.state === 'Pending Approval').length,
      rework: q.filter((i) => i.state === 'Changes Requested').length
    };
  });

  /* ---------------- decision overlay ---------------- */

  protected readonly decisionFor = signal<ApprovalItem | null>(null);
  protected readonly decisionKind = signal<'approve' | 'rework' | 'reject' | null>(null);
  protected readonly decisionNote = signal('');
  protected readonly closingDecision = signal(false);

  protected readonly decisionTitle = computed(() =>
    this.decisionKind() === 'approve' ? 'Approve request'
      : this.decisionKind() === 'rework' ? 'Send back for rework'
      : 'Reject request');

  protected open(item: ApprovalItem, kind: 'approve' | 'rework' | 'reject') {
    this.decisionNote.set('');
    this.decisionKind.set(kind);
    this.decisionFor.set(item);
  }

  protected closeDecision() {
    this.closingDecision.set(true);
    setTimeout(() => {
      this.decisionFor.set(null);
      this.decisionKind.set(null);
      this.closingDecision.set(false);
    }, 220);
  }

  private today() { return new Date().toISOString().slice(0, 10); }

  private audit(b: Benefit, action: string, comments: string): Benefit {
    return {
      ...b,
      auditLog: [...b.auditLog, {
        id: `ba-${Date.now()}`, date: this.today(), user: this.persona().name, action, comments
      }]
    };
  }

  /** Applies the decision to the stored record and refreshes the queue. */
  protected submitDecision() {
    const item = this.decisionFor();
    const kind = this.decisionKind();
    if (!item || !kind) return;

    const store = benefitsFor(item.workstreamId);
    const note = this.decisionNote().trim();

    store.update((rows) => rows.map((b) => {
      if (b.id !== item.benefit.id) return b;

      if (item.kind === 'Baseline Change') {
        const idx = b.baselineHistory.length - 1;
        const history = b.baselineHistory.map((h, i) =>
          i === idx
            ? {
                ...h,
                status: (kind === 'approve' ? 'Approved' : kind === 'rework' ? 'Changes Requested' : 'Rejected') as Benefit['approvalStatus'],
                approvedBy: kind === 'approve' ? this.persona().name : '-',
                approvalDate: kind === 'approve' ? this.today() : '-',
                decisionNote: note
              }
            : h);
        const approved = kind === 'approve';
        return this.audit({
          ...b,
          baselineHistory: history,
          approvalStatus: approved ? 'Approved' : kind === 'rework' ? 'Changes Requested' : 'Rejected',
          // Only an approval promotes the proposed value to the current baseline.
          currentApprovedBaseline: approved ? history[idx].baselineValue : b.currentApprovedBaseline,
          startDate: approved ? history[idx].startDate : b.startDate,
          endDate: approved ? history[idx].endDate : b.endDate,
          approvedBy: approved ? this.persona().name : '-',
          approvalDate: approved ? this.today() : '-',
          pendingWith: approved || kind === 'reject' ? undefined : b.pendingWith
        },
        kind === 'approve' ? 'Baseline Change Approved'
          : kind === 'rework' ? 'Baseline Change Returned'
          : 'Baseline Change Rejected',
        `${item.reference} ${kind === 'approve' ? 'approved' : kind === 'rework' ? 'sent back for rework' : 'rejected'}.` +
          (note ? ` ${note}` : ''));
      }

      if (item.kind === 'Benefit Update') {
        const upd = b.pendingUpdate;
        if (!upd) return b;
        const approved = kind === 'approve';
        // Only an approval writes the requested values onto the benefit; a
        // rework keeps the request alive so the requester can amend it.
        const applied = approved
          ? upd.fields.reduce<Record<string, unknown>>((acc, f) => { acc[f.key] = f.value; return acc; }, {})
          : {};
        return this.audit({
          ...b,
          ...applied,
          // The staged reporting lines join the history only on approval —
          // they were part of the same review as the field changes.
          reportingHistory: approved
            ? [...b.reportingHistory, ...(upd.reportingLines ?? [])]
            : b.reportingHistory,
          pendingUpdate: kind === 'rework'
            ? { ...upd, status: 'Changes Requested' as const, decisionNote: note }
            : undefined
        } as Benefit,
        approved ? 'Benefit Update Approved'
          : kind === 'rework' ? 'Benefit Update Returned'
          : 'Benefit Update Rejected',
        `${this.updateSummary(upd)} ${approved ? 'approved' : kind === 'rework' ? 'sent back for rework' : 'rejected'}.` +
          (note ? ` ${note}` : ''));
      }

      // Benefit closure
      return this.audit({
        ...b,
        status: kind === 'approve' ? 'Closed'
          : kind === 'rework' ? 'Closure Changes Requested'
          : 'Tracking Active',
        pendingWith: kind === 'rework' ? b.pendingWith : undefined
      },
      kind === 'approve' ? 'Closure Approved'
        : kind === 'rework' ? 'Closure Returned'
        : 'Closure Rejected',
      `Closure ${kind === 'approve' ? 'approved' : kind === 'rework' ? 'sent back for rework' : 'rejected'}.` +
        (note ? ` ${note}` : ''));
    }));

    this.version.update((v) => v + 1);
    this.closeDecision();
  }

  /** What the request covers, for the audit line and the queue's detail cell. */
  private updateSummary(upd: NonNullable<Benefit['pendingUpdate']>) {
    const parts: string[] = [];
    if (upd.fields.length) parts.push(`${upd.fields.length} field${upd.fields.length > 1 ? 's' : ''}`);
    const lines = upd.reportingLines?.length ?? 0;
    if (lines) parts.push(`${lines} reporting line${lines > 1 ? 's' : ''}`);
    return parts.join(' and ') || 'No changes';
  }

  protected stateVariant(state: string): UiTagVariant {
    return state === 'Pending Approval' ? 'amber' : 'purple';
  }

  protected openWorkstream(item: ApprovalItem) {
    this.router.navigate(['/workstreams', item.workstreamId]);
  }
}
