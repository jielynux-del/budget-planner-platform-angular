import { Component, ElementRef, computed, effect, inject, input, signal } from '@angular/core';
import {
  UiAmountInput, UiButton, UiCard, UiCheckbox, UiColumnHeader, UiDateInput, UiDropdownItem, UiInfoBanner,
  UiDropdownMenu, UiIcon, UiIconButton, UiModalShell, UiPagination, UiPill, UiPopover,
  UiFilterTabs, UiMultiSelect, UiSectionHeader, UiSegmented, UiSelect, UiStatusTag, UiTable, UiTableCard,
  UiTableHeader, UiTableRow, UiTextarea, UiTextInput,
  UiRadioChiclet, UiRadioChicletGroup, UiSnackbar, UiTabs, UiTooltipDirective,
  type UiFilterTab, type UiMenuItem, type UiPillColor, type UiSegment, type UiTab, type UiTagVariant
} from 'ai-dls-kit';
import {
  BENEFIT_STATUSES, CURRENT_USER, NON_FINANCIAL_CATEGORIES, financialTotal, latestUpdate,
  nextBaselineId, nextBenefitRef
} from '../../data/benefitsData';
import {
  BENEFIT_CATEGORIES, BENEFIT_DRIVERS, BENEFIT_MEASURES, FINANCIAL_TYPES
} from '../../data/lookups';
import type { Benefit, BenefitFieldChange, BenefitRow } from '../../data/models';
import { PEOPLE_NAMES, businessUnitsFor } from '../../data/people';
import { benefitsFor } from '../../data/benefitsStore';
import { currentPersona } from '../../data/personas';
import { Approvals } from '../approvals/approvals';

const ALL = 'All';

const LIFECYCLE_VARIANT: Record<string, UiTagVariant> = {
  'Tracking Active': 'neutral',
  'Closure Pending Approval': 'amber',
  'Closed': 'green'
};

const APPROVAL_VARIANT: Record<string, UiTagVariant> = {
  'Approved': 'green',
  'Pending Approval': 'amber',
  'Rejected': 'red'
};

/** Dot colour per lifecycle status, for the summary card. */
const STATUS_DOT: Record<string, UiPillColor> = {
  'Tracking Active': 'green',
  'Closure Pending Approval': 'yellow',
  'Closed': 'grey'
};

@Component({
  selector: 'app-value-benefits',
  imports: [
    UiCard, UiSelect, UiDateInput, UiButton, UiIcon, UiIconButton, UiPopover, UiSegmented,
    UiTableCard, UiTableHeader, UiTable, UiColumnHeader, UiTableRow, UiStatusTag, UiPill,
    UiFilterTabs, UiMultiSelect, UiDropdownMenu, UiDropdownItem, UiPagination, UiModalShell, UiSectionHeader, UiInfoBanner,
    UiTabs, UiTooltipDirective, UiSnackbar, UiRadioChicletGroup, UiRadioChiclet,
    Approvals,
    UiTextInput, UiTextarea, UiCheckbox, UiAmountInput
  ],
  templateUrl: './value-benefits.html',
  styleUrl: './value-benefits.scss'
})
export class ValueBenefits {
  readonly seeded = input.required<Benefit[]>({ alias: 'benefits' });
  readonly workstreamId = input.required<string>();

  /** The session store's list for this workstream, so edits persist. */
  protected readonly benefits = computed(() => benefitsFor(this.workstreamId())());

  protected readonly persona = currentPersona;

  /**
   * Requests on this workstream sitting with the signed-in persona. Routing
   * matches the approvals queue: baseline changes go to Finance, closures to
   * the Portfolio Approver.
   */
  protected readonly awaitingMe = computed(() => {
    const role = this.persona().role;
    if (!this.persona().canApprove) return [];
    return this.benefits().filter((b) =>
      (b.approvalStatus === 'Pending Approval' &&
        (b.pendingWith ?? 'Finance Business Partner') === role) ||
      (b.status === 'Closure Pending Approval' &&
        (b.pendingWith ?? 'Portfolio Approver') === role));
  });

  /** Requests on this workstream that were sent back for the requester to amend. */
  protected readonly needsRework = computed(() =>
    this.benefits().filter((b) =>
      b.approvalStatus === 'Changes Requested' || b.status === 'Closure Changes Requested'));

  protected readonly all = ALL;
  protected readonly ownerOptions = [ALL, ...PEOPLE_NAMES];
  /** The wizard picks real people, so it must not offer the filter's All sentinel. */
  protected readonly ownerChoices = PEOPLE_NAMES;
  protected readonly statusOptions = [ALL, ...BENEFIT_STATUSES];
  protected readonly typeOptions = [ALL, 'Financial', 'Non-Financial'];
  protected readonly approvalOptions = [ALL, 'Approved', 'Pending Approval', 'Rejected'];

  /** The table switches views in place rather than through page tabs. */
  protected readonly views: UiSegment[] = [
    { key: 'tracking', label: 'Benefits Tracking' },
    { key: 'baseline', label: 'Baseline Management' }
  ];
  protected readonly view = signal('tracking');

