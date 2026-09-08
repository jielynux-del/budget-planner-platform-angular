import { Component, computed, input, signal } from '@angular/core';
import {
  UiButton, UiCard, UiColumnHeader, UiDateInput, UiIcon, UiIconButton, UiKebabMenu,
  UiModalShell, UiPagination, UiPill, UiPopover, UiSectionHeader, UiSegmented, UiSelect,
  UiStatusTag, UiTable, UiTableCard, UiTableHeader, UiTableRow,
  type UiMenuItem, type UiPillColor, type UiSegment, type UiTagVariant
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
    UiKebabMenu, UiPagination, UiModalShell, UiSectionHeader
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

  /** The table switches views in place rather than through page tabs. */
  protected readonly views: UiSegment[] = [
    { key: 'tracking', label: 'Benefits Tracking' },
    { key: 'baseline', label: 'Baseline Management' }
  ];
  protected readonly view = signal('tracking');

  protected readonly filtersOpen = signal(false);
  protected readonly owner = signal(ALL);
  protected readonly status = signal(ALL);
  protected readonly realisationFrom = signal('');
  protected readonly realisationTo = signal('');

  protected readonly colName = signal(ALL);
  protected readonly colType = signal(ALL);
  protected readonly colOwner = signal(ALL);
  protected readonly colStatus = signal(ALL);
  protected readonly colApproval = signal(ALL);

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

  protected readonly nameOptions = computed(() => [ALL, ...this.benefits().map((b) => b.name)]);

  protected readonly filtered = computed<Benefit[]>(() =>
    this.benefits().filter((b) =>
      (this.owner() === ALL || b.owner === this.owner()) &&
      (this.status() === ALL || b.status === this.status()) &&
      (this.statusTile() === ALL || b.status === this.statusTile()) &&
      (!this.realisationFrom() || b.targetRealisationDate >= this.realisationFrom()) &&
      (!this.realisationTo() || b.targetRealisationDate <= this.realisationTo()) &&
      (this.colName() === ALL || b.name === this.colName()) &&
      (this.colType() === ALL || b.type === this.colType()) &&
      (this.colOwner() === ALL || b.owner === this.colOwner()) &&
      (this.colStatus() === ALL || b.status === this.colStatus()) &&
      (this.colApproval() === ALL || b.approvalStatus === this.colApproval())
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

  /** Row click opens the benefit; the audit icon opens just its history. */
  protected openDetail(b: Benefit) { this.detailId.set(b.id); }
  protected openAudit(b: Benefit) { this.auditId.set(b.id); }

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
