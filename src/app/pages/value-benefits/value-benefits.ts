import { Component, ElementRef, computed, effect, inject, input, linkedSignal, output, signal } from '@angular/core';
import {
  UiAccordion, UiAmountInput, UiButton, UiCard, UiCardButton, UiCheckbox, UiColumnHeader, UiDateInput, UiDropdownItem, UiDropdownMenu, UiFileDrop, UiFileRow, UiFilterTabs, UiIcon, UiIconButton, UiInfoBanner, UiLink, UiModalShell, UiMultiSelect, UiPagination, UiPill, UiPopover, UiRadio, UiSectionHeader, UiSegmented, UiSelect, UiSnackbar, UiStatusTag, UiTable, UiTableCard, UiTableHeader, UiTableRow, UiTabs, UiTextInput, UiTextarea, UiTooltipDirective, UiUploadFile, type UiFilterTab, type UiMenuItem, type UiPillColor, type UiSegment, type UiTab, type UiTagVariant
} from 'ai-dls-kit';
import { BENEFIT_STATUSES, CURRENT_USER, NON_FINANCIAL_CATEGORIES, benefitTypeOf, financialTotal, hasFinancial, hasNonFinancial, latestUpdate, nextBaselineId, nextBenefitRef, snapshotOf } from '../../data/benefitsData';
import {
  BENEFIT_CATEGORIES, BENEFIT_DRIVERS, BENEFIT_MEASURES, FINANCIAL_TYPES
} from '../../data/lookups';
import type { AuditEntry, BaselineKind, BaselineLine, Benefit, BenefitFieldChange, BenefitRow, BenefitUpdate, FinancialImpactFile } from '../../data/models';
import { PEOPLE_NAMES, businessUnitsFor } from '../../data/people';
import { ActivatedRoute, Router } from '@angular/router';
import { benefitsFor } from '../../data/benefitsStore';
import { decide, reworkNote, type DecisionKind, type RequestKind } from '../../data/decisions';
import { currentPersona } from '../../data/personas';
import { Approvals } from '../approvals/approvals';

const ALL = 'All';

const LIFECYCLE_VARIANT: Record<string, UiTagVariant> = {
  'Update Pending Approval': 'amber',
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
  'Update Pending Approval': 'yellow',
  'Tracking Active': 'green',
  'Closure Pending Approval': 'yellow',
  'Closed': 'grey'
};

@Component({
  selector: 'app-value-benefits',
  imports: [
    UiAccordion, UiCard, UiSelect, UiDateInput, UiButton, UiIcon, UiIconButton, UiPopover, UiSegmented,
    UiTableCard, UiTableHeader, UiTable, UiColumnHeader, UiTableRow, UiStatusTag, UiPill,
    UiFilterTabs, UiMultiSelect, UiDropdownMenu, UiDropdownItem, UiPagination, UiModalShell, UiSectionHeader, UiInfoBanner,
    UiTabs, UiTooltipDirective, UiSnackbar, UiRadio, UiLink,
    Approvals,
    UiTextInput, UiTextarea, UiCheckbox, UiAmountInput, UiFileDrop, UiFileRow, UiUploadFile, UiCardButton
  ],
  templateUrl: './value-benefits.html',
  styleUrl: './value-benefits.scss'
})
export class ValueBenefits {
  readonly seeded = input.required<Benefit[]>({ alias: 'benefits' });
  readonly workstreamId = input.required<string>();

  /** The benefit the URL names, if any — the page's own back/forward state. */
  readonly openBenefitRef = input<string | null>(null);


  /** The session store's list for this workstream, so edits persist. */
  protected readonly benefits = computed(() => benefitsFor(this.workstreamId())());

  protected readonly persona = currentPersona;

  /**
   * Requests on this workstream waiting on the signed-in persona. Every kind of
   * request now routes to the Sponsor, so this is simply "can I approve, and is
   * anything outstanding" rather than a per-kind routing table.
   */
  protected readonly awaitingMe = computed(() => {
    if (!this.persona().canApprove) return [];
    return this.benefits().filter((b) =>
      b.approvalStatus === 'Pending Approval' ||
      b.status === 'Closure Pending Approval' ||
      b.pendingUpdate?.status === 'Pending Approval');
  });

  /** Requests on this workstream that were sent back for the requester to amend. */
  protected readonly needsRework = computed(() =>
    this.benefits().filter((b) =>
      b.approvalStatus === 'Rework' || b.status === 'Closure Rework'));

  protected readonly all = ALL;
  protected readonly ownerOptions = [ALL, ...PEOPLE_NAMES];
  /** The wizard picks real people, so it must not offer the filter's All sentinel. */
  protected readonly ownerChoices = PEOPLE_NAMES;
  protected readonly statusOptions = [ALL, 'Tracking Active', 'Update Pending Approval',
    'Closure Pending Approval', 'Closed'];
  protected readonly typeOptions = [ALL, 'Financial', 'Non-Financial'];
  protected readonly approvalOptions = [ALL, 'Approved', 'Pending Approval', 'Rejected'];