  /** A benefit lives on a workstream, so its approvals do too. */
  protected readonly pageTabs = computed<UiFilterTab[]>(() => [
    { key: 'benefits', label: 'Benefits' },
    { key: 'approvals', label: 'Approvals', count: this.outstanding().length || undefined }
  ]);
  protected readonly pageTab = signal('benefits');

  /** Everything on this workstream still waiting on a decision, whoever owns it. */
  protected readonly outstanding = computed(() =>
    this.benefits().filter((b) =>
      b.approvalStatus === 'Pending Approval' || b.status === 'Closure Pending Approval'));

  protected readonly filtersOpen = signal(false);
  protected readonly owner = signal(ALL);
  protected readonly status = signal(ALL);
  protected readonly realisationFrom = signal('');
  protected readonly realisationTo = signal('');

  /** Column filters are multi-select: empty means no filter on that column. */
  protected readonly colName = signal<string[]>([]);
  protected readonly colType = signal<string[]>([]);
  protected readonly colOwner = signal<string[]>([]);
  protected readonly colStatus = signal<string[]>([]);
  protected readonly colApproval = signal<string[]>([]);

  /** Summary tile filter — one lifecycle status, or the "all" sentinel. */
  protected readonly statusTile = signal(ALL);

  protected readonly page = signal(1);
  protected readonly pageSize = signal(10);

  /** Focus overlays: the benefit being viewed, and the one whose audit log is open. */
  protected readonly detailId = signal<string | null>(null);
  protected readonly auditId = signal<string | null>(null);

  protected readonly detail = computed(() =>
    this.benefits().find((b) => b.id === this.detailId()) ?? null);
  protected readonly audit = computed(() =>
    this.benefits().find((b) => b.id === this.auditId()) ?? null);

  protected readonly rowActions: UiMenuItem[] = [
    { key: 'update', label: 'Update Benefit' },
    { key: 'closure', label: 'Request Closure' }
  ];
  protected readonly baselineActions: UiMenuItem[] = [
    { key: 'change', label: 'Request Baseline Change' }
  ];

  /**
   * ui-kebab-menu owns its own open state, so two rows could be open at once.
   * The menu is composed from ui-dropdown-menu here instead, with the open row
   * held in one signal — only ever one.
   */
  protected readonly openMenuId = signal<string | null>(null);
  /** The row menu opens upward when the row sits too near the bottom to show it. */
  protected readonly menuUp = signal(false);

  protected toggleMenu(id: string, event: Event) {
    event.stopPropagation();
    if (this.openMenuId() === id) {
      this.openMenuId.set(null);
      return;
    }
    // ui-table-card clips its overflow, so a downward menu on one of the last
    // rows is rendered but invisible — which reads as a dead button.
    const trigger = event.currentTarget as HTMLElement;
    const scroller = trigger.closest('.vb-scroll');
    const room = scroller
      ? scroller.getBoundingClientRect().bottom - trigger.getBoundingClientRect().bottom
      : Number.POSITIVE_INFINITY;
    this.menuUp.set(room < 120);
    this.openMenuId.set(id);
  }

  protected closeMenu() { this.openMenuId.set(null); }

  protected readonly nameOptions = computed(() => this.benefits().map((b) => b.name));
  protected readonly typeChoices = ['Financial', 'Non-Financial'];
  protected readonly statusChoices = [...BENEFIT_STATUSES];
  protected readonly approvalChoices = ['Approved', 'Pending Approval', 'Changes Requested', 'Rejected'];

  protected readonly filtered = computed<Benefit[]>(() =>
    this.benefits().filter((b) =>
      (this.owner() === ALL || b.owners.includes(this.owner())) &&
      (this.status() === ALL || b.status === this.status()) &&
      (this.statusTile() === ALL || b.status === this.statusTile()) &&
      (!this.realisationFrom() || b.endDate >= this.realisationFrom()) &&
      (!this.realisationTo() || b.endDate <= this.realisationTo()) &&
      (!this.colName().length || this.colName().includes(b.name)) &&
      (!this.colType().length || this.colType().includes(b.type)) &&
      (!this.colOwner().length || b.owners.some((o) => this.colOwner().includes(o))) &&
      (!this.colStatus().length || this.colStatus().includes(b.status)) &&
      (!this.colApproval().length || this.colApproval().includes(b.approvalStatus))
    )
  );

  protected readonly rows = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

  /** Total plus one figure per lifecycle status, each of which filters the table. */
  protected readonly summary = computed(() => {
    const all = this.benefits();
    const pct = (n: number) => (all.length ? Math.round((n / all.length) * 100) : 0);
    return BENEFIT_STATUSES.map((s) => {
      const n = all.filter((b) => b.status === s).length;
      return { key: s as string, label: s as string, count: n, pct: pct(n), dot: STATUS_DOT[s] };
    });
  });

