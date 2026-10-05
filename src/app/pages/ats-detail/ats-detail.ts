import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  UiButton, UiCard, UiColumnHeader, UiIcon, UiInfoBanner, UiNavGroup, UiNavPanel,
  UiNavSubItem, UiSelect, UiSnackbar, UiTable, UiTableRow, UiTabs, UiTextarea,
  type UiNavStatus, type UiSelectOption, type UiTab
} from 'ai-dls-kit';
import { amountTotal, ATS_CURRENCIES, type Ats, type AtsMonth } from '../../data/ats';
import {
  approveAts, atsRecord, canDecide, canSubmit, reworkAts, submitAts
} from '../../data/atsStore';
import { currentPersona } from '../../data/personas';
import { benefitsFor } from '../../data/benefitsStore';
import { ValueBenefits } from '../value-benefits/value-benefits';

type Period = 'monthly' | 'quarterly' | 'yearly';

/** One row of the Total Financials table: a label plus a value per period column. */
interface FinancialRow {
  label: string;
  values: number[];
}

const QUARTERS: Array<[number, number, number]> = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];

@Component({
  selector: 'app-ats-detail',
  imports: [
    RouterLink, UiNavPanel, UiNavGroup, UiNavSubItem, UiCard, UiButton, UiIcon,
    UiInfoBanner, UiTabs, UiSelect, UiTable, UiTableRow, UiColumnHeader, ValueBenefits,
    UiTextarea, UiSnackbar
  ],
  templateUrl: './ats-detail.html',
  styleUrl: './ats-detail.scss'
})
export class AtsDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap);

  protected readonly record = computed<Ats | null>(() => atsRecord(this.params()?.get('id') ?? '')());

  /** ui-nav-panel is absolutely positioned, so the main column reserves its width. */
  protected readonly panelExpanded = signal(true);

  private readonly query = toSignal(this.route.queryParamMap);

  /**
   * Derived from the URL rather than held, so a link into a benefit opens the
   * right tab — the approvals queue navigates straight to one.
   */
  protected readonly activeTab = linkedSignal<string>(() => this.query()?.get('tab') || 'details');

  protected readonly openBenefitRef = computed(() => this.query()?.get('benefit') ?? null);

  /**
   * A benefit opens as a page of its own, not a panel inside this one: the
   * reader has moved DOWN a level. The request's own chrome — its tree, header
   * and tabs — steps aside, leaving only the app's nav rail, and the benefit
   * page's back chevron brings them back up.
   */
  protected readonly benefitOpen = computed(() =>
    this.activeTab() === 'benefits' && !!this.openBenefitRef());

  /** The benefits logged against this request. */
  protected readonly benefits = computed(() => {
    const id = this.record()?.id;
    return id ? benefitsFor(id)() : [];
  });

  /**
   * A request under approval travels as one package, so its benefits are
   * locked with it: nothing in an ATS can change while the ATS is pending.
   */
  protected readonly benefitsLocked = computed(() => this.record()?.status === 'Pending Approval');

  /**
   * Who the request is with, said plainly. Null once it is approved or closed,
   * because there is then nothing outstanding to say.
   */
  protected readonly stateNote = computed(() => {
    const r = this.record();
    if (!r) return null;
    if (r.status === 'Pending Approval') {
      return `Pending approval with ${r.approvers[0] ?? 'the approver'}. Nothing in this request can be changed until it is approved or sent back.`;
    }
    if (r.status === 'Sent for Rework') return r.reworkNote ?? 'Sent back for rework.';
    if (r.status === 'Draft') return 'Draft. Populate its benefits, then send it for approval.';
    return null;
  });

  protected readonly stateTone = computed(() =>
    this.record()?.status === 'Sent for Rework' ? 'warning' as const
      : this.record()?.status === 'Pending Approval' ? 'warning' as const
      : 'info' as const);
  protected readonly tabs = computed<UiTab[]>(() => {
    const alerts = this.record()?.alerts ?? 0;
    return [
      { key: 'details', label: 'ATS Details' },
      { key: 'alerts', label: 'Drawdown Alerts', count: alerts > 0 ? alerts : undefined },
      { key: 'benefits', label: 'Benefits Tracking' },
      { key: 'owners', label: 'ATS Owners' }
    ];
  });

  protected onTab(key: string | undefined) {
    if (!key) return;
    this.activeTab.set(key);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: key === 'details' ? null : key, benefit: null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  /* ---------------- Approval ---------------- */

  protected readonly persona = currentPersona;

  /** The requester's action: available while the request is theirs to change. */
  protected readonly showSubmit = computed(() =>
    this.persona().canRequest && canSubmit(this.record()));

  /** The approver's: available only while it is sitting with them. */
  protected readonly showDecide = computed(() =>
    this.persona().canApprove && canDecide(this.record()));

  /** 'approve' | 'rework' while the decision dialog is open. */
  protected readonly decisionKind = signal<'approve' | 'rework' | null>(null);
  protected readonly decisionNote = signal('');

  /**
   * A rework must say what to change — the requester cannot act on "no". An
   * approval may carry a note but does not need one.
   */
  protected readonly decisionValid = computed(() =>
    this.decisionKind() === 'approve' || this.decisionNote().trim() !== '');

  protected openDecision(kind: 'approve' | 'rework') {
    this.decisionNote.set('');
    this.decisionKind.set(kind);
  }

  protected closeDecision() { this.decisionKind.set(null); }

  protected confirmDecision() {
    const r = this.record();
    const kind = this.decisionKind();
    if (!r || !kind || !this.decisionValid()) return;
    if (kind === 'approve') approveAts(r.id, this.persona().name, this.decisionNote());
    else reworkAts(r.id, this.persona().name, this.decisionNote());
    this.decisionKind.set(null);
    this.toast.set(kind === 'approve' ? 'Request approved' : 'Request sent back for rework');
  }

  protected submit() {
    const r = this.record();
    if (!r) return;
    submitAts(r.id, this.persona().name);
    this.toast.set('Request submitted for approval');
  }

  protected readonly toast = signal<string | null>(null);
  protected dismissToast() { this.toast.set(null); }

  protected readonly bannerDismissed = signal(false);

  protected readonly scenarioOptions: UiSelectOption[] = [
    { value: 'forecast', label: 'Forecast' },
    { value: 'budget', label: 'Budget' },
    { value: 'actuals', label: 'Actuals' }
  ];
  protected readonly scenario = signal('forecast');

  protected readonly currencyOptions: UiSelectOption[] = ATS_CURRENCIES.map((c) => ({ value: c, label: c }));
  protected readonly currency = signal(ATS_CURRENCIES[0]);

  /**
   * ui-sub-tabs would read as a filter within the section above it; here the
   * three periods switch which COLUMNS the same table renders, which is the
   * `ui-tabs` "plain" contract (a view switch), so the section-level component
   * is reused rather than reached for a second time.
   */
  protected readonly periodTabs: UiTab[] = [
    { key: 'monthly', label: 'Monthly' },
    { key: 'quarterly', label: 'Quarterly' },
    { key: 'yearly', label: 'Yearly' }
  ];
  protected readonly period = signal<Period>('monthly');

  protected readonly periodColumns = computed(() => {
    const p = this.period();
    if (p === 'monthly') {
      return Array.from({ length: 12 }, (_, i) =>
        new Date(2026, i, 1).toLocaleString('en', { month: 'short' }));
    }
    if (p === 'quarterly') return ['Q1', 'Q2', 'Q3', 'Q4'];
    return ['2026'];
  });

  /** Sums the record's months into whichever bucket the active period needs. */
  private bucketsFor(months: AtsMonth[], key: 'investment' | 'pnl'): number[] {
    const p = this.period();
    if (p === 'monthly') {
      return Array.from({ length: 12 }, (_, i) => months.find((m) => m.month === i + 1)?.[key] ?? 0);
    }
    if (p === 'quarterly') {
      return QUARTERS.map((q) => q.reduce((sum, m) => sum + (months.find((x) => x.month === m)?.[key] ?? 0), 0));
    }
    return [months.reduce((sum, m) => sum + m[key], 0)];
  }

  protected readonly financialRows = computed<FinancialRow[]>(() => {
    const months = this.record()?.months ?? [];
    return [
      { label: 'Total Investment', values: this.bucketsFor(months, 'investment') },
      { label: 'Total P&L', values: this.bucketsFor(months, 'pnl') }
    ];
  });

  protected rowYearTotal(row: FinancialRow) {
    return row.values.reduce((s, v) => s + v, 0);
  }

  /** The Grand Total column is the same 2026-only figure until further years exist. */
  protected rowGrandTotal(row: FinancialRow) {
    return this.rowYearTotal(row);
  }

  protected totalInvestment(r: Ats) {
    return amountTotal(r.totalInvestment);
  }

  protected money(n: number) {
    const rounded = Math.round(n);
    return rounded === 0 ? '-' : rounded.toLocaleString('en-SG');
  }

  protected navStatus(status: string): UiNavStatus {
    return status === 'Approved' || status === 'Closed' ? 'completed'
      : status === 'Sent for Rework' ? 'error'
      : undefined;
  }

  protected backToListing() {
    this.router.navigate(['/approval-to-spend']);
  }

  protected openGuidelines() {
    // No guidelines content is specified for this prototype — button is a
    // placeholder affordance the nav panel calls for, wired to nothing yet.
  }
}
