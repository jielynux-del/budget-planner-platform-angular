import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  UiButton, UiCard, UiColumnHeader, UiFilterTabs, UiIcon, UiIconButton, UiInfoBanner,
  UiMultiSelect, UiPageHeader, UiPagination, UiSearchInput, UiSectionHeader, UiSelect,
  UiStatusTag, UiSummaryCard, UiTable, UiTableCard, UiTableHeader, UiTableRow,
  type UiFilterTab, type UiTagVariant
} from 'ai-dls-kit';
import {
  LOCATIONS, PLATFORMS, REPORTING_FLAGS, SCENARIOS, TECH_UNITS, WORK_STATUSES, YEARS
} from '../../data/lookups';
import { workstreams } from '../../data/workstreams';
import type { Workstream } from '../../data/models';

/**
 * The kit's status-tag keyword table covers approval statuses, not the
 * workstream lifecycle, so ours would all fall through to neutral. Mapped
 * explicitly. The kit ships five variants for seven statuses, so two pairs
 * deliberately share a colour.
 */
const STATUS_VARIANT: Record<string, UiTagVariant> = {
  'Not Started': 'neutral',
  'Business Case Preparation': 'purple',
  'In Progress': 'neutral',
  'Completed / Pending Closure': 'green',
  'Operate': 'green',
  'On-Hold': 'amber',
  'Cancelled': 'red'
};

const ALL_STATUSES = 'all';
const PAGE_SIZE = 20;

@Component({
  selector: 'app-workstream-listing',
  imports: [
    UiPageHeader, UiButton, UiIcon, UiIconButton, UiInfoBanner, UiSelect, UiMultiSelect,
    UiCard, UiSectionHeader, UiSummaryCard, UiFilterTabs, UiSearchInput, UiTableCard,
    UiTableHeader, UiTable, UiColumnHeader, UiTableRow, UiStatusTag, UiPagination
  ],
  templateUrl: './workstream-listing.html',
  styleUrl: './workstream-listing.scss'
})
export class WorkstreamListing {
  private readonly router = inject(Router);

  protected readonly locationOptions = LOCATIONS;
  protected readonly techUnitOptions = TECH_UNITS;
  protected readonly platformOptions = PLATFORMS;
  protected readonly yearOptions = YEARS.map(String);
  protected readonly scenarioOptions = SCENARIOS as unknown as string[];
  protected readonly flagOptions = REPORTING_FLAGS;
  protected readonly statusOptions = [...WORK_STATUSES];

  protected readonly noticeOpen = signal(true);
  protected readonly search = signal('');
  protected readonly location = signal(LOCATIONS[0]);
  protected readonly techUnit = signal(TECH_UNITS[0]);
  protected readonly platform = signal(PLATFORMS[0]);
  protected readonly year = signal('2026');
  protected readonly scenario = signal('Forecast');
  protected readonly reportingFlag = signal(REPORTING_FLAGS[0]);
  /** Column filter — empty means no status filter at all. */
  protected readonly statusPicks = signal<string[]>([]);
  /** Status tile filter — a single status, or the "all" sentinel. */
  protected readonly statusTile = signal(ALL_STATUSES);
  protected readonly page = signal(1);

  /** Everything the global selects allow through, before status filtering. */
  protected readonly scope = computed<Workstream[]>(() => {
    const q = this.search().trim().toLowerCase();
    return workstreams.filter((w) =>
      (this.location() === LOCATIONS[0] || w.reportingLocation === this.location()) &&
      (this.techUnit() === TECH_UNITS[0] || w.techUnit === this.techUnit()) &&
      (this.platform() === PLATFORMS[0] || w.platform === this.platform()) &&
      (!q || w.name.toLowerCase().includes(q) || w.code.toLowerCase().includes(q))
    );
  });

  protected readonly filtered = computed<Workstream[]>(() => {
    const picks = this.statusPicks();
    const tile = this.statusTile();
    return this.scope().filter((w) => {
      if (picks.length && !picks.includes(w.workStatus)) return false;
      if (tile === ALL_STATUSES) return true;
      if (tile === 'On-Hold / Cancelled') return w.workStatus === 'On-Hold' || w.workStatus === 'Cancelled';
      return w.workStatus === tile;
    });
  });

  protected readonly rows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  protected readonly rangeStart = computed(() => (this.filtered().length ? (this.page() - 1) * PAGE_SIZE + 1 : 0));
  protected readonly rangeEnd = computed(() => Math.min(this.page() * PAGE_SIZE, this.filtered().length));

  protected readonly locationItems = computed(() => {
    const rows = this.scope();
    const sg = rows.filter((w) => w.singapore).length;
    return [
      { label: 'Singapore', count: sg },
      { label: 'Non-Singapore', count: rows.length - sg }
    ];
  });

  /** Status tiles double as the filter, so they are ui-filter-tabs with counts. */
  protected readonly statusTabs = computed<UiFilterTab[]>(() => {
    const rows = this.scope();
    const n = (s: string) => rows.filter((w) => w.workStatus === s).length;
    return [
      { key: ALL_STATUSES, label: 'All', count: rows.length },
      { key: 'Not Started', label: 'Not Started', count: n('Not Started') },
      { key: 'Business Case Preparation', label: 'Business Case Preparation', count: n('Business Case Preparation') },
      { key: 'In Progress', label: 'In Progress', count: n('In Progress') },
      { key: 'Completed / Pending Closure', label: 'Completed / Pending Closure', count: n('Completed / Pending Closure') },
      { key: 'Operate', label: 'Operate', count: n('Operate') },
      { key: 'On-Hold / Cancelled', label: 'On-Hold / Cancelled', count: n('On-Hold') + n('Cancelled') }
    ];
  });

  protected variantFor(status: string): UiTagVariant {
    return STATUS_VARIANT[status] ?? 'neutral';
  }

  protected open(id: string) {
    this.router.navigate(['/workstreams', id]);
  }
}