  protected readonly activeFilterCount = computed(() =>
    [this.owner() !== ALL, this.status() !== ALL, !!this.realisationFrom(), !!this.realisationTo()]
      .filter(Boolean).length);

  private readonly host = inject(ElementRef<HTMLElement>);

  /**
   * ui-popover places its panel once, on open, as position: fixed. Scrolling
   * the page therefore leaves it behind. Re-anchor it to the trigger for as
   * long as it is open.
   */
  private readonly anchorPopover = () => {
    if (!this.filtersOpen()) return;
    const root = this.host.nativeElement as HTMLElement;
    const panel = root.querySelector<HTMLElement>('ui-popover .ui-popover-panel');
    const trigger = root.querySelector<HTMLElement>('ui-popover button');
    if (!panel || !trigger) return;
    const t = trigger.getBoundingClientRect();
    const flipUp = t.bottom + 8 + panel.offsetHeight > window.innerHeight;
    panel.style.top = `${flipUp ? t.top - 8 - panel.offsetHeight : t.bottom + 8}px`;
    panel.style.left = `${t.right - panel.offsetWidth}px`;
  };

  constructor() {
    effect((onCleanup) => {
      if (!this.filtersOpen()) return;
      // Capture phase, so an inner scroller counts as well as the window.
      addEventListener('scroll', this.anchorPopover, true);
      addEventListener('resize', this.anchorPopover);
      onCleanup(() => {
        removeEventListener('scroll', this.anchorPopover, true);
        removeEventListener('resize', this.anchorPopover);
      });
    });

    // A confirmation clears itself; the snackbar stays dismissible meanwhile.
    effect((onCleanup) => {
      if (!this.toast()) return;
      this.toastTimer = setTimeout(() => this.toast.set(null), 6000);
      onCleanup(() => clearTimeout(this.toastTimer));
    });
  }

  protected latest(b: Benefit) { return latestUpdate(b); }

  /**
   * The owner column stays narrow, so it prints the first name and a count.
   * The full list is the tooltip's job — `ownerTooltip` below.
   */
  protected ownerLabel(owners: readonly string[]) {
    if (!owners.length) return '-';
    if (owners.length === 1) return owners[0];
    return `${owners[0]} + ${owners.length - 1} more`;
  }

  /** Null for a single owner: there is nothing the column isn't already showing. */
  protected ownerTooltip(owners: readonly string[]) {
    if (owners.length < 2) return null;
    return { title: `Benefit Owners (${owners.length})`, lines: [...owners] };
  }

  protected businessUnits(owners: readonly string[]) {
    return businessUnitsFor(owners).join(', ');
  }

  /** Same treatment as owners — categories are multi-select now. */
  protected categoryLabel(categories: readonly string[]) {
    if (!categories.length) return '-';
    if (categories.length === 1) return categories[0];
    return `${categories[0]} + ${categories.length - 1} more`;
  }

  protected categoryTooltip(categories: readonly string[]) {
    if (categories.length < 2) return null;
    return { title: `Categories (${categories.length})`, lines: [...categories] };
  }

  protected money(n: number | null) {
    return n === null ? '-' : 'S$' + Math.round(n).toLocaleString();
  }

  protected variance(n: number | null) {
    return n === null ? '' : (n > 0 ? '+' : '') + n.toFixed(1) + '%';
  }

  protected varianceColour(n: number | null): UiPillColor {
    return n === null ? 'grey' : n < 0 ? 'red' : 'green';
  }

  protected lifecycleVariant(s: string): UiTagVariant { return LIFECYCLE_VARIANT[s] ?? 'neutral'; }
  protected approvalVariant(s: string): UiTagVariant { return APPROVAL_VARIANT[s] ?? 'neutral'; }

  /** Banner CTA — show only what is waiting on a decision. */
  protected viewPending() {
    this.pageTab.set('benefits');
    this.view.set('tracking');
    this.statusTile.set('Closure Pending Approval');
    this.page.set(1);
  }

  protected toggleStatus(key: string) {
    this.statusTile.set(this.statusTile() === key ? ALL : key);
    this.page.set(1);
  }

  protected resetFilters() {
    this.owner.set(ALL);
    this.status.set(ALL);
    this.realisationFrom.set('');
    this.realisationTo.set('');
  }

  /**
   * Overlays slide up on open and down on close, so the element has to survive
   * the closing animation before it is removed.
   */
  protected readonly closingDetail = signal(false);
  protected readonly closingAudit = signal(false);
  protected readonly closingCreate = signal(false);
  private static readonly EXIT_MS = 220;

  /** Row click opens the benefit; the audit icon opens just its history. */
  protected openDetail(b: Benefit) {
    this.detailId.set(b.id);
    this.summaryEdit.set(false);
  }

  /* ---------------- Benefit Summary edit mode ---------------- */

  /**
   * Only the summary section enters edit mode; Reporting History and Baseline
   * History stay read-only, since both are append-only records rather than
   * editable state.
   */
  protected readonly summaryEdit = signal(false);

