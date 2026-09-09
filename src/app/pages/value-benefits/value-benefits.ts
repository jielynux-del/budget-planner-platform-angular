import { Component, ElementRef, computed, effect, inject, input, signal } from '@angular/core';
import {
  UiAmountInput, UiButton, UiCard, UiCheckbox, UiColumnHeader, UiDateInput, UiDropdownItem, UiInfoBanner,
  UiDropdownMenu, UiIcon, UiIconButton, UiModalShell, UiPagination, UiPill, UiPopover,
  UiFilterTabs, UiMultiSelect, UiSectionHeader, UiSegmented, UiSelect, UiStatusTag, UiStepper, UiTable, UiTableCard,
  UiTableHeader, UiTableRow, UiTextarea, UiTextInput,
  type UiFilterTab, type UiMenuItem, type UiPillColor, type UiSegment, type UiStepperStep, type UiTagVariant
} from 'ai-dls-kit';
import {
  BENEFIT_STATUSES, CURRENT_USER, NON_FINANCIAL_CATEGORIES, financialTotal, latestUpdate,
  nextBaselineId, nextBenefitRef
} from '../../data/benefitsData';
import {
  BENEFIT_CATEGORIES, BENEFIT_DRIVERS, BENEFIT_MEASURES, BENEFIT_OWNERS, FINANCIAL_TYPES
} from '../../data/lookups';
import type { Benefit, BenefitRow } from '../../data/models';
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
    UiFilterTabs, UiMultiSelect, UiDropdownMenu, UiDropdownItem, UiPagination, UiModalShell, UiSectionHeader, UiStepper, UiInfoBanner,
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
  protected readonly ownerOptions = [ALL, ...BENEFIT_OWNERS];
  /** The wizard picks a real owner, so it must not offer the filter's All sentinel. */
  protected readonly ownerChoices = BENEFIT_OWNERS;
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

  protected toggleMenu(id: string, event: Event) {
    event.stopPropagation();
    this.openMenuId.set(this.openMenuId() === id ? null : id);
  }

  protected closeMenu() { this.openMenuId.set(null); }

  protected readonly nameOptions = computed(() => this.benefits().map((b) => b.name));
  protected readonly typeChoices = ['Financial', 'Non-Financial'];
  protected readonly statusChoices = [...BENEFIT_STATUSES];
  protected readonly approvalChoices = ['Approved', 'Pending Approval', 'Changes Requested', 'Rejected'];

  protected readonly filtered = computed<Benefit[]>(() =>
    this.benefits().filter((b) =>
      (this.owner() === ALL || b.owner === this.owner()) &&
      (this.status() === ALL || b.status === this.status()) &&
      (this.statusTile() === ALL || b.status === this.statusTile()) &&
      (!this.realisationFrom() || b.targetRealisationDate >= this.realisationFrom()) &&
      (!this.realisationTo() || b.targetRealisationDate <= this.realisationTo()) &&
      (!this.colName().length || this.colName().includes(b.name)) &&
      (!this.colType().length || this.colType().includes(b.type)) &&
      (!this.colOwner().length || this.colOwner().includes(b.owner)) &&
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
  }

  protected latest(b: Benefit) { return latestUpdate(b); }

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
  protected openDetail(b: Benefit) { this.detailId.set(b.id); }
  protected openAudit(b: Benefit) { this.auditId.set(b.id); }

  protected closeDetail() {
    this.closingDetail.set(true);
    setTimeout(() => { this.detailId.set(null); this.closingDetail.set(false); }, ValueBenefits.EXIT_MS);
  }

  protected closeAudit() {
    this.closingAudit.set(true);
    setTimeout(() => { this.auditId.set(null); this.closingAudit.set(false); }, ValueBenefits.EXIT_MS);
  }

  protected closeCreate() {
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
  protected readonly formEffective = signal('');
  protected readonly formTarget = signal('');
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
    this.formEffective.set(b.effectiveDate);
    this.formTarget.set(b.targetRealisationDate);
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
    const proposed = b.type === 'Financial' ? this.num(this.formProposed()) : null;
    this.patch(b.id, (cur) => ({
      ...cur,
      baselineId: id,
      approvalStatus: 'Pending Approval',
      approvedBy: '-',
      approvalDate: '-',
      baselineHistory: [...cur.baselineHistory, {
        baselineId: id,
        baselineValue: proposed,
        effectiveDate: this.formEffective(),
        targetRealisationDate: this.formTarget(),
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
    return this.formReason().trim() !== '' && this.formEffective() !== '' && this.formTarget() !== '';
  });

  /* ---------------- Add New Benefit ---------------- */

  protected readonly createOpen = signal(false);
  protected readonly step = signal(1);

  protected readonly draftName = signal('');
  protected readonly draftOwner = signal('');
  protected readonly draftCategory = signal('');
  protected readonly draftDescription = signal('');
  protected readonly draftFinancial = signal(true);
  protected readonly draftEffective = signal('');
  protected readonly draftTarget = signal('');
  protected readonly draftLines = signal<BenefitRow[]>([]);
  /** The opening baseline, prefilled from the financial lines but editable. */
  protected readonly draftBaselineValue = signal('');
  protected readonly draftBaselineReason = signal('');

  protected readonly financialTypes = FINANCIAL_TYPES as unknown as string[];
  protected readonly driverOptions = BENEFIT_DRIVERS;
  protected readonly measureOptions = BENEFIT_MEASURES;
  protected readonly years = [2024, 2025, 2026];

  protected readonly categoryOptions = computed(() =>
    this.draftFinancial() ? BENEFIT_CATEGORIES : NON_FINANCIAL_CATEGORIES);

  protected readonly lastStep = computed(() => (this.draftFinancial() ? 3 : 1));

  protected readonly steps = computed<UiStepperStep[]>(() => {
    const labels = this.draftFinancial()
      ? ['Key Benefits', 'Financial and Stat Impact', 'Total Investments & Benefits']
      : ['Key Benefits'];
    return labels.map((label, i) => ({
      key: String(i + 1),
      label,
      status: this.step() === i + 1 ? 'current' : this.step() > i + 1 ? 'completed' : 'pending'
    })) as UiStepperStep[];
  });

  protected readonly draftBaseline = computed(() => {
    if (!this.draftFinancial()) return null;
    const typed = this.draftBaselineValue().trim();
    return typed ? this.num(typed) : financialTotal(this.draftLines());
  });

  protected readonly step1Valid = computed(() =>
    this.draftName().trim() !== '' && this.draftOwner() !== '' &&
    this.draftEffective() !== '' && this.draftTarget() !== '');

  protected openCreate() {
    this.step.set(1);
    this.draftName.set('');
    this.draftOwner.set('');
    this.draftCategory.set('');
    this.draftDescription.set('');
    this.draftFinancial.set(true);
    this.draftEffective.set('');
    this.draftTarget.set('');
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
    return this.years.reduce((s, y) => s + (row.values[y] ?? 0), 0);
  }

  protected setFinancial(on: boolean) {
    this.draftFinancial.set(on);
    this.draftCategory.set('');
    this.step.set(1);
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
      category: this.draftCategory(),
      description: this.draftDescription().trim(),
      owner: this.draftOwner(),
      baselineId,
      originalApprovedBaseline: baseline,
      currentApprovedBaseline: baseline,
      effectiveDate: this.draftEffective(),
      targetRealisationDate: this.draftTarget(),
      approvalStatus: 'Approved',
      approvedBy: CURRENT_USER,
      approvalDate: today,
      status: 'Tracking Active',
      financialRows: financial ? this.draftLines().map((r) => ({ ...r, benefitRef: ref })) : [],
      baselineHistory: [{
        baselineId,
        baselineValue: baseline,
        effectiveDate: this.draftEffective(),
        targetRealisationDate: this.draftTarget(),
        requestedBy: CURRENT_USER,
        approvedBy: CURRENT_USER,
        approvalDate: today,
        changeReason: this.draftBaselineReason().trim() || 'Original approved baseline captured at benefit creation',
        status: 'Approved'
      }],
      reportingHistory: [],
      auditLog: [{
        id: `ba-${Date.now()}`,
        date: today,
        user: CURRENT_USER,
        action: 'Baseline Created',
        comments: `${baselineId} created — ${financial ? this.money(baseline) : 'non-financial benefit'}.`
      }]
    };

    benefitsFor(this.workstreamId()).update((rows) => [...rows, benefit]);
    this.closeCreate();
  }

  /** Downloads the open benefit as CSV — summary, reporting history and audit log. */
  protected download(b: Benefit) {
    const q = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const lines: string[] = [
      'Benefit Summary', '',
      ['Field', 'Value'].map(q).join(','),
      ['Benefit Name', b.name].map(q).join(','),
      ['Benefit Ref', b.benefitRef].map(q).join(','),
      ['Benefit Type', b.type].map(q).join(','),
      ['Benefit Owner', b.owner].map(q).join(','),
      ['Original Approved Baseline', this.money(b.originalApprovedBaseline)].map(q).join(','),
      ['Current Approved Baseline', this.money(b.currentApprovedBaseline)].map(q).join(','),
      ['Baseline ID', b.baselineId].map(q).join(','),
      ['Benefit Status', b.status].map(q).join(','),
      ['Effective Date', b.effectiveDate].map(q).join(','),
      ['Target Realisation Date', b.targetRealisationDate].map(q).join(','),
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
