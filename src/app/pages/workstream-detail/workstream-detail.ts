import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  UiButton, UiIcon, UiPageHeader, UiSectionHeader, UiStatusTag, UiTabs, type UiTab, type UiTagVariant
} from 'ai-dls-kit';
import { workstreamById } from '../../data/workstreams';

const STATUS_VARIANT: Record<string, UiTagVariant> = {
  'Not Started': 'neutral',
  'Business Case Preparation': 'purple',
  'In Progress': 'neutral',
  'Completed / Pending Closure': 'green',
  'Operate': 'green',
  'On-Hold': 'amber',
  'Cancelled': 'red'
};

@Component({
  selector: 'app-workstream-detail',
  imports: [UiPageHeader, UiButton, UiIcon, UiTabs, UiStatusTag, UiSectionHeader],
  templateUrl: './workstream-detail.html',
  styleUrl: './workstream-detail.scss'
})
export class WorkstreamDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap);

  protected readonly ws = computed(() => workstreamById(this.params()?.get('id') ?? ''));
  protected readonly activeTab = signal('work-profile');

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

  protected back() {
    this.router.navigate(['/workstreams']);
  }
}