  protected readonly editName = signal('');
  protected readonly editOwners = signal<string[]>([]);
  protected readonly editCategories = signal<string[]>([]);
  protected readonly editDescription = signal('');
  protected readonly editValidationSource = signal('');
  protected readonly editStart = signal('');
  protected readonly editEnd = signal('');
  protected readonly editType = signal('Financial');
  protected readonly editStatus = signal('Tracking Active');
  protected readonly editBaseline = signal('');
  protected readonly editReason = signal('');

  /** Derived from the owners being edited — never typed in. */
  protected readonly editBusinessUnits = computed(() =>
    businessUnitsFor(this.editOwners()));

  protected startSummaryEdit(b: Benefit) {
    this.editName.set(b.name);
    this.editOwners.set([...b.owners]);
    this.editCategories.set([...b.categories]);
    this.editDescription.set(b.description);
    this.editValidationSource.set(b.validationSource);
    this.editStart.set(b.startDate);
    this.editEnd.set(b.endDate);
    this.editType.set(b.type);
    this.editStatus.set(b.status);
    this.editBaseline.set(b.currentApprovedBaseline !== null ? String(b.currentApprovedBaseline) : '');
    this.editReason.set('');
    this.summaryEdit.set(true);
  }

  protected cancelSummaryEdit() { this.summaryEdit.set(false); }

  /** The baseline figure changed, so a baseline approval is needed too. */
  protected readonly baselineChanged = computed(() => {
    const b = this.detail();
    if (!b) return false;
    const typed = this.editBaseline().trim();
    const next = typed === '' ? null : this.num(typed);
    return next !== b.currentApprovedBaseline;
  });

  /**
   * Saves an edit as REQUESTS, not as changes: the benefit keeps its approved
   * values until someone decides. Descriptive fields raise one request to the
   * Portfolio Approver; a changed baseline raises a separate BaselineRecord for
   * Finance. The two are independent and can be decided by different people.
   */
  protected saveSummaryEdit(b: Benefit) {
    const today = new Date().toISOString().slice(0, 10);
    const changes: BenefitFieldChange[] = [];
    const add = (key: string, label: string, from: string, to: string, value: unknown) => {
      if (from !== to) changes.push({ key, label, from, to, value });
    };

    add('name', 'Benefit Name', b.name, this.editName().trim(), this.editName().trim());
    add('owners', 'Benefit Owner', b.owners.join(', '), this.editOwners().join(', '), this.editOwners());
    add('categories', 'Benefit Category', b.categories.join(', '), this.editCategories().join(', '), this.editCategories());
    add('description', 'Benefit Description', b.description, this.editDescription().trim(), this.editDescription().trim());
    add('validationSource', 'Validation Source', b.validationSource, this.editValidationSource().trim(), this.editValidationSource().trim());
    add('startDate', 'Start date', b.startDate, this.editStart(), this.editStart());
    add('endDate', 'End date', b.endDate, this.editEnd(), this.editEnd());
    add('type', 'Benefit Type', b.type, this.editType(), this.editType());
    add('status', 'Benefit Status', b.status, this.editStatus(), this.editStatus());

    const baselineMoved = this.baselineChanged();
    if (!changes.length && !baselineMoved) {
      this.summaryEdit.set(false);
      return;
    }

    const typed = this.editBaseline().trim();
    const proposed = typed === '' ? null : this.num(typed);
    const newBaselineId = baselineMoved ? nextBaselineId(this.benefits()) : null;

    benefitsFor(this.workstreamId()).update((rows) =>
      rows.map((r) => {
        if (r.id !== b.id) return r;
        const audit = [...r.auditLog];
        if (changes.length) {
          audit.push({
            id: `ba-${Date.now()}`,
            date: today,
            user: CURRENT_USER,
            action: 'Benefit Update Requested',
            comments: `${changes.length} field${changes.length > 1 ? 's' : ''} submitted for approval — ${changes.map((c) => c.label).join(', ')}.`
          });
        }
        if (newBaselineId) {
          audit.push({
            id: `ba-${Date.now() + 1}`,
            date: today,
            user: CURRENT_USER,
            action: 'Baseline Change Requested',
            comments: `${newBaselineId} submitted for approval — ${this.editReason().trim() || 'baseline revised'}.`
          });
        }
        return {
          ...r,
          pendingUpdate: changes.length
            ? {
                id: `up-${Date.now()}`,
                fields: changes,
                requestedBy: CURRENT_USER,
                requestedOn: today,
                status: 'Pending Approval' as const
              }
            : r.pendingUpdate,
          approvalStatus: newBaselineId ? ('Pending Approval' as const) : r.approvalStatus,
          pendingWith: newBaselineId ? 'Finance Business Partner' : r.pendingWith,
          baselineHistory: newBaselineId
            ? [...r.baselineHistory, {
                baselineId: newBaselineId,
                baselineValue: proposed,
                startDate: this.editStart(),
                endDate: this.editEnd(),
                requestedBy: CURRENT_USER,
                requestedOn: today,
                approvedBy: '-',
                approvalDate: '-',
                changeReason: this.editReason().trim() || 'Baseline revised through benefit edit',
                status: 'Pending Approval' as const
              }]
            : r.baselineHistory,
          auditLog: audit
        };
      }));

    this.summaryEdit.set(false);
    this.toast.set(
      changes.length && baselineMoved
        ? 'Benefit update and baseline change submitted for approval'
        : baselineMoved
          ? 'Baseline change submitted for approval'
          : 'Benefit update submitted for approval');
  }
  protected openAudit(b: Benefit) { this.auditId.set(b.id); }

