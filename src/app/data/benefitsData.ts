import type { BaselineLine, Benefit, BenefitSnapshot, BenefitType, BenefitUpdate } from './models';
import type { Ats } from './ats';
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
 * Re-phases each benefit's financial lines onto ITS OWN year range.
 *
 * The seeded rows were written against a fixed 2024-2026 window while the
 * benefits carry their own start and end dates, so money sat in years the
 * benefit does not span. The edit table's columns follow the benefit's dates,
 * which made the row total disagree with the baseline it is supposed to
 * explain. Row totals are preserved exactly — the money is re-phased, not
 * changed — so every baseline figure still ties out.
 */
function realignFinancialYears(b: SeedBenefit): SeedBenefit {
  const from = Number(b.startDate.slice(0, 4));
  const to = Number(b.endDate.slice(0, 4));
  if (!from || !to || to < from) return b;
  const years = Array.from({ length: to - from + 1 }, (_, i) => from + i);

  return {
    ...b,
    financialRows: b.financialRows.map((row) => {
      const amounts = Object.keys(row.values)
        .sort()
        .map((k) => row.values[Number(k)] ?? 0);
      const values: Record<number, number> = {};
      years.forEach((y, i) => { values[y] = amounts[i] ?? 0; });
      // Anything beyond the new range folds into the final year so the row
      // total is untouched.
      const spill = amounts.slice(years.length).reduce((t, v) => t + v, 0);
      if (spill) values[years[years.length - 1]] += spill;
      return { ...row, values };
    })
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

/**
 * Baseline lines per benefit.
 *
 * Authored rather than derived: a non-financial baseline now has to say what
 * it measures and what counts as meeting it, and neither of those can be
 * invented from a prose sentence. B01 and B03 deliberately carry both kinds,
 * because a benefit that saves money and shortens a queue is one benefit to
 * the business, not two.
 */
const BASELINE_LINES: Record<string, BaselineLine[]> = {
  B01: [
    {
      id: 'bl-b01-1', kind: 'Financial', name: 'Manual effort released across hubs',
      baselineId: '', originalValue: null, currentValue: null,
      measure: '', unit: '', startingPoint: '', target: '', method: '', frequency: ''
    },
    {
      id: 'bl-b01-2', kind: 'Non-Financial', name: 'Straight-through processing rate',
      baselineId: '', originalValue: null, currentValue: null,
      measure: 'Share of cash and trade instructions completing with no manual touch.',
      unit: '% of instructions',
      startingPoint: '61% at March 2026, averaged across the four in-scope hubs.',
      target: 'Sustains 85% or above for three consecutive months.',
      method: 'Workflow audit extract, counted against total instructions received.',
      frequency: 'Monthly'
    }
  ],
  B02: [
    {
      id: 'bl-b02-1', kind: 'Financial', name: 'Incremental cross-border payment revenue',
      baselineId: '', originalValue: null, currentValue: null,
      measure: '', unit: '', startingPoint: '', target: '', method: '', frequency: ''
    }
  ],
  B03: [
    {
      id: 'bl-b03-1', kind: 'Non-Financial', name: 'Time to onboard a corporate client',
      baselineId: '', originalValue: null, currentValue: null,
      measure: 'Working days from signed mandate to first live transaction.',
      unit: 'Working days',
      startingPoint: '18 days median across the 2025 cohort.',
      target: 'Median of 7 days or fewer, held for two consecutive quarters.',
      method: 'Onboarding case records, median of all completions in the period.',
      frequency: 'Quarterly'
    },
    {
      id: 'bl-b03-2', kind: 'Non-Financial', name: 'Control exceptions raised at onboarding',
      baselineId: '', originalValue: null, currentValue: null,
      measure: 'Exceptions logged by second-line review on completed onboarding files.',
      unit: 'Exceptions per 100 files',
      startingPoint: '12 per 100 files in the 2025 review cycle.',
      target: 'Fewer than 4 per 100 files, with no critical-severity exceptions.',
      method: 'Second-line quality review sample, extrapolated to the full population.',
      frequency: 'Quarterly'
    }
  ],
  B04: [
    {
      id: 'bl-b04-1', kind: 'Non-Financial', name: 'Digital asset settlement capability',
      baselineId: '', originalValue: null, currentValue: null,
      measure: 'Corridors able to settle a tokenised instrument end to end in production.',
      unit: 'Live corridors',
      startingPoint: 'None in production at March 2026; two in pilot.',
      target: 'At least four corridors live, each having settled a real client transaction.',
      method: 'Production settlement records, confirmed with the corridor operations lead.',
      frequency: 'Quarterly'
    }
  ],
  B05: [
    {
      id: 'bl-b05-1', kind: 'Financial', name: 'Licence and support cost removed on vendor exit',
      baselineId: '', originalValue: null, currentValue: null,
      measure: '', unit: '', startingPoint: '', target: '', method: '', frequency: ''
    }
  ],
  B06: [
    {
      id: 'bl-b06-1', kind: 'Non-Financial', name: 'Change failure rate',
      baselineId: '', originalValue: null, currentValue: null,
      measure: 'Production changes that cause an incident or need rollback.',
      unit: '% of changes',
      startingPoint: '9.4% across the 2025 release history.',
      target: 'At or below 3% over a rolling twelve-week window.',
      method: 'Change records matched against the incident log.',
      frequency: 'Monthly'
    },
    {
      id: 'bl-b06-2', kind: 'Non-Financial', name: 'Mean time to restore service',
      baselineId: '', originalValue: null, currentValue: null,
      measure: 'Elapsed time from a severity-1 incident being raised to service restored.',
      unit: 'Minutes',
      startingPoint: '148 minutes mean across 2025 severity-1 incidents.',
      target: 'Mean of 45 minutes or fewer across a rolling quarter.',
      method: 'Incident management records, severity-1 only.',
      frequency: 'Monthly'
    }
  ]
};

/**
 * Attaches the baseline lines, and — where a benefit already carries financial
 * rows — the upload they are supposed to have come from. Financial figures are
 * only ever written by uploading a template, so seeded rows with no file
 * behind them would show a state the UI cannot otherwise produce.
 */
function withBaselines(b: SeedBenefit): Benefit {
  const lines = BASELINE_LINES[b.benefitRef] ?? [];
  // Baseline IDs run in one sequence per benefit. A financial line takes its
  // figures from the benefit's uploaded rows, because that is the only place a
  // financial baseline's value ever comes from.
  const financialTotalValue = financialTotal(b.financialRows);
  const withIds = lines.map((l, i) => ({
    ...l,
    baselineId: `${b.baselineId}-${String(i + 1).padStart(2, '0')}`,
    originalValue: l.kind === 'Financial' ? (b.originalApprovedBaseline ?? financialTotalValue) : null,
    currentValue: l.kind === 'Financial' ? (b.currentApprovedBaseline ?? financialTotalValue) : null
  }));
  // Seeded rows predate the per-baseline link, so they are stamped onto the
  // benefit's first financial baseline — which is the only one the seed has.
  const firstFinancial = withIds.find((l) => l.kind === 'Financial');
  return {
    ...b,
    financialRows: b.financialRows.map((r) => ({ ...r, baselineId: firstFinancial?.baselineId ?? '' })),
    baselineLines: withIds,
    // The seeded `type` is whatever the literal said; the baselines are now the
    // authority, so it is recomputed here rather than trusted.
    type: benefitTypeOf(lines),
    financialFile: b.financialRows.length
      ? {
          name: `${b.benefitRef}-financial-impact.xlsx`,
          size: '3.2 MB',
          uploadedBy: b.owners[0] ?? 'tanhuiling',
          // The most recent baseline change, which is when the workbook behind
          // it would have been attached.
          uploadedOn: b.baselineHistory[b.baselineHistory.length - 1]?.changedOn ?? b.startDate
        }
      : undefined
  };
}

/** Total of a benefit's year-phased financial lines — its baseline value. */
export const financialTotal = (rows: Benefit['financialRows']) =>
  rows.reduce((sum, r) => sum + Object.values(r.values).reduce((s, v) => s + (v ?? 0), 0), 0);

/**
 * Seeded benefit lifecycle state for an ATS request. Deterministic so figures
 * don't shift between reloads.
 *
 * Benefits are populated before an ATS is sent for approval, so a Draft ATS
 * carries them too — there is no status that opens with none.
 */
export function defaultBenefits(_ats: Ats): Benefit[] {
  return seedBenefits().map(realignFinancialYears).map(withBaselines).map(withSeedSnapshots);
}

/**
 * The seed literals, before baselines are attached. Typed without
 * `baselineLines` so the records themselves stay readable — `withBaselines`
 * is the single place those are authored.
 */
type SeedBenefit = Omit<Benefit, 'baselineLines'>;

function seedBenefits(): SeedBenefit[] {
  return [
    {
      id: 'bf-1',
      benefitRef: 'B01',
      name: 'Workflow digitisation and regionalisation saving',
      type: 'Financial',
      categories: ['Cost Efficiency'],
      description: 'Reduction in manual effort through workflow digitisation across cash, trade, corporate loans and reconciliation.',
      validationSource: 'PC Code PC-4471 · Digital Process cost centre',
      owners: ['Peter Weng Jian TAN', 'Michelle Widjaya CHONG'],
      baselineId: 'BL0003',
      originalApprovedBaseline: 67000000,
      currentApprovedBaseline: 71000000,
      startDate: '2026-04-01',
      endDate: '2027-12-31',
      status: 'Tracking Active',
      financialRows: [
        {
          id: 'fr-1', benefitRef: 'B01', baselineId: '', typeOfFinancial: 'Cost Save',
          driver: 'Manual Effort Reduction', measure: 'S$ Value',
          values: { 2024: 12000000, 2025: 24000000, 2026: 35000000 },
          comments: 'Based on 42 FTE released across hubs'
        }
      ],
      baselineHistory: [
        { baselineId: 'BL0001', baselineValue: 67000000, startDate: '2025-01-01', endDate: '2027-12-31', changedBy: 'madhurimasengar', changedOn: '2024-12-18', changeReason: 'Original approved business case baseline' },
        { baselineId: 'BL0002', baselineValue: 69000000, startDate: '2025-07-01', endDate: '2027-12-31', changedBy: 'tanhuiling', changedOn: '2025-06-22', changeReason: 'Two additional onboarding hubs brought into scope' },
        { baselineId: 'BL0003', baselineValue: 71000000, startDate: '2026-04-01', endDate: '2027-12-31', changedBy: 'tanhuiling', changedOn: '2026-03-24', changeReason: 'FTE rate card refreshed following annual salary review' }
      ],
      reportingHistory: [
        { id: 'ru-1', updateDate: '2025-07-14', actualValue: 29000000, progressUpdate: '', variancePct: -13.4, varianceExplanation: 'Realisation behind plan in the first half.', rootCause: 'Straight-through processing release slipped by six weeks.', correctiveAction: 'Release re-planned into H2; hypercare shortened to two weeks.', updatedBy: 'tanhuiling', evidence: 'H1-FY25_benefit_evidence.xlsx' },
        { id: 'ru-2', updateDate: '2026-01-19', actualValue: 64000000, progressUpdate: '', variancePct: -7.2, varianceExplanation: 'Gap narrowed after the delayed release went live.', rootCause: 'Residual manual handling in two smaller markets.', correctiveAction: 'Market roll-out sequencing agreed with operations leads.', updatedBy: 'tanhuiling', evidence: 'H2-FY25_benefit_evidence.xlsx' },
        { id: 'ru-3', updateDate: '2026-07-11', actualValue: 73500000, progressUpdate: '', variancePct: 3.5, varianceExplanation: 'Ahead of the revised baseline.', rootCause: 'Adoption in Indonesia exceeded the planned ramp.', correctiveAction: 'None required — monitoring continues.', updatedBy: 'priyankanair', evidence: 'H1-FY26_benefit_evidence.xlsx' }
      ],
      auditLog: [
        { id: 'ba-1', date: '2024-12-18', user: 'madhurimasengar', action: 'Baseline Created', comments: 'BL0001 created with the approved business case.' },
        { id: 'ba-2', date: '2025-06-22', user: 'kelvinlimws', action: 'Baseline Change Approved', comments: 'BL0002 approved — scope extension to two hubs.' },
        { id: 'ba-3', date: '2025-07-14', user: 'tanhuiling', action: 'Benefit Updated', comments: 'Actuals reported — S$29,000,000.' },
        { id: 'ba-4', date: '2026-01-19', user: 'tanhuiling', action: 'Benefit Updated', comments: 'Actuals reported — S$64,000,000.' },
        { id: 'ba-5', date: '2026-03-24', user: 'kelvinlimws', action: 'Baseline Change Approved', comments: 'BL0003 approved — rate card refresh.' },
        { id: 'ba-6', date: '2026-07-11', user: 'priyankanair', action: 'Benefit Updated', comments: 'Actuals reported — S$73,500,000.' }
      ]
    },
    {
      id: 'bf-2',
      benefitRef: 'B02',
      name: 'Cross-border payment revenue uplift',
      type: 'Financial',
      categories: ['Revenue Growth'],
      description: 'Incremental revenue from the enterprise payments hub and expanded cross-border corridors.',
      validationSource: 'GL Account 41020 — Cross-border payment fee income',
      owners: ['Peter Weng Jian TAN', 'Michelle Widjaya CHONG'],
      baselineId: 'BL0005',
      originalApprovedBaseline: 31800000,
      currentApprovedBaseline: 31800000,
      startDate: '2026-10-01',
      endDate: '2028-06-30',
      status: 'Tracking Active',
      financialRows: [
        {
          id: 'fr-2', benefitRef: 'B02', baselineId: '', typeOfFinancial: 'Revenue Uplift',
          driver: 'Digital Adoption', measure: 'S$ Value',
          values: { 2024: 4500000, 2025: 9800000, 2026: 17500000 },
          comments: 'Incremental funded accounts'
        }
      ],
      baselineHistory: [
        { baselineId: 'BL0004', baselineValue: 31800000, startDate: '2025-01-01', endDate: '2028-06-30', changedBy: 'madhurimasengar', changedOn: '2024-12-18', changeReason: 'Original approved business case baseline' },
        { baselineId: 'BL0005', baselineValue: 27400000, startDate: '2026-10-01', endDate: '2028-06-30', changedBy: 'arjunmehta', changedOn: '2026-10-01', changeReason: 'Funded-account conversion running below the business case assumption' }
      ],
      reportingHistory: [
        { id: 'ru-4', updateDate: '2026-01-22', actualValue: 12900000, progressUpdate: '', variancePct: -59.4, varianceExplanation: 'Uplift materially behind baseline.', rootCause: 'Campaign spend deferred to the following financial year.', correctiveAction: 'Marketing plan re-phased; baseline change requested.', updatedBy: 'arjunmehta', evidence: 'H2-FY25_revenue_uplift.pdf' },
        { id: 'ru-5', updateDate: '2026-07-09', actualValue: 24100000, progressUpdate: '', variancePct: -24.2, varianceExplanation: 'Improving but still short of the approved baseline.', rootCause: 'Conversion rate on digital journeys below assumption.', correctiveAction: 'Baseline change BL0005 raised and pending approval.', updatedBy: 'arjunmehta', evidence: 'H1-FY26_revenue_uplift.pdf' }
      ],
      auditLog: [
        { id: 'ba-7', date: '2024-12-18', user: 'madhurimasengar', action: 'Baseline Created', comments: 'BL0004 created with the approved business case.' },
        { id: 'ba-8', date: '2026-01-22', user: 'arjunmehta', action: 'Benefit Updated', comments: 'Actuals reported — S$12,900,000.' },
        { id: 'ba-9', date: '2026-07-09', user: 'arjunmehta', action: 'Benefit Updated', comments: 'Actuals reported — S$24,100,000.' },
        { id: 'ba-10', date: '2026-08-02', user: 'arjunmehta', action: 'Baseline Change Requested', comments: 'BL0005 submitted for approval — conversion assumption revised.' }
      ]
    },
    {
      id: 'bf-3',
      benefitRef: 'B03',
      name: 'Faster client onboarding and stronger controls',
      type: 'Non-Financial',
      categories: ['Customer Experience', 'Risk & Control'],
      description: 'Faster onboarding, improved KYC/CDD controls and higher relationship manager productivity.',
      validationSource: 'Onboarding is tracked in CBG Business Headcount',
      owners: ['Peter Weng Jian TAN', 'Michelle Widjaya CHONG'],
      baselineId: 'BL0006',
      originalApprovedBaseline: null,
      currentApprovedBaseline: null,
      startDate: '2025-01-01',
      endDate: '2027-06-30',
      status: 'Tracking Active',
      financialRows: [],
      baselineHistory: [
        { baselineId: 'BL0006', baselineValue: null, startDate: '2025-01-01', endDate: '2027-06-30', changedBy: 'madhurimasengar', changedOn: '2024-12-18', changeReason: 'Original approved business case baseline — non-financial benefit' }
      ],
      reportingHistory: [
        { id: 'ru-6', updateDate: '2025-08-05', actualValue: null, progressUpdate: 'Customer onboarding journey redesigned and signed off by the design authority.', variancePct: null, varianceExplanation: '', rootCause: '', correctiveAction: '', updatedBy: 'priyankanair', evidence: 'journey_redesign_signoff.pdf' },
        { id: 'ru-7', updateDate: '2026-02-11', actualValue: null, progressUpdate: 'Pilot completed in Singapore — median onboarding time down from 9 days to 4 days.', variancePct: null, varianceExplanation: '', rootCause: '', correctiveAction: '', updatedBy: 'priyankanair', evidence: 'sg_pilot_results.pdf' },
        { id: 'ru-8', updateDate: '2026-07-22', actualValue: null, progressUpdate: 'Migration completed for 80% of customers across five markets.', variancePct: null, varianceExplanation: '', rootCause: '', correctiveAction: '', updatedBy: 'tanhuiling', evidence: 'migration_status_jul26.xlsx' }
      ],
      auditLog: [
        { id: 'ba-11', date: '2024-12-18', user: 'madhurimasengar', action: 'Baseline Created', comments: 'BL0006 created — non-financial benefit, progress tracked narratively.' },
        { id: 'ba-12', date: '2025-08-05', user: 'priyankanair', action: 'Benefit Updated', comments: 'Progress update recorded.' },
        { id: 'ba-13', date: '2026-02-11', user: 'priyankanair', action: 'Benefit Updated', comments: 'Progress update recorded.' },
        { id: 'ba-14', date: '2026-07-22', user: 'tanhuiling', action: 'Benefit Updated', comments: 'Progress update recorded.' }
      ]
    },
    {
      id: 'bf-4',
      benefitRef: 'B04',
      name: 'Tokenisation and digital asset capability',
      type: 'Non-Financial',
      categories: ['Cross-Border Capability'],
      description: 'Strategic digital asset capability — tokenisation readiness, improved client journey and enhanced risk management.',
      validationSource: 'Quarterly platform capability review, Digital Assets forum',
      owners: ['James Robert WHITFIELD', 'Priya Lakshmi NAIR'],
      baselineId: 'BL0007',
      originalApprovedBaseline: null,
      currentApprovedBaseline: null,
      startDate: '2025-04-01',
      endDate: '2026-12-31',
      status: 'Tracking Active',
      financialRows: [],
      baselineHistory: [
        { baselineId: 'BL0007', baselineValue: null, startDate: '2025-04-01', endDate: '2026-12-31', changedBy: 'yuriatantono', changedOn: '2025-03-19', changeReason: 'Original approved business case baseline — non-financial benefit' }
      ],
      reportingHistory: [
        { id: 'ru-9', updateDate: '2026-03-04', actualValue: null, progressUpdate: 'Cross-border integration completed in 2 of 4 countries.', variancePct: null, varianceExplanation: '', rootCause: '', correctiveAction: '', updatedBy: 'lowsuetmin', evidence: 'corridor_status_mar26.pdf' },
        { id: 'ru-10', updateDate: '2026-08-12', actualValue: null, progressUpdate: 'Cross-border integration completed in 4 countries — capability fully delivered.', variancePct: null, varianceExplanation: '', rootCause: '', correctiveAction: '', updatedBy: 'lowsuetmin', evidence: 'corridor_status_aug26.pdf' }
      ],
      auditLog: [
        { id: 'ba-15', date: '2025-03-19', user: 'yuriatantono', action: 'Baseline Created', comments: 'BL0007 created — non-financial benefit.' },
        { id: 'ba-16', date: '2026-03-04', user: 'lowsuetmin', action: 'Benefit Updated', comments: 'Progress update recorded.' },
        { id: 'ba-17', date: '2026-08-12', user: 'lowsuetmin', action: 'Benefit Updated', comments: 'Progress update recorded.' },
        { id: 'ba-18', date: '2026-08-20', user: 'lowsuetmin', action: 'Closure Submitted', comments: 'All four corridors live. Submitted for closure approval.' }
      ]
    },
    {
      id: 'bf-5',
      benefitRef: 'B05',
      name: 'Vendor exit and access simplification',
      type: 'Financial',
      categories: ['Cost Efficiency', 'Risk & Control'],
      description: 'Run-cost saving from exiting the incumbent authentication vendor and consolidating access management.',
      validationSource: 'PC Code PC-8802 · Identity & Access Management',
      owners: ['Sunil RAMESH'],
      baselineId: 'BL0009',
      originalApprovedBaseline: 9800000,
      currentApprovedBaseline: 8900000,
      startDate: '2025-07-01',
      endDate: '2026-06-30',
      status: 'Closed',
      financialRows: [
        {
          id: 'fr-3', benefitRef: 'B05', baselineId: '', typeOfFinancial: 'Cost Save',
          driver: 'Platform Decommissioning', measure: 'S$ Value',
          values: { 2024: 0, 2025: 4300000, 2026: 4600000 },
          comments: 'Hosting and licence exit'
        }
      ],
      baselineHistory: [
        { baselineId: 'BL0008', baselineValue: 9800000, startDate: '2025-01-01', endDate: '2026-06-30', changedBy: 'madhurimasengar', changedOn: '2024-12-18', changeReason: 'Original approved business case baseline' },
        { baselineId: 'BL0009', baselineValue: 8900000, startDate: '2025-07-01', endDate: '2026-06-30', changedBy: 'yuriatantono', changedOn: '2025-06-11', changeReason: 'One application retained for regulatory reporting' }
      ],
      reportingHistory: [
        { id: 'ru-11', updateDate: '2026-01-12', actualValue: 4300000, progressUpdate: '', variancePct: -51.7, varianceExplanation: 'Half-year realisation in line with the decommissioning schedule.', rootCause: 'Phased shutdown — remaining estate live until Q4.', correctiveAction: 'None required.', updatedBy: 'yuriatantono', evidence: 'H2-FY25_decom_saving.xlsx' },
        { id: 'ru-12', updateDate: '2026-06-30', actualValue: 9050000, progressUpdate: '', variancePct: 1.7, varianceExplanation: 'Final realised value marginally above baseline.', rootCause: 'Hosting exit completed two weeks early.', correctiveAction: 'None — benefit closed.', updatedBy: 'yuriatantono', evidence: 'H1-FY26_decom_saving.xlsx' }
      ],
      auditLog: [
        { id: 'ba-19', date: '2024-12-18', user: 'madhurimasengar', action: 'Baseline Created', comments: 'BL0008 created with the approved business case.' },
        { id: 'ba-20', date: '2025-06-11', user: 'yuriatantono', action: 'Baseline Change Approved', comments: 'BL0009 approved — one application retained.' },
        { id: 'ba-21', date: '2026-06-30', user: 'yuriatantono', action: 'Benefit Updated', comments: 'Final actuals reported — S$9,050,000.' },
        { id: 'ba-22', date: '2026-07-02', user: 'yuriatantono', action: 'Closure Submitted', comments: 'Final realised value S$9,050,000 submitted for approval.' },
        { id: 'ba-23', date: '2026-07-15', user: 'chanwaikit', action: 'Closure Approved', comments: 'Benefit closed. Realisation confirmed by Group Finance.' }
      ]
    },
    {
      id: 'bf-6',
      benefitRef: 'B06',
      name: 'Engineering automation and resilience uplift',
      type: 'Non-Financial',
      categories: ['Operational Resilience'],
      description: 'Faster delivery, reduced tech debt, improved recovery time and stronger operational excellence.',
      validationSource: 'Service desk ticket volumes, ITSM monthly report',
      owners: ['Anand KRISHNAMURTHY', 'Sarah Jane MCALLISTER'],
      baselineId: 'BL0010',
      originalApprovedBaseline: null,
      currentApprovedBaseline: null,
      startDate: '2025-01-01',
      endDate: '2026-03-31',
      status: 'Closed',
      financialRows: [],
      baselineHistory: [
        { baselineId: 'BL0010', baselineValue: null, startDate: '2025-01-01', endDate: '2026-03-31', changedBy: 'madhurimasengar', changedOn: '2024-12-18', changeReason: 'Original approved business case baseline — non-financial benefit' }
      ],
      reportingHistory: [
        { id: 'ru-13', updateDate: '2025-11-28', actualValue: null, progressUpdate: 'Failover testing completed for the onboarding gateway.', variancePct: null, varianceExplanation: '', rootCause: '', correctiveAction: '', updatedBy: 'chanwaikit', evidence: 'failover_test_report.pdf' },
        { id: 'ru-14', updateDate: '2026-03-30', actualValue: null, progressUpdate: 'All identified single points of failure remediated and independently assured.', variancePct: null, varianceExplanation: '', rootCause: '', correctiveAction: '', updatedBy: 'chanwaikit', evidence: 'resilience_assurance.pdf' }
      ],
      auditLog: [
        { id: 'ba-24', date: '2024-12-18', user: 'madhurimasengar', action: 'Baseline Created', comments: 'BL0010 created — non-financial benefit.' },
        { id: 'ba-25', date: '2026-03-30', user: 'chanwaikit', action: 'Benefit Updated', comments: 'Progress update recorded.' },
        { id: 'ba-26', date: '2026-04-02', user: 'chanwaikit', action: 'Closure Submitted', comments: 'Capability delivered and assured. Submitted for closure approval.' },
        { id: 'ba-27', date: '2026-04-18', user: 'kelvinlimws', action: 'Closure Approved', comments: 'Benefit closed.' }
      ]
    }
  ];
}
