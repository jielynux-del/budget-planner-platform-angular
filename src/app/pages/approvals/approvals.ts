import { Component, ElementRef, computed, effect, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  UiButton, UiCard, UiColumnHeader, UiIcon, UiIconButton, UiInfoBanner, UiKebabMenu,
  UiModalShell, UiSelect, UiStatusTag, UiTable, UiTableCard, UiTableHeader, UiTableRow,
  UiTextarea,
  type UiMenuItem, type UiSelectOption, type UiTagVariant
} from 'ai-dls-kit';
import { approvalQueue, benefitsFor, type ApprovalItem } from '../../data/benefitsStore';
import { decide, type DecisionKind } from '../../data/decisions';
import { currentPersona } from '../../data/personas';
import type { Benefit } from '../../data/models';

const ALL = 'All';

@Component({
  selector: 'app-approvals',
  imports: [
    UiCard, UiInfoBanner, UiSelect, UiButton, UiKebabMenu, UiTableCard, UiTableHeader,
    UiTable, UiColumnHeader, UiTableRow, UiStatusTag, UiModalShell, UiTextarea,
    UiIcon, UiIconButton
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

  /** The audit overlay lives on the page above; one implementation serves both. */
  readonly viewAudit = output<string>();

  protected readonly persona = currentPersona;
  protected readonly all = ALL;
  // Display text diverges from the underlying `kind` values the queue produces
  // ('Baseline Change' reads as 'Baseline Change Only' to a sponsor), so this
  // is an option list rather than the bare kind strings.
  protected readonly kindOptions: UiSelectOption[] = [
    { value: ALL, label: 'All changes' },
    { value: 'Baseline Change', label: 'Baseline Change Only' },
    { value: 'Benefit Update', label: 'Benefit Update' },
    { value: 'Benefit Closure', label: 'Benefit Closure' }
  ];
  protected readonly stateOptions: UiSelectOption[] = [
    { value: ALL, label: 'All statuses' },
    { value: 'Pending Approval', label: 'Pending Approval' },
    { value: 'Rework', label: 'Rework' }
  ];

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
  protected readonly decisionKind = signal<DecisionKind | null>(null);
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

  /** Summary tiles are a second face on the same `state` filter as the
   *  select — clicking one sets it, clicking the active one clears it. */
  protected toggleState(value: string) {
    this.state.set(this.state() === value ? ALL : value);
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

  /** Applies the decision to the stored record and refreshes the queue. */
  /** A rework must say why — the requester cannot act on a bare "no". */
  protected readonly decisionValid = computed(() =>
    this.decisionKind() !== 'rework' || this.decisionNote().trim() !== '');

  protected submitDecision() {
    const item = this.decisionFor();
    const kind = this.decisionKind();
    if (!item || !kind || !this.decisionValid()) return;

    const decision = {
      kind,
      note: this.decisionNote().trim(),
      approver: this.persona().name,
      reference: item.reference
    };

    benefitsFor(item.workstreamId).update((rows) =>
      rows.map((b) => (b.id === item.benefit.id ? decide(b, item.kind, decision) : b)));

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

  /**
   * Opens the benefit itself, not the workstream. A queue row is a request
   * ABOUT a benefit, and the benefit's page is where it can actually be read
   * — and, for a sponsor, decided. Everyone gets this, whether or not they
   * can act on it: being unable to approve is no reason to be unable to look.
   */
  protected openRequest(item: ApprovalItem) {
    this.router.navigate(['/workstreams', item.workstreamId], {
      queryParams: { tab: 'value-benefits', benefit: item.benefit.benefitRef }
    });
  }

}