  /**
   * Closes any open kit dropdown before an overlay is torn down.
   *
   * v2 portals a `ui-dropdown-menu` panel to `document.body` — which is what
   * makes a multi-select usable inside a table column — but that puts it
   * outside Angular's view tree, so destroying the modal that owns the control
   * does NOT remove the panel. Closing with Escape leaves it orphaned on the
   * page; closing with Cancel does not, because the click itself reaches the
   * panel's outside-click handler first.
   *
   * So we take that same path deliberately: a pointerdown on the document lets
   * each open panel close ITSELF through its own handler. Removing the nodes
   * here instead would mean this app deleting DOM the kit owns.
   */
  private dismissOverlays() {
    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  }

  protected closeDetail() {
    this.dismissOverlays();
    this.closingDetail.set(true);
    setTimeout(() => { this.detailId.set(null); this.closingDetail.set(false); }, ValueBenefits.EXIT_MS);
  }

  protected closeAudit() {
    this.closingAudit.set(true);
    setTimeout(() => { this.auditId.set(null); this.closingAudit.set(false); }, ValueBenefits.EXIT_MS);
  }

  protected closeCreate() {
    this.dismissOverlays();
    this.closingCreate.set(true);
    setTimeout(() => { this.createOpen.set(false); this.closingCreate.set(false); }, ValueBenefits.EXIT_MS);
  }

  /* ---------------- baseline detail ---------------- */

  protected readonly baselineId = signal<string | null>(null);
  protected readonly closingBaseline = signal(false);
  protected readonly baselineOf = computed(() =>
    this.benefits().find((b) => b.id === this.baselineId()) ?? null);

  protected openBaseline(b: Benefit) { this.baselineId.set(b.id); }
  protected closeBaseline() {
    this.closingBaseline.set(true);
    setTimeout(() => { this.baselineId.set(null); this.closingBaseline.set(false); }, ValueBenefits.EXIT_MS);
  }

  /** Baseline history with the change each version made to the one before it. */
  protected baselineChain(b: Benefit) {
    return b.baselineHistory.map((h, i) => {
      const prev = i > 0 ? b.baselineHistory[i - 1] : null;
      const delta = prev && h.baselineValue !== null && prev.baselineValue !== null
        ? h.baselineValue - prev.baselineValue
        : null;
      const pct = delta !== null && prev?.baselineValue
        ? Math.round((delta / prev.baselineValue) * 1000) / 10
        : null;
      return { ...h, delta, pct, isCurrent: h.baselineId === b.baselineId };
    });
  }

  /** Audit entries that concern the baseline rather than reporting. */
  protected baselineAudit(b: Benefit) {
    return [...b.auditLog]
      .filter((a) => a.action.toLowerCase().includes('baseline'))
      .sort((x, y) => (x.date < y.date ? 1 : x.date > y.date ? -1 : 0));
  }

  /* ---------------- row actions ---------------- */

  /** Which action form is open, and for which benefit. */
  protected readonly actionKind = signal<'update' | 'closure' | 'change' | null>(null);
  protected readonly actionId = signal<string | null>(null);
  protected readonly closingAction = signal(false);
  protected readonly actionBenefit = computed(() =>
    this.benefits().find((b) => b.id === this.actionId()) ?? null);

  protected readonly formActual = signal('');
  protected readonly formProgress = signal('');
  protected readonly formExplanation = signal('');
  protected readonly formRootCause = signal('');
  protected readonly formCorrective = signal('');
  protected readonly formOutcome = signal('');
  protected readonly formComments = signal('');
  protected readonly formProposed = signal('');
  protected readonly formStart = signal('');
  protected readonly formEnd = signal('');
  protected readonly formReason = signal('');

  protected openAction(kind: 'update' | 'closure' | 'change', b: Benefit, event: Event) {
    event.stopPropagation();
    this.closeMenu();
    this.formActual.set('');
    this.formProgress.set('');
    this.formExplanation.set('');
    this.formRootCause.set('');
    this.formCorrective.set('');
    this.formOutcome.set(b.type === 'Financial'
      ? String(latestUpdate(b)?.actualValue ?? '')
      : latestUpdate(b)?.progressUpdate ?? '');
    this.formComments.set('');
    this.formProposed.set(b.currentApprovedBaseline !== null ? String(b.currentApprovedBaseline) : '');
    this.formStart.set(b.startDate);
    this.formEnd.set(b.endDate);
    this.formReason.set('');
    this.actionKind.set(kind);
    this.actionId.set(b.id);
  }

