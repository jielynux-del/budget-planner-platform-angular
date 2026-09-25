import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import {
  UiButton, UiColumnHeader, UiIcon, UiIconButton, UiInfoBanner,
  UiCard, UiPageHeader, UiPagination, UiPill, UiSelect, UiStatusTag, UiTable, UiTableCard,
  UiMultiSelect, UiTableHeader, UiTableRow, UiTextInput, UiTooltipDirective,
  type UiPillColor, type UiTagVariant
} from 'ai-dls-kit';
import {
  ATS_COST_TYPES, ATS_CURRENCIES, ATS_RECORDS, ATS_STATUSES, ATS_SUB_TYPES, ATS_WORK_TYPES,
  amountTotal, type Ats
} from '../../data/ats';
import { LOCATIONS, PLATFORMS, TECH_UNITS } from '../../data/lookups';

const ALL = 'All';

/** Status colours, chosen so Draft reads as unfinished rather than as a fault. */
const STATUS_VARIANT: Record<string, UiTagVariant> = {
  'Approved': 'green',
  'Pending Approval': 'amber',
  'Sent for Rework': 'purple',
  'Draft': 'neutral',
  'Closed': 'neutral'
};

/** Dot colour per status, matching the Value/Benefits summary card. */
const STATUS_DOT: Record<string, UiPillColor> = {
  'Approved': 'green',
  'Pending Approval': 'yellow',
  'Sent for Rework': 'yellow',
  'Draft': 'grey',
  'Closed': 'grey'
};

@Component({
  selector: 'app-ats-listing',
  imports: [
    UiSelect, UiPageHeader, UiIcon, UiIconButton, UiInfoBanner, UiButton,
    UiCard, UiPill, UiTableCard, UiTableHeader, UiTable, UiColumnHeader, UiTableRow,
    UiStatusTag, UiPagination, UiTextInput, UiMultiSelect, UiTooltipDirective
  ],
  templateUrl: './ats-listing.html',
  styleUrl: './ats-listing.scss'
})
export class AtsListing {
  private readonly router = inject(Router);

  protected readonly all = ALL;
  protected readonly locationOptions = LOCATIONS;
  protected readonly techUnitOptions = TECH_UNITS;
  protected readonly platformOptions = PLATFORMS;
  protected readonly costTypeOptions = ATS_COST_TYPES;
  protected readonly currencyOptions = ATS_CURRENCIES;

  protected readonly location = signal(LOCATIONS[0]);
  protected readonly techUnit = signal(TECH_UNITS[0]);
  protected readonly platform = signal(PLATFORMS[0]);
  protected readonly costType = signal(ATS_COST_TYPES[0]);
  protected readonly currency = signal(ATS_CURRENCIES[0]);

  protected readonly noticeOpen = signal(true);

  /**
   * Column filters — a multi-select where the value comes from a known set, a
   * text box where it is a free identifier. Multi rather than single so the
   * column filters behave the way Value/Benefits' do.
   */
  protected readonly colWorkType = signal<string[]>([]);
  protected readonly colPlatform = signal<string[]>([]);
  protected readonly colSubPlatform = signal<string[]>([]);
  protected readonly colSubType = signal<string[]>([]);
  protected readonly colStatus = signal<string[]>([]);
  protected readonly colSubAtsName = signal('');
  protected readonly colMasterName = signal('');
  protected readonly colLePc = signal('');
  protected readonly colSubWorkstream = signal('');
  protected readonly colRequestor = signal('');
  protected readonly colManager = signal('');
  protected readonly colApprover = signal('');

  protected readonly workTypeChoices = [...ATS_WORK_TYPES];
  protected readonly subTypeChoices = [...ATS_SUB_TYPES];
  protected readonly statusChoices = [...ATS_STATUSES];
  protected readonly platformChoices = PLATFORMS.slice(1);
  protected readonly subPlatformChoices = [...new Set(ATS_RECORDS.map((a) => a.subPlatform))];

  /**
   * The summary card above the table. Each figure filters, and the counts are
   * taken before the status filter so a tile still says what selecting it
   * would show once another tile is active.
   */
  protected readonly summaryTotal = computed(() => this.beforeStatus().length);

  protected readonly summary = computed(() => {
    const rows = this.beforeStatus();
    const pct = (n: number) => (rows.length ? Math.round((n / rows.length) * 100) : 0);
    return ATS_STATUSES.map((s) => {
      const n = rows.filter((a) => a.status === s).length;
      return { key: s, label: s, count: n, pct: pct(n), dot: STATUS_DOT[s] };
    });
  });

  protected readonly statusTile = signal(ALL);

  protected readonly page = signal(1);
  protected readonly pageSize = signal(10);

  /**
   * Everything except the status pill, so the pill counts describe what
   * selecting them would actually show rather than the unfiltered total.
   */
  private readonly beforeStatus = computed(() => {
    const like = (v: string, q: string) => !q || v.toLowerCase().includes(q.trim().toLowerCase());
    return ATS_RECORDS.filter((a) =>
      (this.platform() === PLATFORMS[0] || a.platform === this.platform()) &&
      (!this.colWorkType().length || this.colWorkType().includes(a.workType)) &&
      (!this.colPlatform().length || this.colPlatform().includes(a.platform)) &&
      (!this.colSubPlatform().length || this.colSubPlatform().includes(a.subPlatform)) &&
      (!this.colSubType().length || this.colSubType().includes(a.masterType)) &&
      like(a.subAts[0]?.name ?? a.name, this.colSubAtsName()) &&
      like(a.name, this.colMasterName()) &&
      like(a.lePcCode, this.colLePc()) &&
      like(a.subWorkstreamName, this.colSubWorkstream()) &&
      like(a.requestor, this.colRequestor()) &&
      like(a.portfolioManagers.join(' '), this.colManager()) &&
      like(a.doaApprovers.join(' '), this.colApprover()));
  });

  protected readonly filtered = computed(() => {
    const byStatus = this.beforeStatus().filter((a) =>
      (this.statusTile() === ALL || a.status === this.statusTile()) &&
      (!this.colStatus().length || this.colStatus().includes(a.status)));
    return byStatus;
  });

  protected readonly rows = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

  protected statusVariant(s: string): UiTagVariant { return STATUS_VARIANT[s] ?? 'neutral'; }

  /** Three letters is what fits the column; the full word rides in a tooltip. */
  protected workTypeCode(t: string) {
    return t === 'Initiative' ? 'INIT' : t === 'Change' ? 'CHG' : 'RUN';
  }

  protected workTypeTip(t: string) {
    return { title: 'Work Type', lines: [t] };
  }

  protected money(n: number) {
    return n ? n.toLocaleString('en-SG') : '0';
  }

  protected total(a: Ats['totalInvestment']) { return amountTotal(a); }

  protected openAts(a: Ats) {
    this.router.navigate(['/approval-to-spend', a.id]);
  }

  /** Clicking the active tile clears it, so the card never becomes a trap. */
  protected toggleStatus(key: string) {
    this.statusTile.set(this.statusTile() === key ? ALL : key);
    this.page.set(1);
  }
}
