import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  UiButton, UiColumnHeader, UiIcon, UiIconButton, UiPageHeader, UiPagination,
  UiSearchInput, UiSelect, UiStatusTag, UiSummaryCard, UiTable, UiTableCard,
  UiTableHeader, UiTableRow
} from 'ai-dls-kit';
import { LOCATIONS, PLATFORMS, TECH_UNITS, WORK_STATUSES } from '../../data/lookups';
import { workstreams } from '../../data/workstreams';
import type { Workstream } from '../../data/models';
import type { UiTagVariant } from 'ai-dls-kit';

/**
 * The kit's status-tag keyword table covers approval-style statuses, not the
 * workstream lifecycle, so every one of ours would fall through to neutral.
 * Mapped explicitly instead. The kit ships five variants for our seven
 * statuses, so two pairs deliberately share a colour (see MIGRATION notes).
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

const ALL_STATUS = 'All Statuses';
const PAGE_SIZE = 20;

@Component({
  selector: 'app-workstream-listing',
  imports: [
    UiPageHeader, UiButton, UiIcon, UiIconButton, UiSearchInput, UiSelect, UiSummaryCard,
    UiTableCard, UiTableHeader, UiTable, UiColumnHeader, UiTableRow, UiStatusTag, UiPagination
  ],
  templateUrl: './workstream-listing.html',
  styleUrl: './workstream-listing.scss'
})
export class WorkstreamListing {
  private readonly router = inject(Router);

  protected readonly allStatus = ALL_STATUS;
  protected readonly statusOptions = [ALL_STATUS, ...WORK_STATUSES];
  protected readonly locationOptions = LOCATIONS;
  protected readonly platformOptions = PLATFORMS;
  protected readonly techUnitOptions = TECH_UNITS;

  protected readonly search = signal('');
  protected readonly status = signal<string>(ALL_STATUS);
  protected readonly location = signal<string>(LOCATIONS[0]);
  protected readonly platform = signal<string>(PLATFORMS[0]);
  protected readonly techUnit = signal<string>(TECH_UNITS[0]);
  protected readonly page = signal(1);

  /** Every row matching the current filters, before paging. */
  protected readonly filtered = computed<Workstream[]>(() => {
    const q = this.search().trim().toLowerCase();
    const status = this.status();
    const location = this.location();
    const platform = this.platform();
    const techUnit = this.techUnit();
    return workstreams.filter((w) =>
      (status === ALL_STATUS || w.workStatus === status) &&
      (location === LOCATIONS[0] || w.reportingLocation === location) &&
      (platform === PLATFORMS[0] || w.platform === platform) &&
      (techUnit === TECH_UNITS[0] || w.techUnit === techUnit) &&
      (!q || w.name.toLowerCase().includes(q) || w.code.toLowerCase().includes(q))
    );
  });

  protected readonly rows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  /** Location and work-status counts for the summary card, from the filtered set. */
  protected variantFor(status: string): UiTagVariant {
    return STATUS_VARIANT[status] ?? 'neutral';
  }

  protected open(id: string) {
    this.router.navigate(['/workstreams', id]);
  }

  protected readonly locationItems = computed(() => {
    const rows = this.filtered();
    const sg = rows.filter((w) => w.singapore).length;
    return [
      { label: 'Singapore', count: sg },
      { label: 'Non-Singapore', count: rows.length - sg }
    ];
  });

  protected readonly statusItems = computed(() => {
    const rows = this.filtered();
    const count = (s: string) => rows.filter((w) => w.workStatus === s).length;
    return [
      { label: 'Not Started', count: count('Not Started') },
      { label: 'Business Case Preparation', count: count('Business Case Preparation') },
      { label: 'In Progress', count: count('In Progress') },
      { label: 'Completed / Pending Closure', count: count('Completed / Pending Closure') },
      { label: 'Operate', count: count('Operate') },
      { label: 'On-Hold / Cancelled', count: rows.filter((w) => w.workStatus === 'On-Hold' || w.workStatus === 'Cancelled').length }
    ];
  });
}
