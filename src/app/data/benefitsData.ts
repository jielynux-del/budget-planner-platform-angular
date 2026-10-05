import type { BaselineLine, Benefit, BenefitSnapshot, BenefitType, BenefitUpdate } from './models';
import type { Ats } from './ats';
import { seedBenefitsFor } from './benefitsSeed';
import { businessUnitsFor } from './people';

/** Signed-in user for the prototype — stamped on anything the user submits. */
export const CURRENT_USER = 'tanhuiling';

export const BENEFIT_STATUSES = ['Tracking Active', 'Closure Pending Approval', 'Closed'] as const;

export const BENEFIT_TYPES = ['Financial', 'Non-Financial'] as const;

export const NON_FINANCIAL_CATEGORIES = [
  'Customer Experience',
  'Operational Resilience',
  'Cross-Border Capability',
  'Risk & Control',
  'Employee Experience'
];

export const variancePct = (actual: number, baseline: number | null) =>
  !baseline ? 0 : Math.round(((actual - baseline) / baseline) * 1000) / 10;

/** Newest update for a benefit, or null when nothing has been reported. */
export const latestUpdate = (b: Benefit): BenefitUpdate | null =>
  b.reportingHistory.length ? b.reportingHistory[b.reportingHistory.length - 1] : null;

/** Baseline IDs run in one sequence across every benefit on the workstream. */
export const nextBaselineId = (benefits: Benefit[]) => {
  const used = benefits
    .flatMap((b) => b.baselineHistory.map((h) => h.baselineId))
    .map((id) => Number(id.replace(/\D/g, '')))
    .filter((n) => !Number.isNaN(n));
  const next = (used.length ? Math.max(...used) : 0) + 1;
  return `BL${String(next).padStart(4, '0')}`;
};

export const nextBenefitRef = (benefits: Benefit[]) => {
  const used = benefits
    .map((b) => Number(b.benefitRef.replace(/\D/g, '')))
    .filter((n) => !Number.isNaN(n));
  return `B${String((used.length ? Math.max(...used) : 0) + 1).padStart(2, '0')}`;
};

/** The benefit as it stands now, for stamping onto a new audit entry. */
export function snapshotOf(b: Benefit): BenefitSnapshot {
  const last = b.reportingHistory[b.reportingHistory.length - 1];
  return {
    name: b.name,
    type: b.type,
    categories: [...b.categories],
    owners: [...b.owners],
    businessUnits: businessUnitsFor(b.owners),
    description: b.description,
    validationSource: b.validationSource,
    startDate: b.startDate,
    endDate: b.endDate,
    status: b.status,
    baselineId: b.baselineId,
    baselineValue: b.currentApprovedBaseline,
    originalBaseline: b.originalApprovedBaseline,
    reportingLines: b.reportingHistory.length,
    latestReported: last
      ? (b.type === 'Financial' ? String(last.actualValue ?? '-') : last.progressUpdate)
      : '-'
  };
}

/**
 * Stamps a snapshot onto every seeded audit entry, at seed time.
 *
 * Done here rather than on read because it has to capture the benefit as
 * SEEDED — once a user edits the record, the old entries must keep saying what
 * they said. The baseline in force at each entry's date comes from
 * baselineHistory, which is append-only and therefore genuinely knowable; the
 * descriptive fields are the seeded ones, which never change before this runs.
 */
function withSeedSnapshots(b: Benefit): Benefit {
  return {
    ...b,
    auditLog: b.auditLog.map((entry) => {
      // The baseline in force at this entry's date — the history is a change
      // log now, so "in force" is simply the last change on or before it.
      const baseline = [...b.baselineHistory]
        .filter((h) => h.changedOn <= entry.date)
        .pop();
      const reported = b.reportingHistory.filter((r) => r.updateDate <= entry.date);
      const last = reported[reported.length - 1];
      return {
        ...entry,
        snapshot: {
          ...snapshotOf(b),
          baselineId: baseline?.baselineId ?? b.baselineHistory[0]?.baselineId ?? b.baselineId,
          baselineValue: baseline?.baselineValue ?? b.originalApprovedBaseline,
          startDate: baseline?.startDate ?? b.startDate,
          endDate: baseline?.endDate ?? b.endDate,
          reportingLines: reported.length,
          latestReported: last
            ? (b.type === 'Financial' ? String(last.actualValue ?? '-') : last.progressUpdate)
            : '-'
        }
      };
    })
  };
}


/**
 * A benefit's type, read from the baselines it holds. The single place this is
 * decided — nothing else may set `Benefit.type`.
 */
export function benefitTypeOf(lines: readonly BaselineLine[]): BenefitType {
  const fin = lines.some((l) => l.kind === 'Financial');
  const non = lines.some((l) => l.kind === 'Non-Financial');
  if (fin && non) return 'Mixed';
  if (fin) return 'Financial';
  return 'Non-Financial';
}

/** Whether a benefit carries a baseline of each kind — what actually gates the UI. */
export const hasFinancial = (b: Benefit) => b.baselineLines.some((l) => l.kind === 'Financial');
export const hasNonFinancial = (b: Benefit) => b.baselineLines.some((l) => l.kind === 'Non-Financial');

/** Total of a benefit's year-phased financial lines — its baseline value. */
export const financialTotal = (rows: Benefit['financialRows']) =>
  rows.reduce((sum, r) => sum + Object.values(r.values).reduce((s, v) => s + (v ?? 0), 0), 0);

/**
 * Seeded benefit state for an ATS request. Each request has its own benefits —
 * see `benefitsSeed.ts` — rather than the one shared set these inherited from
 * the workstream days, which made every request look identical.
 *
 * Benefits are populated before a request is sent for approval, so a Draft ATS
 * carries them too; there is no status that opens with none.
 */
export function defaultBenefits(ats: Ats): Benefit[] {
  return seedBenefitsFor(ats).map(withSeedSnapshots);
}
