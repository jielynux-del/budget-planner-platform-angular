import { Component, ElementRef, computed, effect, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  UiButton, UiCard, UiColumnHeader, UiIcon, UiInfoBanner, UiKebabMenu, UiModalShell,
  UiSelect, UiStatusTag, UiTable, UiTableCard, UiTableHeader, UiTableRow, UiTextarea,
  type UiMenuItem, type UiSelectOption, type UiTagVariant
} from 'ai-dls-kit';
import { approvalQueue, benefitsFor, type ApprovalItem } from '../../data/benefitsStore';
import { snapshotOf } from '../../data/benefitsData';
import { currentPersona } from '../../data/personas';
import type { Benefit } from '../../data/models';

const ALL = 'All';

@Component({
  selector: 'app-approvals',
  imports: [
    UiCard, UiInfoBanner, UiSelect, UiButton, UiIcon, UiKebabMenu, UiTableCard, UiTableHeader,
    UiTable, UiColumnHeader, UiTableRow, UiStatusTag, UiModalShell, UiTextarea
  ],
  templateUrl: './approvals.html',
  styleUrl: './approvals.scss'
})
export class Approvals {
  private readonly router = inject(Router);

  /** Scopes the queue to one workstream — a benefit only exists on a workstream. */
  readonly workstreamId = input<string | null>(null);

  /**
   * Reported upward rather than confirmed here: the page this queue is embedded
   * in already owns a snackbar, and two of them would sit on top of each other.
   */
  readonly decided = output<{ message: string; benefitId: string }>();

  protected readonly persona = currentPersona;
  protected readonly all = ALL;
  // Display text diverges from the underlying `kind` values the queue produces
  // ('Baseline Change' reads as 'Baseline Change Only' to a sponsor), so this
  // is an option list rather than the bare kind strings.
  protected readonly kindOptions: UiSelectOption[] = [
    { value: ALL, label: ALL },
    { value: 'Baseline Change', label: 'Baseline Change Only' },
    { value: 'Benefit Update', label: 'Benefit Update' },
    { value: 'Benefit Closure', label: 'Benefit Closure' }
  ];
  protected readonly stateOptions = [ALL, 'Pending Approval', 'Rework'];

  /** The two sponsor actions, offered from the row's kebab menu. */
  protected readonly rowActions: UiMenuItem[] = [
    { key: 'approve', label: 'Approve' },
    { key: 'rework', label: 'Send for rework' }
  ];