  protected closeAction() {
    this.closingAction.set(true);
    setTimeout(() => {
      this.actionKind.set(null);
      this.actionId.set(null);
      this.closingAction.set(false);
    }, ValueBenefits.EXIT_MS);
  }

  protected readonly actionTitle = computed(() =>
    this.actionKind() === 'update' ? 'Update Benefit'
      : this.actionKind() === 'closure' ? 'Request Closure'
      : 'Request Baseline Change');

  private today() { return new Date().toISOString().slice(0, 10); }
  private num(v: string) { return Number(String(v).replace(/[^0-9.-]/g, '')) || 0; }

  private patch(id: string, fn: (b: Benefit) => Benefit) {
    benefitsFor(this.workstreamId()).update((rows) => rows.map((b) => (b.id === id ? fn(b) : b)));
  }

  /** Reporting update — appends to history, never overwrites. */
  protected saveUpdate() {
    const b = this.actionBenefit();
    if (!b) return;
    const financial = b.type === 'Financial';
    const actual = financial ? this.num(this.formActual()) : null;
    const pct = financial && b.currentApprovedBaseline
      ? Math.round(((actual! - b.currentApprovedBaseline) / b.currentApprovedBaseline) * 1000) / 10
      : null;
    this.patch(b.id, (cur) => ({
      ...cur,
      reportingHistory: [...cur.reportingHistory, {
        id: `ru-${Date.now()}`,
        updateDate: this.today(),
        actualValue: actual,
        progressUpdate: financial ? '' : this.formProgress().trim(),
        variancePct: pct,
        varianceExplanation: this.formExplanation().trim(),
        rootCause: this.formRootCause().trim(),
        correctiveAction: this.formCorrective().trim(),
        updatedBy: CURRENT_USER,
        evidence: ''
      }],
      auditLog: [...cur.auditLog, {
        id: `ba-${Date.now()}`, date: this.today(), user: CURRENT_USER,
        action: 'Benefit Updated',
        comments: financial ? `Actuals reported — ${this.money(actual)}.` : 'Progress update recorded.'
      }]
    }));
    this.closeAction();
  }

  /** Closure request — status moves, nothing else is rewritten. */
  protected submitClosure() {
    const b = this.actionBenefit();
    if (!b) return;
    const outcome = this.formOutcome().trim();
    this.patch(b.id, (cur) => ({
      ...cur,
      status: 'Closure Pending Approval',
      pendingWith: 'Portfolio Approver',
      auditLog: [...cur.auditLog, {
        id: `ba-${Date.now()}`, date: this.today(), user: CURRENT_USER,
        action: 'Closure Submitted',
        comments: (cur.type === 'Financial'
          ? `Final realised value ${this.money(this.num(outcome))} submitted for approval.`
          : `${outcome} submitted for approval.`) +
          (this.formComments().trim() ? ` ${this.formComments().trim()}` : '')
      }]
    }));
    this.closeAction();
  }

  /**
   * Baseline change — appends a new BL id at Pending Approval. The current
   * approved baseline is untouched until someone approves it.
   */
  protected submitBaselineChange() {
    const b = this.actionBenefit();
    if (!b) return;
    const id = nextBaselineId(this.benefits());
    // A proposed baseline is accepted for any benefit — a non-financial one can
    // acquire a measurable baseline later. Blank means it stays unset.
    const proposed = this.formProposed().trim() ? this.num(this.formProposed()) : null;
    this.patch(b.id, (cur) => ({
      ...cur,
      baselineId: id,
      approvalStatus: 'Pending Approval',
      approvedBy: '-',
      approvalDate: '-',
      baselineHistory: [...cur.baselineHistory, {
        baselineId: id,
        baselineValue: proposed,
        startDate: this.formStart(),
        endDate: this.formEnd(),
        requestedBy: this.persona().name,
        requestedOn: this.today(),
        approvedBy: '-',
        approvalDate: '-',
        changeReason: this.formReason().trim(),
        status: 'Pending Approval'
      }],
      pendingWith: 'Finance Business Partner',
      auditLog: [...cur.auditLog, {
        id: `ba-${Date.now()}`, date: this.today(), user: CURRENT_USER,
        action: 'Baseline Change Requested',
        comments: `${id} submitted for approval` +
          (proposed !== null ? ` — proposed baseline ${this.money(proposed)}.` : '.')
      }]
    }));
    this.closeAction();
  }

  protected readonly actionValid = computed(() => {
    const b = this.actionBenefit();
    if (!b) return false;
    if (this.actionKind() === 'update') {
      return b.type === 'Financial' ? this.formActual().trim() !== '' : this.formProgress().trim() !== '';
    }
    if (this.actionKind() === 'closure') return this.formOutcome().trim() !== '';
    return this.formReason().trim() !== '' && this.formStart() !== '' && this.formEnd() !== '';
  });

  /* ---------------- Add New Benefit ---------------- */

  protected readonly createOpen = signal(false);

