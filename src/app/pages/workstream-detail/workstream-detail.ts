import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  UiButton, UiCard, UiIcon, UiIconButton, UiNavGroup, UiNavPanel, UiNavPanelHeader,
  UiNavSubItem, UiSectionHeader, UiStatusTag, UiTable, UiTableRow, UiColumnHeader, UiTabs,
  type UiNavStatus, type UiTab, type UiTagVariant
} from 'ai-dls-kit';
import { workstreamById } from '../../data/workstreams';
import { hierarchy } from '../../data/tree';
import { benefitsFor } from '../../data/benefitsStore';
import { ValueBenefits } from '../value-benefits/value-benefits';
import type { NodeStatus } from '../../data/models';

const STATUS_VARIANT: Record<string, UiTagVariant> = {
  'Not Started': 'neutral',
  'Business Case Preparation': 'purple',
  'In Progress': 'neutral',
  'Completed / Pending Closure': 'green',
  'Operate': 'green',
  'On-Hold': 'amber',
  'Cancelled': 'red'
};

/**
 * The tree's five dot colours don't survive: UiNavStatus is completed | error
 * | undefined, so amber and blue both fall to no dot.
 * (Kit is missing the amber / in-progress nav status.)
 */
const NAV_STATUS: Record<NodeStatus, UiNavStatus> = {
  green: 'completed',
  red: 'error',
  blue: undefined,
  amber: undefined,
  grey: undefined
};

@Component({
  selector: 'app-workstream-detail',
  imports: [
    UiNavPanel, UiNavPanelHeader, UiNavGroup, UiNavSubItem, UiCard,
    UiButton, UiIcon, UiIconButton, UiTabs, UiStatusTag, UiSectionHeader,
    UiTable, UiTableRow, UiColumnHeader, ValueBenefits
  ],
  templateUrl: './workstream-detail.html',
  styleUrl: './workstream-detail.scss'
})
export class WorkstreamDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap);

  protected readonly tree = hierarchy;
  protected readonly ws = computed(() => workstreamById(this.params()?.get('id') ?? ''));
  protected readonly activeTab = signal('work-profile');
  /** ui-nav-panel is absolutely positioned, so the main column reserves its width. */
  protected readonly panelExpanded = signal(true);

  protected readonly tabs: UiTab[] = [
    { key: 'work-profile', label: 'Work Profile' },
    { key: 'work-managers', label: 'Work Managers' },
    { key: 'key-dates', label: 'Key Dates' },
    { key: 'funding-source', label: 'Funding Source' },
    { key: 'approvers', label: 'Approvers' },
    { key: 'financials', label: 'Financials' },
    { key: 'work-allocation', label: 'Work Allocation' },
    { key: 'value-benefits', label: 'Value/Benefits' },
    { key: 'others', label: 'Others' }
  ];

  protected variantFor(status: string): UiTagVariant {
    return STATUS_VARIANT[status] ?? 'neutral';
  }

  protected navStatus(status: NodeStatus): UiNavStatus {
    return NAV_STATUS[status];
  }

  /** From the session store, so edits survive navigation. */
  protected readonly benefits = computed(() => {
    const w = this.ws();
    return w ? benefitsFor(w.id)() : [];
  });

  protected readonly financialYears = [2024, 2025, 2026, 2027];

  protected money(n: number) {
    return 'S$' + Math.round(n).toLocaleString();
  }

  protected lineTotal(values: Record<number, number>) {
    return this.financialYears.reduce((s, y) => s + (values[y] ?? 0), 0);
  }

  protected categoryTotal(category: 'Capex' | 'Opex', year: number) {
    return (this.ws()?.financials ?? [])
      .filter((f) => f.category === category)
      .reduce((s, f) => s + (f.values[year] ?? 0), 0);
  }

  protected categoryGrandTotal(category: 'Capex' | 'Opex') {
    return this.financialYears.reduce((s, y) => s + this.categoryTotal(category, y), 0);
  }

  protected readonly totalFte = computed(() =>
    (this.ws()?.allocations ?? []).reduce((s, a) => s + a.fte, 0));

  /** Key-date and approver statuses use the kit's own keyword vocabulary. */
  protected dateVariant(status: string): UiTagVariant {
    return status === 'Completed' ? 'green'
      : status === 'On Track' ? 'neutral'
      : status === 'At Risk' ? 'amber'
      : 'red';
  }

  protected approverVariant(status: string): UiTagVariant {
    return status === 'Approved' ? 'green' : status === 'Pending' ? 'amber' : 'red';
  }

  protected openWorkstream(id: string) {
    this.router.navigate(['/workstreams', id]);
  }

  protected backToListing() {
    this.router.navigate(['/workstreams']);
  }
}
