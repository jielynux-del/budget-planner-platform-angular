import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  UiButton, UiCard, UiColumnHeader, UiIcon, UiInfoBanner, UiNavGroup, UiNavPanel,
  UiNavSubItem, UiSelect, UiTable, UiTableRow, UiTabs,
  type UiNavStatus, type UiSelectOption, type UiTab
} from 'ai-dls-kit';
import { atsById, amountTotal, ATS_CURRENCIES, type Ats, type AtsMonth } from '../../data/ats';

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
    UiInfoBanner, UiTabs, UiSelect, UiTable, UiTableRow, UiColumnHeader
  ],
  templateUrl: './ats-detail.html',
  styleUrl: './ats-detail.scss'
})
export class AtsDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap);

  protected readonly record = computed<Ats | null>(() => atsById(this.params()?.get('id') ?? ''));

  /** ui-nav-panel is absolutely positioned, so the main column reserves its width. */
  protected readonly panelExpanded = signal(true);

  protected readonly activeTab = signal('details');
  protected readonly tabs = computed<UiTab[]>(() => {
    const alerts = this.record()?.alerts ?? 0;
    return [
      { key: 'details', label: 'ATS Details' },
      { key: 'alerts', label: 'Drawdown Alerts', count: alerts > 0 ? alerts : undefined },
      { key: 'owners', label: 'ATS Owners' }
    ];
  });

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