  protected readonly draftName = signal('');
  protected readonly draftOwners = signal<string[]>([]);
  protected readonly draftCategories = signal<string[]>([]);
  protected readonly draftDescription = signal('');
  protected readonly draftValidationSource = signal('');
  /** The prose baseline a non-financial benefit carries instead of a figure. */
  protected readonly draftBaselineDescription = signal('');

  /** Derived, never edited — RULES #8: a field the user cannot set is read-only. */
  protected readonly draftBusinessUnits = computed(() =>
    businessUnitsFor(this.draftOwners()));
  protected readonly draftFinancial = signal(true);
  protected readonly draftStart = signal('');
  protected readonly draftEnd = signal('');
  protected readonly draftLines = signal<BenefitRow[]>([]);
  /** The opening baseline, prefilled from the financial lines but editable. */
  protected readonly draftBaselineValue = signal('');
  protected readonly draftBaselineReason = signal('');

  protected readonly financialTypes = FINANCIAL_TYPES as unknown as string[];
  protected readonly driverOptions = BENEFIT_DRIVERS;
  protected readonly measureOptions = BENEFIT_MEASURES;
  /**
   * The financial table's columns are the years the benefit actually spans, so
   * they follow Start/End date rather than a fixed window. Falls back to the
   * current year alone until both dates are set, which keeps the table
   * rendering instead of collapsing to no columns.
   */
  protected readonly years = computed(() => {
    const from = Number(this.draftStart().slice(0, 4));
    const to = Number(this.draftEnd().slice(0, 4));
    if (!from || !to || to < from) return [new Date().getFullYear()];
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  });

  /**
   * One combined list. The with-financial-impact question moved to page 2, so
   * page 1 can no longer branch its category options on an answer the user has
   * not given yet — and a benefit can legitimately carry categories from both
   * sides now that the field is multi-select.
   */
  protected readonly categoryOptions = [
    ...BENEFIT_CATEGORIES,
    ...NON_FINANCIAL_CATEGORIES.filter((c) => !BENEFIT_CATEGORIES.includes(c))
  ];

  /**
   * Page tabs, not a stepper: the three pages are freely navigable, so there is
   * no current/completed/pending state to carry and no step counter to show.
   */
  protected readonly wizardTabs: UiTab[] = [
    { key: 'details', label: 'Benefit Details' },
    { key: 'baseline', label: 'Baseline Definition' },
    { key: 'review', label: 'Review' }
  ];
  protected readonly wizardTab = signal('details');

  protected readonly draftBaseline = computed(() => {
    if (!this.draftFinancial()) return null;
    const typed = this.draftBaselineValue().trim();
    return typed ? this.num(typed) : financialTotal(this.draftLines());
  });

  /** The kit's sentinel for a value that genuinely has none — RULES #7. */
  protected readonly emptyValue = '-';

  protected readonly startDateHint = {
    title: 'Start date',
    lines: ['The date where this benefit begins tracking.']
  };
  protected readonly endDateHint = {
    title: 'End date',
    lines: ['The date where this benefit is targeted to be realised.']
  };

  /** Both dates set — the financial table's year columns depend on them. */
  protected readonly datesSet = computed(() =>
    this.draftStart() !== '' && this.draftEnd() !== '');

  /**
   * Create is gated on the whole form, not one page: with freely navigable
   * tabs a user can reach Review without having visited Benefit Details.
   */
  protected readonly createValid = computed(() =>
    this.draftName().trim() !== '' && this.draftOwners().length > 0 &&
    this.draftStart() !== '' && this.draftEnd() !== '');

  protected openCreate() {
    this.wizardTab.set('details');
    this.draftName.set('');
    this.draftOwners.set([]);
    this.draftCategories.set([]);
    this.draftValidationSource.set('');
    this.draftBaselineDescription.set('');
    this.draftDescription.set('');
    this.draftFinancial.set(true);
    this.draftStart.set('');
    this.draftEnd.set('');
    this.draftLines.set([this.blankLine()]);
    this.draftBaselineValue.set('');
    this.draftBaselineReason.set('');
    this.createOpen.set(true);
  }

  private blankLine(): BenefitRow {
    return {
      id: `fr-${Date.now()}-${Math.round(Math.random() * 1e4)}`,
      benefitRef: '', typeOfFinancial: '', driver: '', measure: '', values: {}, comments: ''
    };
  }

  protected addLine() { this.draftLines.update((l) => [...l, this.blankLine()]); }

  // ui-select clears to null, so an unset line reads as an empty string.
  protected setLine(id: string, field: 'typeOfFinancial' | 'driver' | 'measure', value: string | null) {
    this.draftLines.update((rows) =>
      rows.map((r) => (r.id === id ? ({ ...r, [field]: value ?? '' } as BenefitRow) : r)));
  }

  protected setLineValue(id: string, year: number, value: string | null) {
    const n = Number(String(value).replace(/[^0-9.-]/g, '')) || 0;
    this.draftLines.update((rows) =>
      rows.map((r) => (r.id === id ? { ...r, values: { ...r.values, [year]: n } } : r)));
  }

