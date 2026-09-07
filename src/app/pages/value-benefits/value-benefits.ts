import { Component, computed, input, signal } from '@angular/core';
import {
  UiButton, UiCard, UiColumnHeader, UiDateInput, UiFilterTabs, UiIcon, UiKebabMenu,
  UiPagination, UiSelect, UiStatusTag, UiTable, UiTableCard, UiTableHeader, UiTableRow,
  type UiFilterTab, type UiMenuItem, type UiTagVariant
} from 'ai-dls-kit';
import { BENEFIT_STATUSES, latestUpdate } from '../../data/benefitsData';
import { BENEFIT_OWNERS } from '../../data/lookups';
import type { Benefit } from '../../data/models';

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

@Component({
  selector: 'app-value-benefits',
  imports: [
    UiCard, UiSelect, UiDateInput, UiButton, UiFilterTabs, UiTableCard, UiTableHeader,
    UiTable, UiColumnHeader, UiTableRow, UiStatusTag, UiKebabMenu, UiIcon, UiPagination
  ],
  templateUrl: './value-benefits.html',
  styleUrl: './value-benefits.scss'
})
export class ValueBenefits {
  readonly benefits = input.required<Benefit[]>();

  protected readonly all = ALL;
  protected readonly ownerOptions = [ALL, ...BENEFIT_OWNERS];
  protected readonly statusOptions = [ALL, ...BENEFIT_STATUSES];
  protected readonly typeOptions = [ALL, 'Financial', 'Non-Financial'];
  protected readonly approvalOptions = [ALL, 'Approved', 'Pending Approval', 'Rejected'];

  protected readonly subTabs: UiFilterTab[] = [
    { key: 'tracking', label: 'Benefits Tracking' },
    { key: 'baseline', label: 'Baseline Management' }
  ];
  protected readonly subTab = signal('tracking');

  /** Page-level filters, applied to both sub-tabs. */
  protected readonly owner = signal(ALL);
  protected readonly status = signal(ALL);
  protected readonly realisationFrom = signal('');
  protected readonly realisationTo = signal('');

  /** Column-level filters. */
  protected readonly colName = signal(ALL);
  protected readonly colType = signal(ALL);
  protected readonly colOwner = signal(ALL);
  protected readonly colStatus = signal(ALL);
  protected readonly colApproval = signal(ALL);
  protected readonly page = signal(1);

  protected readonly rowActions: UiMenuItem[] = [
    { key: 'view', label: 'View Benefit' },
    { key: 'update', label: 'Update Benefit' },
    { key: 'closure', label: 'Request Closure' }
  ];

  protected readonly baselineActions: UiMenuItem[] = [
    { key: 'history', label: 'View History' },
    { key: 'change', label: 'Request Baseline Change' }
  ];

  protected readonly nameOptions = computed(() => [ALL, ...this.benefits().map((b) => b.name)]);

  protected readonly filtered = computed<Benefit[]>(() =>
    this.benefits().filter((b) =>
      (this.owner() === ALL || b.owner === this.owner()) &&
      (this.status() === ALL || b.status === this.status()) &&
      (!this.realisationFrom() || b.targetRealisationDate >= this.realisationFrom()) &&
      (!this.realisationTo() || b.targetRealisationDate <= this.realisationTo()) &&
      (this.colName() === ALL || b.name === this.colName()) &&
      (this.colType() === ALL || b.type === this.colType()) &&
      (this.colOwner() === ALL || b.owner === this.colOwner()) &&
      (this.colStatus() === ALL || b.status === this.colStatus()) &&
      (this.colApproval() === ALL || b.approvalStatus === this.colApproval())
    )
  );

  protected readonly filtersActive = computed(() =>
    this.owner() !== ALL || this.status() !== ALL || !!this.realisationFrom() || !!this.realisationTo());

  protected latest(b: Benefit) {
    return latestUpdate(b);
  }

  protected money(n: number | null) {
    return n === null ? '-' : 'S$' + Math.round(n).toLocaleString();
  }

  protected variance(n: number | null) {
    return n === null ? '' : (n > 0 ? '+' : '') + n.toFixed(1) + '%';
  }

  protected lifecycleVariant(status: string): UiTagVariant {
    return LIFECYCLE_VARIANT[status] ?? 'neutral';
  }

  protected approvalVariant(status: string): UiTagVariant {
    return APPROVAL_VARIANT[status] ?? 'neutral';
  }

  protected clearFilters() {
    this.owner.set(ALL);
    this.status.set(ALL);
    this.realisationFrom.set('');
    this.realisationTo.set('');
  }
}