  /** A benefit lives on a workstream, so its approvals do too. */
  protected readonly pageTabs = computed<UiFilterTab[]>(() => [
    { key: 'benefits', label: 'Value Benefits' },
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
  protected readonly detailId = computed(() => {
    const ref = this.openBenefitRef();
    if (!ref) return null;
    return this.benefits().find((b) => b.benefitRef === ref)?.id ?? null;
  });
  protected readonly auditId = signal<string | null>(null);

  protected readonly detail = computed(() =>
    this.benefits().find((b) => b.id === this.detailId()) ?? null);
  protected readonly audit = computed(() =>
    this.benefits().find((b) => b.id === this.auditId()) ?? null);

  private static readonly LIVE_ACTIONS: UiMenuItem[] = [
    { key: 'update', label: 'Update Benefit' },
    { key: 'closure', label: 'Request Closure' }
  ];

  private static readonly CLOSED_ACTIONS: UiMenuItem[] = [
    { key: 'reopen', label: 'Reopen Benefit' }
  ];

  /**
   * A closed benefit offers only Reopen. Updating or closing it again are
   * meaningless from that state, and listing them greyed out would suggest
   * they might become available on their own.
   */
  protected rowActionsFor(b: Benefit) {
    return b.status === 'Closed' ? ValueBenefits.CLOSED_ACTIONS : ValueBenefits.LIVE_ACTIONS;
  }

  /**
   * Row actions raise requests, so they belong to whoever can raise one — the
   * Sponsor decides, it does not submit. They are also closed off while a
   * request is already outstanding: a second request on the same record would
   * give the approver two things to decide about one benefit. A closed benefit
   * is NOT disabled here — its one action, Reopen, is exactly what that state
   * is for.
   */
  protected actionDisabled(b: Benefit) {
    return !this.persona().canRequest
      || b.status === 'Closure Pending Approval'
      || b.pendingUpdate?.status === 'Pending Approval';
  }

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
  protected readonly statusChoices = ['Tracking Active', 'Update Pending Approval',
    'Closure Pending Approval', 'Closed'];
  protected readonly approvalChoices = ['Approved', 'Pending Approval', 'Rework', 'Rejected'];

  protected readonly filtered = computed<Benefit[]>(() =>
    this.benefits().filter((b) =>
      (this.owner() === ALL || b.owners.includes(this.owner())) &&
      (this.status() === ALL || b.status === this.status()) &&
      (this.statusTile() === ALL || this.displayStatus(b) === this.statusTile()) &&
      (!this.realisationFrom() || b.endDate >= this.realisationFrom()) &&
      (!this.realisationTo() || b.endDate <= this.realisationTo()) &&
      (!this.colName().length || this.colName().includes(b.name)) &&
      (!this.colType().length || this.colType().includes(b.type)) &&
      (!this.colOwner().length || b.owners.some((o) => this.colOwner().includes(o))) &&
      (!this.colStatus().length || this.colStatus().includes(this.displayStatus(b))) &&
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
    return this.summaryStatuses.map((s) => {
      const n = all.filter((b) => this.displayStatus(b) === s).length;
      return { key: s, label: s, count: n, pct: pct(n), dot: STATUS_DOT[s] };
    });
  });

  /**
   * Counted on `displayStatus`, not on the stored one, so the tiles agree with
   * the Benefit Status column — a benefit under review reads as pending in both.
   */
  protected readonly summaryStatuses = [
    'Tracking Active',
    'Update Pending Approval',
    'Closure Pending Approval',
    'Closed'
  ];

  protected readonly activeFilterCount = computed(() =>
    [this.owner() !== ALL, this.status() !== ALL, !!this.realisationFrom(), !!this.realisationTo()]
      .filter(Boolean).length);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

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

  /**
   * The one line the banner shows, or null for nothing outstanding.
   *
   * Derived rather than stored so it falls away on its own the moment the last
   * item is decided — a banner that has to be told to disappear eventually
   * won't be.
   */
  protected readonly attention = computed(() => {
    const waiting = this.awaitingMe().length;
    const rework = this.needsRework().length;
    const plural = (n: number) => `${n} item${n === 1 ? '' : 's'}`;
    if (waiting && rework) return `${plural(waiting)} awaiting your approval and ${plural(rework)} sent back for rework`;
    if (waiting) return `${plural(waiting)} awaiting your approval`;
    if (rework) return `${plural(rework)} sent back for rework`;
    return null;
  });

  /** Banner CTA — the approvals queue is where these are dealt with. */
  protected viewPending() {
    this.pageTab.set('approvals');
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
  /** Opens the audit overlay for a benefit named by id, from the queue. */
  protected openAuditById(id: string) {
    const benefit = this.benefits().find((b) => b.id === id);
    if (benefit) this.openAudit(benefit);
  }

  protected openDetail(b: Benefit) {
    this.reportPage.set(1);
    // Navigating rather than opening: the URL is what the page reads back.
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: 'value-benefits', benefit: b.benefitRef },
      queryParamsHandling: 'merge'
    });
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

  /**
   * The benefit's baselines, of both kinds. Replaces the single prose
   * description a non-financial benefit used to carry: two readers could not
   * agree from a sentence whether a benefit had been met.
   */
  protected readonly editBaselineLines = signal<BaselineLine[]>([]);

  /** The type is read from the lines; nobody picks it. */
  protected readonly editTypeDerived = computed(() => benefitTypeOf(this.editBaselineLines()));
  protected readonly editHasFinancial = computed(() =>
    this.editBaselineLines().some((l) => l.kind === 'Financial'));

  /**
   * The benefit's year-phased financial lines, editable in place.
   *
   * A financial baseline is built the same way it was at creation — from the
   * lines, not typed as a lump sum — so the figure always has its working
   * shown. `editBaselineTotal` is therefore the proposed baseline; there is no
   * separate field to disagree with it.
   */
  protected readonly editLines = signal<BenefitRow[]>([]);

  /** Columns follow the benefit's own dates, exactly as the wizard's table does. */
  protected readonly editYears = computed(() => {
    const from = Number(this.editStart().slice(0, 4));
    const to = Number(this.editEnd().slice(0, 4));
    if (!from || !to || to < from) return [new Date().getFullYear()];
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  });

  /**
   * Summed over the VISIBLE years only, so the figure always equals what the
   * table above it adds up to. A baseline the reader cannot verify by looking
   * is worse than no figure at all.
   */
  protected readonly editBaselineTotal = computed(() => {
    const years = this.editYears();
    return this.editLines().reduce(
      (sum, r) => sum + years.reduce((t, y) => t + (r.values[y] ?? 0), 0), 0);
  });


  /* ---------------- Financial impact workbook ---------------- */

  /**
   * Financial figures are not typed. They are prepared in the template, checked
   * there, and uploaded — re-keying them into a form only adds a place for the
   * two to diverge. One file is held per benefit, so a correction is a fresh
   * upload rather than an edit, and the previous numbers leave a trail in the
   * audit log rather than being quietly overwritten.
   */
  protected readonly editFile = signal<FinancialImpactFile | null>(null);
  protected readonly draftFile = signal<FinancialImpactFile | null>(null);

  /** Which form the in-flight upload belongs to — the wizard or the edit form. */
  protected readonly uploadFor = signal<'edit' | 'draft'>('edit');

  private fileSignal(target: 'edit' | 'draft' = this.uploadFor()) {
    return target === 'edit' ? this.editFile : this.draftFile;
  }

  private linesSignal(target: 'edit' | 'draft' = this.uploadFor()) {
    return target === 'edit' ? this.editLines : this.draftLines;
  }

  private baselineLinesFor(target: 'edit' | 'draft' = this.uploadFor()) {
    const saved = target === 'edit' ? this.editBaselineLines() : this.draftBaselineLines();
    // The template is uploaded from inside the add-baseline dialog, so the
    // baseline it belongs to has not been saved yet. Validation and the parsed
    // rows both have to see it, or the first upload on a new financial
    // baseline would always fail for a baseline the user is looking at.
    if (!this.blOpen() || this.blFor() !== target || this.blKind() !== 'Financial') return saved;
    const pending: BaselineLine = {
      id: this.blEditingId() ?? 'bl-pending',
      kind: 'Financial',
      name: this.blName().trim() || 'Untitled baseline',
      baselineId: '', originalValue: null, currentValue: null,
      measure: '', unit: '', startingPoint: '', target: '', method: '', frequency: ''
    };
    return this.blEditingId()
      ? saved.map((l) => (l.id === pending.id ? pending : l))
      : [...saved, pending];
  }

  private yearsFor(target: 'edit' | 'draft' = this.uploadFor()): number[] {
    return target === 'edit' ? this.editYears() : this.years();
  }

  /** In-flight upload. Null when there is nothing being transferred. */
  protected readonly upload = signal<{
    name: string;
    size: string;
    status: 'uploading' | 'validating' | 'failed';
    progress: number;
    error: string;
  } | null>(null);

  private uploadTimers: ReturnType<typeof setTimeout>[] = [];

  private clearUploadTimers() {
    this.uploadTimers.forEach(clearTimeout);
    this.uploadTimers = [];
  }

  protected downloadTemplate() {
    this.toast.set('Financial impact template downloaded');
  }

  /**
   * The kit's drop zone is a mock — it reports that a file was chosen and
   * leaves the host to invent one. The transfer and the validation pass are
   * staged on timers so the prototype shows the states a real upload passes
   * through rather than snapping straight to a filled table.
   */
  protected browseFinancialFile(target: 'edit' | 'draft' = 'edit') {
    if (this.upload()) return;
    this.uploadFor.set(target);
    this.clearUploadTimers();

    const name = target === 'draft'
      ? 'new-benefit-financial-impact.xlsx'
      : `${this.detail()?.benefitRef ?? 'benefit'}-financial-impact.xlsx`;
    this.upload.set({ name, size: '3.2 MB', status: 'uploading', progress: 0, error: '' });

    [20, 45, 70, 90, 100].forEach((pct, i) => {
      this.uploadTimers.push(setTimeout(() => {
        this.upload.update((u) => (u && u.status === 'uploading' ? { ...u, progress: pct } : u));
      }, 180 * (i + 1)));
    });

    this.uploadTimers.push(setTimeout(() => {
      this.upload.update((u) => (u ? { ...u, status: 'validating' as const } : u));
    }, 1000));

    this.uploadTimers.push(setTimeout(() => this.finishUpload(name), 1900));
  }

  /**
   * What the prototype actually checks, rather than failing at random: the
   * template's year columns come from the benefit's dates, and its rows post
   * against the financial baselines. Either one missing and there is nothing
   * to read the figures into. Both are reachable in a demo, which is the point
   * — a failure state nobody can get to is not a failure state.
   */
  private finishUpload(name: string) {
    const target = this.uploadFor();
    const datesSet = target === 'edit' ? this.datesSetEdit() : this.datesSet();
    const named = this.blName().trim();

    const problem = !datesSet
      ? 'the benefit has no start and end date, so the template has no year columns to post against'
      : !named
        ? 'the baseline has no name, so the template rows have nothing to post against'
        : '';

    if (problem) {
      this.upload.update((u) => (u ? {
        ...u,
        status: 'failed' as const,
        error: `Errors detected — ${problem}. Download this file to view and correct the errors.`
      } : u));
      return;
    }

    this.linesSignal(target).set(this.mockUploadedRows(target));
    this.fileSignal(target).set({
      name,
      size: '3.2 MB',
      uploadedBy: CURRENT_USER,
      uploadedOn: new Date().toISOString().slice(0, 10)
    });
    this.upload.set(null);
  }

  /**
   * Stands in for parsing the workbook: one row per financial baseline, with a
   * figure for each of the benefit's years. The money comes from here and
   * nowhere else — there is no single number for a financial baseline, because
   * the template phases it across years and the year columns carry the meaning.
   *
   * Deterministic from the baseline's own name, so the same benefit shows the
   * same figures on every upload rather than jumping about between demos.
   */
  private mockUploadedRows(target: 'edit' | 'draft'): BenefitRow[] {
    const years = this.yearsFor(target);
    const ref = target === 'draft' ? '' : (this.detail()?.benefitRef ?? '');
    return this.baselineLinesFor(target)
      .filter((l) => l.kind === 'Financial')
      .map((l, i) => {
        const seed = [...l.name].reduce((t, c) => t + c.charCodeAt(0), 0);
        const values: Record<number, number> = {};
        years.forEach((y: number, n: number) => {
          values[y] = (((seed + n * 37) % 45) + 6) * 100000;
        });
        return {
          id: `fr-up-${i}-${Date.now()}`,
          benefitRef: ref,
          baselineId: l.baselineId || l.id,
          typeOfFinancial: 'Cost Save',
          driver: l.name,
          measure: 'S$ Value',
          values,
          comments: 'Read from the uploaded financial impact template.'
        };
      });
  }

  protected cancelUpload() {
    this.clearUploadTimers();
    this.upload.set(null);
  }

  protected downloadErrorFile() {
    this.toast.set('File downloaded with errors marked');
  }

  /** A file must be removed before another can replace it — the reference flow. */
  protected removeFinancialFile(target: 'edit' | 'draft' = 'edit') {
    this.fileSignal(target).set(null);
    this.linesSignal(target).set([]);
  }

  /* ---------------- Baseline lines ---------------- */

  /** Exposed for the template — a benefit's own contents decide what it shows. */
  protected hasFin(b: Benefit | null) { return !!b && hasFinancial(b); }
  protected hasNonFin(b: Benefit | null) { return !!b && hasNonFinancial(b); }

  /**
   * The year columns to show for a benefit.
   *
   * `editYears()` reads the edit form's dates, which are empty outside an edit
   * session — so in view mode it fell back to the current year alone, showing
   * one column for a benefit spanning three and a row total that disagreed
   * with its own baseline. Reading mode takes the years from the benefit.
   */
  protected displayYears(b: Benefit): number[] {
    if (this.summaryEdit()) return this.editYears();
    const from = Number(b.startDate.slice(0, 4));
    const to = Number(b.endDate.slice(0, 4));
    if (!from || !to || to < from) return [new Date().getFullYear()];
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  }

  /** A row's total over the years actually being shown. */
  protected rowTotalOver(row: BenefitRow, years: readonly number[]) {
    return years.reduce((t, y) => t + (row.values[y] ?? 0), 0);
  }

  /**
   * The uploaded rows belonging to one baseline. The template writes one row
   * per financial baseline, keyed by its name, so each figure can be shown
   * under the baseline it explains rather than in a table of its own.
   */
  /**
   * The year columns for a benefit being READ. `editYears` is edit-session
   * state and is empty outside the form, where it fell back to the current
   * year alone — which silently dropped every other year's figures and made
   * the row total disagree with the baseline it explains.
   */
  protected benefitYears(b: Benefit): number[] {
    const from = Number(b.startDate.slice(0, 4));
    const to = Number(b.endDate.slice(0, 4));
    if (!from || !to || to < from) return [new Date().getFullYear()];
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  }

  /** Every figure on the row, whatever years it spans. */
  protected rowTotal(row: BenefitRow) {
    return Object.values(row.values).reduce((t, v) => t + (v ?? 0), 0);
  }

  protected rowsForBaseline(rows: readonly BenefitRow[], line: BaselineLine) {
    return rows.filter((r) => r.baselineId === line.baselineId || r.baselineId === line.id);
  }

  /** What a set of baselines amounts to, for an approver's diff. */
  protected baselineSummary(lines: readonly BaselineLine[]) {
    if (!lines.length) return this.emptyValue;
    const fin = lines.filter((l) => l.kind === 'Financial').length;
    const non = lines.length - fin;
    const parts: string[] = [];
    if (fin) parts.push(`${fin} financial`);
    if (non) parts.push(`${non} non-financial`);
    return `${lines.length} baseline${lines.length === 1 ? '' : 's'} (${parts.join(', ')})`;
  }

  /**
   * The add-baseline dialog. Kind is chosen first and then fixed for that line,
   * because the two ask for entirely different things — a figure against a
   * definition — and a form that morphs under the reader loses what they typed.
   */
  protected readonly blOpen = signal(false);
  protected readonly blFor = signal<'edit' | 'draft'>('edit');
  protected readonly blKind = signal<BaselineKind | null>(null);
  protected readonly blEditingId = signal<string | null>(null);
  protected readonly blName = signal('');
  protected readonly blMeasure = signal('');
  protected readonly blUnit = signal('');
  protected readonly blStartingPoint = signal('');
  protected readonly blTargetCondition = signal('');
  protected readonly blMethod = signal('');
  protected readonly blFrequency = signal('');

  protected readonly frequencyOptions = ['Monthly', 'Quarterly', 'Half-yearly', 'Annually', 'At milestone'];


  /**
   * Whether the form behind the dialog has the dates the template needs. A
   * workbook's year columns come from them, so uploading before they are set
   * can only fail — better to say so before the upload than after it.
   */
  protected readonly dialogDatesSet = computed(() =>
    this.blFor() === 'edit' ? this.datesSetEdit() : this.datesSet());

  /** The file belonging to whichever form the dialog was opened from. */
  protected readonly dialogFile = computed(() =>
    this.blFor() === 'edit' ? this.editFile() : this.draftFile());

  protected openBaselineDialog(target: 'edit' | 'draft') {
    this.blFor.set(target);
    this.blEditingId.set(null);
    this.blKind.set(null);
    this.blName.set('');
    this.blMeasure.set('');
    this.blUnit.set('');
    this.blStartingPoint.set('');
    this.blTargetCondition.set('');
    this.blMethod.set('');
    this.blFrequency.set('');
    this.blOpen.set(true);
  }

  protected editBaselineLine(target: 'edit' | 'draft', line: BaselineLine) {
    this.blFor.set(target);
    this.blEditingId.set(line.id);
    this.blKind.set(line.kind);
    this.blName.set(line.name);

    this.blMeasure.set(line.measure);
    this.blUnit.set(line.unit);
    this.blStartingPoint.set(line.startingPoint);
    this.blTargetCondition.set(line.target);
    this.blMethod.set(line.method);
    this.blFrequency.set(line.frequency);
    this.blOpen.set(true);
  }

  protected closeBaselineDialog() { this.blOpen.set(false); }

  /** Enough to be worth saving — a name, plus the pass condition when it is one. */
  /**
   * A financial baseline cannot be saved until its template has been uploaded
   * and validated: its figures live only in that file, so saving one without
   * it would create a baseline with nothing behind it and no way to type the
   * numbers in afterwards.
   */
  protected readonly blValid = computed(() => {
    if (!this.blKind() || !this.blName().trim()) return false;
    return this.blKind() === 'Financial'
      ? !!this.dialogFile() && !this.upload()
      : this.blMeasure().trim() !== '' && this.blTargetCondition().trim() !== '';
  });

  protected saveBaselineLine() {
    if (!this.blValid()) return;
    const kind = this.blKind() as BaselineKind;
    const financial = kind === 'Financial';
    const id = this.blEditingId() ?? `bl-${Date.now()}`;
    const target = this.blFor();
    const existing = (target === 'edit' ? this.editBaselineLines() : this.draftBaselineLines())
      .find((l) => l.id === id);
    const rows = target === 'edit' ? this.editLines() : this.draftLines();
    const uploadedTotal = rows.reduce(
      (sum, r) => sum + Object.values(r.values).reduce((t, v) => t + (v ?? 0), 0), 0);
    const line: BaselineLine = {
      id,
      kind,
      name: this.blName().trim(),
      baselineId: existing?.baselineId || this.nextLineBaselineId(),
      // A financial baseline's figures are the uploaded rows' total; nothing
      // is typed, so nothing can disagree with the workbook.
      originalValue: financial ? (existing?.originalValue ?? uploadedTotal) : null,
      currentValue: financial ? uploadedTotal : null,
      measure: financial ? '' : this.blMeasure().trim(),
      unit: financial ? '' : this.blUnit().trim(),
      startingPoint: financial ? '' : this.blStartingPoint().trim(),
      target: financial ? '' : this.blTargetCondition().trim(),
      method: financial ? '' : this.blMethod().trim(),
      frequency: financial ? '' : this.blFrequency().trim()
    };

    const sig = this.blFor() === 'edit' ? this.editBaselineLines : this.draftBaselineLines;
    sig.update((rows) => this.blEditingId()
      ? rows.map((r) => (r.id === id ? line : r))
      : [...rows, line]);

    // A financial baseline that has just appeared can invalidate an uploaded
    // workbook, and one that has just gone leaves its figures stranded.
    const t = this.blFor();
    if (!this.baselineLinesFor(t).some((l) => l.kind === 'Financial')) this.removeFinancialFile(t);
    this.blOpen.set(false);
  }

  /** Baseline IDs run in one sequence across the baselines on this benefit. */
  private nextLineBaselineId() {
    const lines = this.blFor() === 'edit' ? this.editBaselineLines() : this.draftBaselineLines();
    const base = this.detail()?.baselineId ?? 'BL0001';
    return `${base}-${String(lines.length + 1).padStart(2, '0')}`;
  }

  protected removeBaselineLine(target: 'edit' | 'draft', id: string) {
    const sig = target === 'edit' ? this.editBaselineLines : this.draftBaselineLines;
    sig.update((rows) => rows.filter((r) => r.id !== id));
    if (!this.baselineLinesFor(target).some((l) => l.kind === 'Financial')) this.removeFinancialFile(target);
  }

  /** Both dates set — the table's year columns depend on them. */
  protected readonly datesSetEdit = computed(() =>
    this.editStart() !== '' && this.editEnd() !== '');

  protected addEditLine() { this.editLines.update((l) => [...l, this.blankLine()]); }

  protected removeEditLine(id: string) {
    this.editLines.update((rows) => rows.filter((r) => r.id !== id));
  }

  protected setEditLine(id: string, field: 'typeOfFinancial' | 'driver' | 'measure', value: string | null) {
    this.editLines.update((rows) =>
      rows.map((r) => (r.id === id ? ({ ...r, [field]: value ?? '' } as BenefitRow) : r)));
  }

  protected setEditLineValue(id: string, year: number, value: string | null) {
    const n = Number(String(value).replace(/[^0-9.-]/g, '')) || 0;
    this.editLines.update((rows) =>
      rows.map((r) => (r.id === id ? { ...r, values: { ...r.values, [year]: n } } : r)));
  }

  protected editLineTotal(row: BenefitRow) {
    return this.editYears().reduce((s, y) => s + (row.values[y] ?? 0), 0);
  }
  protected readonly editReason = signal('');

  /** Derived from the owners being edited — never typed in. */
  protected readonly editBusinessUnits = computed(() =>
    businessUnitsFor(this.editOwners()));

  /**
   * Opens the edit form.
   *
   * A benefit sent back for rework still carries the request that was
   * returned: the field values the owner proposed, and any reporting lines
   * staged in the same edit. Those have NOT been written onto the benefit —
   * only an approval does that — so reading the benefit's own fields would
   * silently discard the owner's work and ask them to type it again. The
   * returned request is therefore what the form opens on, which is also what
   * makes the Sponsor's comments actionable: the owner amends what was
   * returned rather than rebuilding it.
   */
  protected startSummaryEdit(b: Benefit) {
    const returned = b.pendingUpdate?.status === 'Rework' ? b.pendingUpdate : null;
    const proposed = returned
      ? returned.fields.reduce<Record<string, unknown>>((acc, f) => { acc[f.key] = f.value; return acc; }, {})
      : {};
    b = { ...b, ...proposed } as Benefit;

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
    this.editBaselineLines.set(b.baselineLines.map((l) => ({ ...l })));
    this.editLines.set(b.financialRows.map((r) => ({ ...r, values: { ...r.values } })));
    this.editFile.set(b.financialFile ? { ...b.financialFile } : null);
    this.upload.set(null);
    this.editReason.set('');
    // Staged lines come back with the request so they can still be amended or
    // removed; they are not in reportingHistory because they were never approved.
    this.draftUpdates.set((returned?.reportingLines ?? []).map((r) => ({ ...r })));
    this.summaryEdit.set(true);
  }

  protected cancelSummaryEdit() {
    this.summaryEdit.set(false);
    this.draftUpdates.set([]);
    this.closeReportingDialog();
  }

  /* ---------------- Reporting history paging ---------------- */

  /**
   * Reporting history is append-only and read newest-last, so it grows without
   * limit. Paged rather than scrolled: a scrolling box inside a page that also
   * scrolls fights the wheel, whereas a pager is unambiguous. It only appears
   * once there is a second page — a control over three rows is noise.
   */
  private static readonly REPORT_PAGE = 5;

  protected readonly reportPage = signal(1);

  protected reportRows(rows: BenefitUpdate[]) {
    const size = ValueBenefits.REPORT_PAGE;
    const start = (this.reportPage() - 1) * size;
    return rows.slice(start, start + size);
  }

  protected reportPaged(rows: BenefitUpdate[]) {
    return rows.length > ValueBenefits.REPORT_PAGE;
  }

  /* ---------------- Reporting lines added during an edit ---------------- */

  /**
   * Lines staged in this editing session. Held apart from the benefit's
   * reportingHistory because that history is append-only and already reported:
   * a staged line can still be removed, a reported one never can.
   */
  protected readonly draftUpdates = signal<BenefitUpdate[]>([]);

  protected readonly reportingDialogOpen = signal(false);
  protected readonly rlDate = signal('');
  protected readonly rlActual = signal('');
  protected readonly rlProgress = signal('');
  protected readonly rlExplanation = signal('');
  protected readonly rlRootCause = signal('');
  protected readonly rlCorrective = signal('');

  protected openReportingDialog() {
    this.rlDate.set(this.today());
    this.rlActual.set('');
    this.rlProgress.set('');
    this.rlExplanation.set('');
    this.rlRootCause.set('');
    this.rlCorrective.set('');
    this.reportingDialogOpen.set(true);
  }

  protected closeReportingDialog() { this.reportingDialogOpen.set(false); }

  /** A staged line needs a date and the one figure its benefit type reports. */
  protected readonly reportingLineValid = computed(() => {
    const b = this.detail();
    if (!b || !this.rlDate()) return false;
    return hasFinancial(b)
      ? this.rlActual().trim() !== ''
      : this.rlProgress().trim() !== '';
  });

  protected addReportingLine(b: Benefit) {
    const financial = hasFinancial(b);
    const actual = financial ? this.num(this.rlActual()) : null;
    const base = b.currentApprovedBaseline;
    this.draftUpdates.update((rows) => [...rows, {
      id: `ru-draft-${Date.now()}`,
      updateDate: this.rlDate(),
      actualValue: actual,
      progressUpdate: financial ? '' : this.rlProgress().trim(),
      variancePct: financial && base ? Math.round(((actual! - base) / base) * 1000) / 10 : null,
      varianceExplanation: this.rlExplanation().trim(),
      rootCause: this.rlRootCause().trim(),
      correctiveAction: this.rlCorrective().trim(),
      updatedBy: CURRENT_USER,
      evidence: ''
    }]);
    this.closeReportingDialog();
  }

  protected removeReportingLine(id: string) {
    this.draftUpdates.update((rows) => rows.filter((r) => r.id !== id));
  }

  /**
   * The benefit as it should be READ while a request is outstanding — the
   * requested values, not the approved ones.
   *
   * A reader looking at a benefit under review wants to see what is being
   * proposed; the superseded values are still recoverable from the audit log's
   * snapshots, which is what makes showing the new ones safe.
   */
  protected shown(b: Benefit): Benefit {
    const upd = b.pendingUpdate;
    if (upd?.status !== 'Pending Approval') return b;
    const applied = upd.fields.reduce<Record<string, unknown>>((acc, f) => {
      acc[f.key] = f.value;
      return acc;
    }, {});
    return {
      ...b,
      ...applied,
      reportingHistory: [...b.reportingHistory, ...(upd.reportingLines ?? [])]
    } as Benefit;
  }

  /* ---------------- Deciding from the benefit's own page ---------------- */

  /** What kind of request is outstanding on this benefit, if any. */
  protected requestKind(b: Benefit): RequestKind | null {
    if (b.pendingUpdate?.status === 'Pending Approval') return 'Benefit Update';
    if (b.status === 'Closure Pending Approval') return 'Benefit Closure';
    if (b.approvalStatus === 'Pending Approval') return 'Baseline Change';
    return null;
  }

  protected canDecide(b: Benefit) {
    return this.persona().canApprove && !!this.requestKind(b);
  }

  protected readonly decisionKind = signal<DecisionKind | null>(null);
  protected readonly decisionNote = signal('');

  protected openDecision(kind: DecisionKind) {
    this.decisionKind.set(kind);
    this.decisionNote.set('');
  }

  protected closeDecision() { this.decisionKind.set(null); }

  /** A rework must say why — the requester cannot act on a bare "no". */
  protected readonly decisionValid = computed(() =>
    this.decisionKind() !== 'rework' || this.decisionNote().trim() !== '');

  protected submitDecision(b: Benefit) {
    const kind = this.decisionKind();
    const requestKind = this.requestKind(b);
    if (!kind || !requestKind || !this.decisionValid()) return;

    benefitsFor(this.workstreamId()).update((rows) =>
      rows.map((r) => (r.id === b.id
        ? decide(r, requestKind, {
            kind,
            note: this.decisionNote().trim(),
            approver: this.persona().name,
            reference: b.benefitRef
          })
        : r)));

    this.closeDecision();
    this.toastBenefitId.set(b.id);
    this.toast.set(kind === 'approve'
      ? (requestKind === 'Benefit Closure'
          ? `${b.name} has been successfully closed`
          : 'Request approved')
      : 'Sent back for rework');
  }

  /** The note the requester still has to act on, if any. */
  protected reworkFor(b: Benefit) { return reworkNote(b); }

  /**
   * The superseded value of a field under review, for the amber
   * "Previously: …" line. Null when nothing about that field is changing.
   */
  protected previously(b: Benefit, key: string): string | null {
    const upd = b.pendingUpdate;
    if (upd?.status !== 'Pending Approval') return null;
    const field = upd.fields.find((f) => f.key === key);
    return field ? (field.from || this.emptyValue) : null;
  }

  /** A request is already outstanding, so the benefit cannot be submitted again. */
  protected pendingReview(b: Benefit) {
    return b.pendingUpdate?.status === 'Pending Approval';
  }

  /**
   * Something has actually changed. Submit stays disabled until it has, so the
   * button cannot raise an empty request for an approver to look at.
   */
  protected readonly editDirty = computed(() => {
    const b = this.detail();
    if (!b) return false;
    if (this.draftUpdates().length) return true;
    const sameList = (a: readonly string[], c: readonly string[]) =>
      a.length === c.length && a.every((v, i) => v === c[i]);
    if (this.baselineChanged()) return true;
    return this.editName().trim() !== b.name
      || this.editTypeDerived() !== b.type
      || JSON.stringify(this.editBaselineLines()) !== JSON.stringify(b.baselineLines)
      || this.editFile()?.name !== b.financialFile?.name
      || this.editFile()?.uploadedOn !== b.financialFile?.uploadedOn
      || this.editDescription().trim() !== b.description
      || this.editValidationSource().trim() !== b.validationSource
      || this.editStart() !== b.startDate
      || this.editEnd() !== b.endDate
      || !sameList(this.editOwners(), b.owners)
      || !sameList(this.editCategories(), b.categories);
  });

  /* ---------------- Audit snapshot preview ---------------- */

  protected readonly snapshotEntry = signal<AuditEntry | null>(null);

  protected openSnapshot(entry: AuditEntry) { this.snapshotEntry.set(entry); }
  protected closeSnapshot() { this.snapshotEntry.set(null); }

  /** Downloads one snapshot as CSV — the version, not the whole benefit. */
  protected downloadSnapshot(entry: AuditEntry) {
    const snap = entry.snapshot;
    if (!snap) return;
    const q = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows: unknown[][] = [
      ['Snapshot taken', entry.date],
      ['Recorded by', entry.user],
      ['Action', entry.action],
      ['Comments', entry.comments],
      [],
      ['Benefit Name', snap.name],
      ['Benefit Type', snap.type],
      ['Benefit Category', snap.categories.join('; ')],
      ['Benefit Owner', snap.owners.join('; ')],
      ['BUs Involved', snap.businessUnits.join('; ')],
      ['Benefit Description', snap.description],
      ['Validation Source', snap.validationSource],
      ['Start date', snap.startDate],
      ['End date', snap.endDate],
      ['Benefit Status', snap.status],
      ['Baseline ID', snap.baselineId],
      ['Baseline Value', snap.baselineValue],
      ['Original Approved Baseline', snap.originalBaseline],
      ['Approval Status', snap.approvalStatus],
      ['Reporting lines', snap.reportingLines],
      ['Latest reported', snap.latestReported]
    ];
    const csv = rows.map((r) => r.map(q).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${snap.name.replace(/[^a-z0-9]+/gi, '-')}-${entry.date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** The baseline figure changed, so a baseline approval is needed too. */
  protected readonly baselineChanged = computed(() => {
    const b = this.detail();
    if (!b || !this.editHasFinancial()) return false;
    return this.editBaselineTotal() !== b.currentApprovedBaseline;
  });

  /**
   * Saves an edit as REQUESTS, not as changes: the benefit keeps its approved
   * values until someone decides. Descriptive fields raise one request to the
   * Sponsor; a changed baseline raises a separate BaselineRecord for
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
    // Type is derived, so it is recorded as a consequence of the baselines
    // changing rather than as something the owner chose.
    add('type', 'Benefit Type', b.type, this.editTypeDerived(), this.editTypeDerived());

    // The baseline travels in the SAME package: updating a baseline is now part
    // of updating the benefit, not a separate request with its own approver.
    const proposed = this.editHasFinancial() ? this.editBaselineTotal() : null;
    const baselineMoved = this.baselineChanged();
    if (baselineMoved) {
      changes.push({
        key: 'currentApprovedBaseline',
        label: 'Current Approved Baseline',
        from: b.currentApprovedBaseline === null ? this.emptyValue : this.money(b.currentApprovedBaseline),
        to: proposed === null ? this.emptyValue : this.money(proposed),
        value: proposed
      });
    }
    if (JSON.stringify(this.editBaselineLines()) !== JSON.stringify(b.baselineLines)) {
      changes.push({
        key: 'baselineLines',
        label: 'Baseline definition',
        from: this.baselineSummary(b.baselineLines),
        to: this.baselineSummary(this.editBaselineLines()),
        value: this.editBaselineLines()
      });
    }

    // A replaced workbook is a change to the numbers themselves, so it travels
    // in the same package and is applied only on approval.
    const file = this.editFile();
    if (file?.name !== b.financialFile?.name || file?.uploadedOn !== b.financialFile?.uploadedOn) {
      changes.push({
        key: 'financialFile',
        label: 'Financial impact file',
        from: b.financialFile ? `${b.financialFile.name} (${b.financialFile.uploadedOn})` : this.emptyValue,
        to: file ? `${file.name} (${file.uploadedOn})` : this.emptyValue,
        value: file ?? undefined
      });
      changes.push({
        key: 'financialRows',
        label: 'Financial impact values',
        from: `${b.financialRows.length} line${b.financialRows.length === 1 ? '' : 's'}`,
        to: `${this.editLines().length} line${this.editLines().length === 1 ? '' : 's'}`,
        value: this.editLines()
      });
    }
    const staged = this.draftUpdates();
    if (!changes.length && !staged.length) {
      this.summaryEdit.set(false);
      return;
    }

    benefitsFor(this.workstreamId()).update((rows) =>
      rows.map((r) => {
        if (r.id !== b.id) return r;
        const parts: string[] = [];
        if (changes.length) parts.push(`${changes.length} field${changes.length > 1 ? 's' : ''} (${changes.map((c) => c.label).join(', ')})`);
        if (staged.length) parts.push(`${staged.length} reporting line${staged.length > 1 ? 's' : ''}`);
        return {
          ...r,
          // A moved baseline opens a pending BaselineRecord so the history shows
          // the proposal; it is approved along with the rest of the package.
          approvalStatus: baselineMoved ? ('Pending Approval' as const) : r.approvalStatus,
          baselineHistory: baselineMoved
            ? [...r.baselineHistory, {
                baselineId: nextBaselineId(this.benefits()),
                baselineValue: proposed,
                startDate: this.editStart(),
                endDate: this.editEnd(),
                requestedBy: CURRENT_USER,
                requestedOn: today,
                approvedBy: '-',
                approvalDate: '-',
                changeReason: this.editReason().trim() || 'Baseline revised as part of a benefit update',
                status: 'Pending Approval' as const
              }]
            : r.baselineHistory,
          // Nothing is written yet. A change anywhere in the benefit puts the
          // WHOLE benefit up for review, so the reporting lines travel with the
          // field changes and only reach the history on approval.
          pendingUpdate: {
            id: `up-${Date.now()}`,
            fields: changes,
            reportingLines: staged,
            requestedBy: CURRENT_USER,
            requestedOn: today,
            status: 'Pending Approval' as const
          },
          auditLog: [...r.auditLog, {
            id: `ba-${Date.now()}`,
            date: today,
            user: CURRENT_USER,
            action: 'Benefit Update Requested',
            comments: `Submitted for approval — ${parts.join(' and ')}.`,
            snapshot: snapshotOf(r)
          }]
        };
      }));

    this.summaryEdit.set(false);
    this.draftUpdates.set([]);

    // The overlay closes first, then the confirmation appears against the
    // table — so the snackbar is not sitting over the record it is about, and
    // "View benefit" has somewhere to take the reader back to.
    this.toastBenefitId.set(b.id);
    this.closeDetail();
    setTimeout(() => this.toast.set('Benefit has been submitted for approval'), ValueBenefits.EXIT_MS);
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

  /** The back arrow — and the browser's own Back, which clears the same param. */
  protected closeDetail() {
    this.dismissOverlays();
    this.closingDetail.set(true);
    setTimeout(() => {
      this.closingDetail.set(false);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { tab: 'value-benefits', benefit: null },
        queryParamsHandling: 'merge'
      });
    }, ValueBenefits.EXIT_MS);
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
  protected readonly actionKind = signal<'update' | 'closure' | null>(null);
  protected readonly actionId = signal<string | null>(null);
  protected readonly closingAction = signal(false);
  protected readonly actionBenefit = computed(() =>
    this.benefits().find((b) => b.id === this.actionId()) ?? null);

  protected readonly formActual = signal('');
  protected readonly formValidationSource = signal('');
  protected readonly formProgress = signal('');
  protected readonly formExplanation = signal('');
  protected readonly formRootCause = signal('');
  protected readonly formCorrective = signal('');
  protected readonly formOutcome = signal('');
  protected readonly formComments = signal('');
  protected readonly formStart = signal('');
  protected readonly formEnd = signal('');

  /* ---------------- Reopening a closed benefit ---------------- */

  /**
   * Held by id rather than by record so the confirmation survives the list
   * re-rendering underneath it.
   */
  protected readonly reopening = signal<string | null>(null);

  protected readonly reopenBenefit = computed(() =>
    this.benefits().find((b) => b.id === this.reopening()) ?? null);

  protected askReopen(b: Benefit, event?: Event) {
    event?.stopPropagation();
    this.openMenuId.set(null);
    this.reopening.set(b.id);
  }

  protected cancelReopen() { this.reopening.set(null); }

  /**
   * Reopening needs no approval: it grants no value and changes no figure, it
   * only makes the record editable again so a correction can be raised — and
   * that correction still goes to the Sponsor like any other. What it does
   * need is a trace, so it is written to the audit log.
   */
  protected confirmReopen(b: Benefit) {
    this.patch(b.id, (cur) => ({
      ...cur,
      status: 'Tracking Active',
      closureNote: undefined,
      auditLog: [...cur.auditLog, {
        id: `ba-${Date.now()}`,
        date: this.today(),
        user: CURRENT_USER,
        action: 'Benefit Reopened',
        comments: 'Reopened for further updates. Tracking is active again.',
        snapshot: snapshotOf({ ...cur, status: 'Tracking Active' })
      }]
    }));
    this.reopening.set(null);
    this.toastBenefitId.set(b.id);
    this.toast.set('Benefit reopened — tracking is active again');
  }

  protected openAction(kind: 'update' | 'closure', b: Benefit, event: Event) {
    event.stopPropagation();
    this.closeMenu();
    this.formActual.set('');
    this.formValidationSource.set(b.validationSource);
    this.formProgress.set('');
    this.formExplanation.set('');
    this.formRootCause.set('');
    this.formCorrective.set('');
    this.formOutcome.set(hasFinancial(b)
      ? String(latestUpdate(b)?.actualValue ?? '')
      : latestUpdate(b)?.progressUpdate ?? '');
    this.formComments.set('');
    this.formStart.set(b.startDate);
    this.formEnd.set(b.endDate);
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
    this.actionKind() === 'closure' ? 'Request Closure' : 'Update Benefit');

  private today() { return new Date().toISOString().slice(0, 10); }
  private num(v: string) { return Number(String(v).replace(/[^0-9.-]/g, '')) || 0; }

  private patch(id: string, fn: (b: Benefit) => Benefit) {
    benefitsFor(this.workstreamId()).update((rows) => rows.map((b) => (b.id === id ? fn(b) : b)));
  }

  /** Reporting update — appends to history, never overwrites. */
  protected saveUpdate() {
    const b = this.actionBenefit();
    if (!b) return;
    const financial = hasFinancial(b);
    const actual = financial ? this.num(this.formActual()) : null;
    const pct = financial && b.currentApprovedBaseline
      ? Math.round(((actual! - b.currentApprovedBaseline) / b.currentApprovedBaseline) * 1000) / 10
      : null;
    const sourceMoved = this.formValidationSource().trim() !== b.validationSource;
    this.patch(b.id, (cur) => ({
      ...cur,
      // Applied directly rather than raised for approval: this is where the
      // reporter says which system the actuals came from, so gating it would
      // block the actuals report itself.
      validationSource: this.formValidationSource().trim(),
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
      auditLog: [
        ...cur.auditLog,
        {
          id: `ba-${Date.now()}`, date: this.today(), user: CURRENT_USER,
          action: 'Benefit Updated',
          comments: financial ? `Actuals reported — ${this.money(actual)}.` : 'Progress update recorded.',
          snapshot: snapshotOf(cur)
        },
        ...(sourceMoved ? [{
          id: `ba-${Date.now() + 1}`, date: this.today(), user: CURRENT_USER,
          action: 'Validation Source Changed',
          comments: `Validation source set to "${this.formValidationSource().trim() || '-'}".`
        }] : [])
      ]
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
      pendingWith: 'Sponsor',
      auditLog: [...cur.auditLog, {
        id: `ba-${Date.now()}`, date: this.today(), user: CURRENT_USER,
        action: 'Closure Submitted',
        comments: (hasFinancial(cur)
          ? `Final realised value ${this.money(this.num(outcome))} submitted for approval.`
          : `${outcome} submitted for approval.`) +
          (this.formComments().trim() ? ` ${this.formComments().trim()}` : ''),
        snapshot: snapshotOf(cur)
      }]
    }));
    this.closeAction();
  }

  /**
   * Baseline change — appends a new BL id at Pending Approval. The current
   * approved baseline is untouched until someone approves it.
   */
  protected readonly actionValid = computed(() => {
    const b = this.actionBenefit();
    if (!b) return false;
    if (this.actionKind() === 'update') {
      // Mixed benefits need both halves answered; a single-kind benefit only its own.
      const wantActual = hasFinancial(b) ? this.formActual().trim() !== '' : true;
      const wantProgress = hasNonFinancial(b) ? this.formProgress().trim() !== '' : true;
      return wantActual && wantProgress;
    }
    return this.formOutcome().trim() !== '';
  });

  /* ---------------- Add New Benefit ---------------- */

  protected readonly createOpen = signal(false);

  protected readonly draftName = signal('');
  protected readonly draftOwners = signal<string[]>([]);
  protected readonly draftCategories = signal<string[]>([]);
  protected readonly draftDescription = signal('');
  protected readonly draftValidationSource = signal('');
  /** The prose baseline a non-financial benefit carries instead of a figure. */
  /** Baselines being defined for a new benefit, of either kind. */
  protected readonly draftBaselineLines = signal<BaselineLine[]>([]);
  protected readonly draftTypeDerived = computed(() => benefitTypeOf(this.draftBaselineLines()));
  protected readonly draftHasFinancial = computed(() =>
    this.draftBaselineLines().some((l) => l.kind === 'Financial'));

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

  protected readonly yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

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

  /** Records the visit, so Create unlocks once Review has been opened. */
  protected onWizardTab(key: string | undefined) {
    if (!key) return;
    this.wizardTab.set(key);
    if (key === 'review') this.reviewSeen.set(true);
  }

  protected readonly draftBaseline = computed(() => {
    if (!this.draftFinancial()) return null;
    const years = this.years();
    return this.draftLines().reduce(
      (sum, r) => sum + years.reduce((t, y) => t + (r.values[y] ?? 0), 0), 0);
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
  /**
   * The Baseline Definition page is complete. A financial benefit needs at
   * least one line carrying a figure; a non-financial one needs its prose
   * baseline. Creation is the first time a baseline exists, so leaving it
   * empty would create a benefit with nothing to measure against.
   */
  protected readonly baselineValid = computed(() => {
    if (!this.draftFinancial()) return this.draftBaselineLines().length > 0;
    return (this.draftBaseline() ?? 0) > 0;
  });

  /** Page 1 alone — what the Next button needs. */
  protected readonly detailsValid = computed(() =>
    this.draftName().trim() !== '' && this.draftOwners().length > 0 &&
    this.draftStart() !== '' && this.draftEnd() !== '');

  /**
   * Review has actually been looked at. The page exists so someone confirms
   * what they are about to create; letting Create fire from an earlier tab
   * would make it decoration.
   */
  protected readonly reviewSeen = signal(false);

  protected readonly createValid = computed(() =>
    this.detailsValid() && this.baselineValid() && this.reviewSeen());

  protected openCreate() {
    this.wizardTab.set('details');
    this.reviewSeen.set(false);
    this.draftName.set('');
    this.draftOwners.set([]);
    this.draftCategories.set([]);
    this.draftValidationSource.set('');
    this.draftBaselineLines.set([]);
    this.draftFile.set(null);
    this.upload.set(null);
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
      benefitRef: '', baselineId: '', typeOfFinancial: '', driver: '', measure: '', values: {}, comments: ''
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
      type: this.draftTypeDerived(),
      categories: this.draftCategories(),
      description: this.draftDescription().trim(),
      validationSource: this.draftValidationSource().trim(),
      owners: this.draftOwners(),
      baselineId,
      originalApprovedBaseline: baseline,
      currentApprovedBaseline: baseline,
      startDate: this.draftStart(),
      endDate: this.draftEnd(),
      baselineLines: this.draftBaselineLines().map((l) => ({ ...l })),
      // Creation is not a change to anything, so there is nothing to approve:
      // the benefit starts tracking and only later EDITS go to the Sponsor.
      approvalStatus: 'Approved',
      approvedBy: CURRENT_USER,
      approvalDate: today,
      status: 'Tracking Active',
      // Financial figures only ever arrive by upload, so a new benefit starts
      // with none until its template has been attached.
      financialRows: this.draftFile() ? this.draftLines().map((r) => ({ ...r, benefitRef: ref })) : [],
      financialFile: this.draftFile() ?? undefined,
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
        comments: `${baselineId} opened at ${financial ? this.money(baseline) : 'non-financial benefit'}.`
      }]
    };

    benefitsFor(this.workstreamId()).update((rows) => [...rows, benefit]);
    this.closeCreate();
    this.toastBenefitId.set(benefit.id);
    this.toast.set('Benefit created and tracking is now active');
  }

  /* ---------------- Snackbar ---------------- */

  /**
   * One transient confirmation at a time. Held as a signal rather than pushed
   * into a service because nothing outside this page raises one yet — RULES #8
   * applies to invented infrastructure as much as to invented UI.
   */
  protected readonly toast = signal<string | null>(null);
  /** The benefit the confirmation's "View benefit" action reopens, if any. */
  protected readonly toastBenefitId = signal<string | null>(null);

  private toastTimer?: ReturnType<typeof setTimeout>;

  /** A decision made in the embedded queue confirms through this page's snackbar. */
  protected onDecision(event: { message: string; benefitId: string }) {
    this.toastBenefitId.set(event.benefitId);
    this.toast.set(event.message);
  }

  protected dismissToast() { this.toast.set(null); this.toastBenefitId.set(null); }

  protected viewToastBenefit() {
    const id = this.toastBenefitId();
    const benefit = id ? this.benefits().find((b) => b.id === id) : null;
    if (benefit) this.openDetail(benefit);
    this.dismissToast();
  }

  /**
   * What the Benefit Status column and the summary show.
   *
   * Derived rather than written onto `status`: the lifecycle status still means
   * where the benefit is in its life (tracking, closing, closed), and a pending
   * edit is a separate fact about it. Writing 'pending' over the lifecycle value
   * would lose what to restore once a decision is made.
   */
  protected displayStatus(b: Benefit): string {
    return b.pendingUpdate?.status === 'Pending Approval' ? 'Update Pending Approval' : b.status;
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