  protected lineValue(row: BenefitRow, year: number) {
    return row.values[year] ? String(row.values[year]) : '';
  }

  protected lineTotal(row: BenefitRow) {
    return this.years().reduce((s, y) => s + (row.values[y] ?? 0), 0);
  }

  protected setFinancial(on: boolean) {
    this.draftFinancial.set(on);
  }

  /** Creates the benefit, its opening baseline and its first audit entry. */
  protected createBenefit() {
    const list = this.benefits();
    const financial = this.draftFinancial();
    const baseline = this.draftBaseline();
    const baselineId = nextBaselineId(list);
    const ref = nextBenefitRef(list);
    const today = new Date().toISOString().slice(0, 10);

    const benefit: Benefit = {
      id: `bf-${Date.now()}`,
      benefitRef: ref,
      name: this.draftName().trim(),
      type: financial ? 'Financial' : 'Non-Financial',
      categories: this.draftCategories(),
      description: this.draftDescription().trim(),
      validationSource: this.draftValidationSource().trim(),
      owners: this.draftOwners(),
      baselineId,
      originalApprovedBaseline: baseline,
      currentApprovedBaseline: baseline,
      startDate: this.draftStart(),
      endDate: this.draftEnd(),
      baselineDescription: financial ? '' : this.draftBaselineDescription().trim(),
      approvalStatus: 'Pending Approval',
      approvedBy: '-',
      approvalDate: '-',
      status: 'Tracking Active',
      pendingWith: 'Finance Business Partner',
      financialRows: financial ? this.draftLines().map((r) => ({ ...r, benefitRef: ref })) : [],
      baselineHistory: [{
        baselineId,
        baselineValue: baseline,
        startDate: this.draftStart(),
        endDate: this.draftEnd(),
        requestedBy: CURRENT_USER,
        requestedOn: today,
        approvedBy: '-',
        approvalDate: '-',
        changeReason: this.draftBaselineReason().trim() || 'Original baseline captured at benefit creation',
        status: 'Pending Approval'
      }],
      reportingHistory: [],
      auditLog: [{
        id: `ba-${Date.now()}`,
        date: today,
        user: CURRENT_USER,
        action: 'Baseline Created',
        comments: `${baselineId} submitted for approval — ${financial ? this.money(baseline) : 'non-financial benefit'}.`
      }]
    };

    benefitsFor(this.workstreamId()).update((rows) => [...rows, benefit]);
    this.closeCreate();
    this.toast.set('Benefit has been created and baseline is pending approval');
  }

  /* ---------------- Snackbar ---------------- */

  /**
   * One transient confirmation at a time. Held as a signal rather than pushed
   * into a service because nothing outside this page raises one yet — RULES #8
   * applies to invented infrastructure as much as to invented UI.
   */
  protected readonly toast = signal<string | null>(null);

  private toastTimer?: ReturnType<typeof setTimeout>;

  protected dismissToast() { this.toast.set(null); }

  /** Downloads the open benefit as CSV — summary, reporting history and audit log. */
  protected download(b: Benefit) {
    const q = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const lines: string[] = [
      'Benefit Summary', '',
      ['Field', 'Value'].map(q).join(','),
      ['Benefit Name', b.name].map(q).join(','),
      ['Benefit Ref', b.benefitRef].map(q).join(','),
      ['Benefit Type', b.type].map(q).join(','),
      ['Benefit Owner', b.owners.join('; ')].map(q).join(','),
      ['Original Approved Baseline', this.money(b.originalApprovedBaseline)].map(q).join(','),
      ['Current Approved Baseline', this.money(b.currentApprovedBaseline)].map(q).join(','),
      ['Baseline ID', b.baselineId].map(q).join(','),
      ['Benefit Status', b.status].map(q).join(','),
      ['Start Date', b.startDate].map(q).join(','),
      ['End Date', b.endDate].map(q).join(','),
      '', 'Reporting History', '',
      ['Update Date', 'Value / Progress', 'Variance %', 'Variance Explanation', 'Root Cause', 'Corrective Action', 'Updated By'].map(q).join(',')
    ];
    for (const r of b.reportingHistory) {
      lines.push([
        r.updateDate,
        b.type === 'Financial' ? this.money(r.actualValue) : r.progressUpdate,
        r.variancePct ?? '',
        r.varianceExplanation, r.rootCause, r.correctiveAction, r.updatedBy
      ].map(q).join(','));
    }
    lines.push('', 'Audit Log', '', ['Date', 'User', 'Action', 'Comments'].map(q).join(','));
    for (const a of b.auditLog) {
      lines.push([a.date, a.user, a.action, a.comments].map(q).join(','));
    }

    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${b.benefitRef}-${b.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Newest first, so the most recent entry is the one you land on. */
  protected auditEntries(b: Benefit) {
    return [...b.auditLog].sort((x, y) => (x.date < y.date ? 1 : x.date > y.date ? -1 : 0));
  }
}