  protected readonly kind = signal(ALL);
  protected readonly state = signal(ALL);
  /** Re-runs the derived queue after a decision. */
  protected readonly version = signal(0);

  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    // `ui-kebab-menu` owns its open state and exposes no model for it, so two
    // rows can sit open at once and the consumer has no way to close one.
    // Pressing a second trigger therefore closes the first through the SAME
    // path the user would — a click on its own trigger — rather than by
    // removing panel DOM the kit owns.
    effect((onCleanup) => {
      const root = this.host.nativeElement as HTMLElement;
      const closeOthers = (event: Event) => {
        const target = event.target as HTMLElement | null;
        if (!target) return;
        for (const menu of Array.from(root.querySelectorAll('ui-kebab-menu'))) {
          if (menu.contains(target)) continue;
          const panel = menu.querySelector('ui-dropdown-menu');
          if (!panel || panel.getBoundingClientRect().height === 0) continue;
          menu.querySelector('button')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      };
      root.addEventListener('pointerdown', closeOthers, true);
      onCleanup(() => root.removeEventListener('pointerdown', closeOthers, true));
    });
  }

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
    this.scoped().filter((i) => i.state === 'Rework'));

  protected readonly counts = computed(() => {
    const q = this.scoped();
    return {
      pending: q.filter((i) => i.state === 'Pending Approval').length,
      rework: q.filter((i) => i.state === 'Rework').length
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

  protected open(item: ApprovalItem, kind: 'approve' | 'rework') {
    this.decisionNote.set('');
    this.decisionKind.set(kind);
    this.decisionFor.set(item);
  }

  /** Kebab menu selection, keyed the same as `rowActions`. */
  protected onRowAction(item: ApprovalItem, key: string) {
    if (key === 'approve' || key === 'rework') this.open(item, key);
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
    // Snapshot taken of `b` — the record AFTER the decision has been applied —
    // so the entry shows what the benefit became, not what it was leaving.
    return {
      ...b,
      auditLog: [...b.auditLog, {
        id: `ba-${Date.now()}`,
        date: this.today(),
        user: this.persona().name,
        action,
        comments,
        snapshot: snapshotOf(b)
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
                status: (kind === 'approve' ? 'Approved' : kind === 'rework' ? 'Rework' : 'Rejected') as Benefit['approvalStatus'],
                approvedBy: kind === 'approve' ? this.persona().name : '-',
                approvalDate: kind === 'approve' ? this.today() : '-',
                decisionNote: note
              }
            : h);
        const approved = kind === 'approve';
        return this.audit({
          ...b,
          baselineHistory: history,
          approvalStatus: approved ? 'Approved' : kind === 'rework' ? 'Rework' : 'Rejected',
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
        // A baseline moved in the same package has a pending record waiting in
        // the history; it is decided with everything else, not separately.
        const idx = b.baselineHistory.findIndex((h) => h.status === 'Pending Approval');
        const history = idx === -1 ? b.baselineHistory : b.baselineHistory.map((h, i) =>
          i === idx
            ? {
                ...h,
                status: (approved ? 'Approved' : kind === 'rework' ? 'Rework' : 'Rejected') as Benefit['approvalStatus'],
                approvedBy: approved ? this.persona().name : '-',
                approvalDate: approved ? this.today() : '-',
                decisionNote: note
              }
            : h);
        return this.audit({
          ...b,
          ...applied,
          baselineHistory: history,
          baselineId: approved && idx !== -1 ? history[idx].baselineId : b.baselineId,
          approvalStatus: idx === -1
            ? b.approvalStatus
            : (approved ? 'Approved' : kind === 'rework' ? 'Rework' : 'Rejected'),
          // The staged reporting lines join the history only on approval —
          // they were part of the same review as the field changes.
          reportingHistory: approved
            ? [...b.reportingHistory, ...(upd.reportingLines ?? [])]
            : b.reportingHistory,
          pendingUpdate: kind === 'rework'
            ? { ...upd, status: 'Rework' as const, decisionNote: note }
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
          : kind === 'rework' ? 'Closure Rework'
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
    if (item.kind === 'Benefit Closure' && kind === 'approve') {
      this.decided.emit({
        message: `${item.benefit.name} has been successfully closed`,
        benefitId: item.benefit.id
      });
    }
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

  /** Display text for the request-type column and filter. */
  protected kindLabel(kind: ApprovalItem['kind']): string {
    return kind === 'Baseline Change' ? 'Baseline Change Only' : kind;
  }

  /** A baseline moved as part of a benefit update reads as that update, not
   *  as a bare baseline change — only a request touching nothing else is
   *  "Baseline Change Only". */
  private static readonly BASELINE_ONLY_KEYS = new Set([
    'currentApprovedBaseline', 'financialRows', 'baselineDescription'
  ]);

  private changeTypeLabel(item: ApprovalItem): string {
    if (item.kind === 'Benefit Closure') return 'Closure';
    if (item.kind === 'Baseline Change') return 'Baseline Change Only';
    const fields = item.benefit.pendingUpdate?.fields ?? [];
    const baselineOnly = fields.length > 0 &&
      fields.every((f) => Approvals.BASELINE_ONLY_KEYS.has(f.key));
    return baselineOnly ? 'Baseline Change Only' : 'Benefit Update';
  }

  protected stateLabel(item: ApprovalItem): string {
    return `${item.state} (${this.changeTypeLabel(item)})`;
  }

  protected openWorkstream(item: ApprovalItem) {
    // This component only ever runs scoped to the workstream it's already
    // shown on (embedded in that workstream's Value/Benefits tab), so
    // `item.workstreamId` is always the current route id — navigating there
    // with no query change resolves to the SAME URL, and the router ignores
    // a same-URL navigation by default, making the button a no-op. Deep-link
    // to the Value/Benefits tab explicitly so the navigation actually changes
    // the URL (and stays correct if this ever surfaces cross-workstream).
    this.router.navigate(['/workstreams', item.workstreamId], {
      queryParams: { tab: 'value-benefits' }
    });
  }
}
