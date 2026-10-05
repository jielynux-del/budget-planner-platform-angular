import type { Ats } from './ats';
import type { BaselineLine, Benefit, BenefitRow, BenefitUpdate } from './models';
import { benefitTypeOf } from './benefitsData';

/**
 * What each ATS request expects to get back for its spend.
 *
 * Authored per request rather than shared: every ATS used to seed the same six
 * benefits, inherited from when these hung off workstreams. With six requests
 * one click apart in the listing, that read as obviously fake — and a benefit
 * about workflow digitisation sitting under a payments resiliency uplift reads
 * as wrong to anyone paying attention.
 *
 * Kept as a compact definition expanded by `build` below, rather than fourteen
 * forty-line literals: the interesting part of a benefit is what it measures,
 * not the shape of its history.
 */
interface BenefitSeed {
  name: string;
  categories: string[];
  description: string;
  validationSource: string;
  owners: string[];

  /** Financial half — the figure the uploaded template adds up to. */
  financial?: {
    label: string;
    value: number;
    driver: string;
    typeOfFinancial: 'Cost Save' | 'Revenue Uplift' | 'Cost Avoidance';
  };

  /** Non-financial half — what it measures and what counts as meeting it. */
  nonFinancial?: {
    label: string;
    measure: string;
    unit: string;
    startingPoint: string;
    target: string;
    method: string;
    frequency: string;
  };

  /** Progress reported so far. Empty for a request that has not started. */
  reported?: Array<{ date: string; actual?: number; progress?: string; note: string }>;

  closed?: boolean;
}

const SEEDS: Record<string, BenefitSeed[]> = {
  /* ── Commercial Cards Digitisation · Institutional Banking · live since 2023 ── */
  A25182: [
    {
      name: 'Card servicing cost reduction',
      categories: ['Cost Efficiency'],
      description: 'Straight-through card issuance and servicing removes manual handling across onboarding, limit changes and replacements.',
      validationSource: 'PC Code PC-4471 · Cards Operations cost centre',
      owners: ['Peter Weng Jian TAN', 'Michelle Widjaya CHONG'],
      financial: { label: 'Servicing effort released', value: 18400000, driver: 'Manual Effort Reduction', typeOfFinancial: 'Cost Save' },
      reported: [
        { date: '2024-07-12', actual: 4100000, note: 'First markets live; servicing volumes still routing through the old queue.' },
        { date: '2025-01-17', actual: 11200000, note: 'Replacement and limit-change journeys fully digital.' },
        { date: '2025-07-18', actual: 19100000, note: 'Ahead of baseline following corporate channel adoption.' }
      ]
    },
    {
      name: 'Digital card issuance rate',
      categories: ['Customer Experience'],
      description: 'Share of commercial cards issued end to end without a manual step.',
      validationSource: 'Cards issuance platform extract',
      owners: ['Peter Weng Jian TAN'],
      nonFinancial: {
        label: 'Digital issuance rate',
        measure: 'Commercial cards issued with no manual intervention.',
        unit: '% of cards issued',
        startingPoint: '38% at January 2023, across all commercial card products.',
        target: 'Sustains 90% or above for two consecutive quarters.',
        method: 'Issuance platform extract, counted against total cards issued.',
        frequency: 'Monthly'
      },
      reported: [
        { date: '2024-07-12', progress: '61% — corporate cards digital, small business still manual.', note: '' },
        { date: '2025-07-18', progress: '93% held across Q1 and Q2. Target met.', note: '' }
      ]
    }
  ],

  /* ── Cards and Unsecured Loans Modernisation · Consumer Lending · 2026–27 ── */
  A26689: [
    {
      name: 'Origination cost per application',
      categories: ['Cost Efficiency'],
      description: 'Automated decisioning and document capture reduce the cost of processing an unsecured lending application.',
      validationSource: 'PC Code PC-2208 · Consumer Lending operations',
      owners: ['Kelvin Wei Sheng LIM'],
      financial: { label: 'Origination effort released', value: 9600000, driver: 'Process Automation', typeOfFinancial: 'Cost Save' }
    },
    {
      name: 'Incremental card balances revenue',
      categories: ['Revenue Growth'],
      description: 'Faster approval and pre-qualified offers lift drawn balances on new card accounts.',
      validationSource: 'GL Account 41180 · Cards interest and fee income',
      owners: ['Michelle Widjaya CHONG', 'Nurul Aisyah BINTE RAHMAN'],
      financial: { label: 'Incremental balances revenue', value: 14200000, driver: 'Digital Adoption', typeOfFinancial: 'Revenue Uplift' }
    },
    {
      name: 'Application decisioning time',
      categories: ['Customer Experience'],
      description: 'Elapsed time from a completed application to a credit decision.',
      validationSource: 'Lending origination platform records',
      owners: ['Kelvin Wei Sheng LIM'],
      nonFinancial: {
        label: 'Time to a credit decision',
        measure: 'Elapsed minutes from submitted application to decision returned.',
        unit: 'Minutes (median)',
        startingPoint: '94 minutes median across the 2025 book.',
        target: 'Median of 5 minutes or fewer for pre-qualified applicants.',
        method: 'Origination platform timestamps, median of all decisions in the period.',
        frequency: 'Monthly'
      }
    }
  ],

  /* ── Payments Hub Resiliency Uplift · Payments & Cash Management · pending ── */
  A26914: [
    {
      name: 'Payment platform availability',
      categories: ['Operational Resilience'],
      description: 'Availability of the payments hub during published service hours.',
      validationSource: 'Platform availability monitoring',
      owners: ['Anand KRISHNAMURTHY'],
      nonFinancial: {
        label: 'Service availability',
        measure: 'Payments hub availability during published service hours.',
        unit: '% availability',
        startingPoint: '99.62% across the 2025 service year.',
        target: 'At or above 99.95% over a rolling twelve months.',
        method: 'Availability monitoring, excluding planned maintenance windows.',
        frequency: 'Monthly'
      }
    },
    {
      name: 'Mean time to restore payment service',
      categories: ['Operational Resilience'],
      description: 'How quickly a severity-1 payments incident is brought back to service.',
      validationSource: 'Incident management records',
      owners: ['Anand KRISHNAMURTHY', 'Sarah Jane MCALLISTER'],
      nonFinancial: {
        label: 'Mean time to restore',
        measure: 'Elapsed time from a severity-1 payments incident being raised to service restored.',
        unit: 'Minutes',
        startingPoint: '118 minutes mean across 2025 severity-1 incidents.',
        target: 'Mean of 30 minutes or fewer across a rolling quarter.',
        method: 'Incident management records, severity-1 only.',
        frequency: 'Monthly'
      }
    },
    {
      name: 'Incident remediation cost avoided',
      categories: ['Cost Avoidance'],
      description: 'Remediation, reprocessing and client compensation avoided by removing single points of failure.',
      validationSource: 'PC Code PC-0714 · Payments incident remediation',
      owners: ['Sarah Jane MCALLISTER'],
      financial: { label: 'Remediation cost avoided', value: 6300000, driver: 'Resilience Improvement', typeOfFinancial: 'Cost Avoidance' }
    }
  ],

  /* ── Wealth Onboarding Straight-Through Processing · Wealth · draft ── */
  A26330: [
    {
      name: 'Time to onboard a wealth client',
      categories: ['Customer Experience'],
      description: 'Working days from signed mandate to a funded, trading-ready account.',
      validationSource: 'Wealth onboarding case records',
      owners: ['Grace Hui Min LOW'],
      nonFinancial: {
        label: 'Onboarding elapsed time',
        measure: 'Working days from signed mandate to first funded trade.',
        unit: 'Working days (median)',
        startingPoint: '21 days median across the 2025 cohort.',
        target: 'Median of 6 days or fewer, held for two consecutive quarters.',
        method: 'Onboarding case records, median of all completions in the period.',
        frequency: 'Quarterly'
      }
    },
    {
      name: 'Onboarding operations cost saving',
      categories: ['Cost Efficiency'],
      description: 'Document capture and automated suitability checks remove manual review from the onboarding path.',
      validationSource: 'PC Code PC-3390 · Wealth operations',
      owners: ['Grace Hui Min LOW', 'Rachel Mei Ling KOH'],
      financial: { label: 'Onboarding effort released', value: 7800000, driver: 'Process Automation', typeOfFinancial: 'Cost Save' }
    }
  ],

  /* ── Regulatory Reporting Automation · Enterprise Risk · sent for rework ── */
  A26551: [
    {
      name: 'Manual reporting effort released',
      categories: ['Cost Efficiency'],
      description: 'Automated extraction and validation remove manual preparation from recurring regulatory submissions.',
      validationSource: 'PC Code PC-5512 · Regulatory Reporting',
      owners: ['Farah Nadia BINTE OMAR'],
      financial: { label: 'Reporting effort released', value: 11500000, driver: 'Manual Effort Reduction', typeOfFinancial: 'Cost Save' },
      reported: [
        { date: '2026-08-14', actual: 2100000, note: 'Two submissions automated; the rest still manual pending rework of the request.' }
      ]
    },
    {
      name: 'Regulatory submission accuracy',
      categories: ['Operational Resilience'],
      description: 'Submissions accepted by the regulator without resubmission or query.',
      validationSource: 'Regulatory submission log',
      owners: ['Farah Nadia BINTE OMAR', 'Vikram Singh CHAUDHARY'],
      nonFinancial: {
        label: 'First-time acceptance rate',
        measure: 'Submissions accepted without resubmission or regulator query.',
        unit: '% of submissions',
        startingPoint: '87% across the 2025 reporting cycles.',
        target: '99% or above across a full reporting year, with no late submissions.',
        method: 'Regulatory submission log, counted against total submissions due.',
        frequency: 'Quarterly'
      },
      reported: [
        { date: '2026-08-14', progress: '91% — improvement on the two automated returns.', note: '' }
      ]
    }
  ],

  /* ── Branch Teller Platform Decommission · Technology Services · closed ── */
  A24007: [
    {
      name: 'Teller platform licence and support removed',
      categories: ['Cost Efficiency'],
      description: 'Decommissioning the branch teller platform removes its licence, support and hosting costs.',
      validationSource: 'PC Code PC-8801 · Branch Technology',
      owners: ['Daniel Zhi Hao NG'],
      financial: { label: 'Licence and support removed', value: 8900000, driver: 'Vendor Exit', typeOfFinancial: 'Cost Save' },
      reported: [
        { date: '2025-04-22', actual: 3200000, note: 'Support contract terminated; licence runs to the end of term.' },
        { date: '2026-03-20', actual: 9050000, note: 'Final decommission complete. Realised slightly ahead of baseline.' }
      ],
      closed: true
    },
    {
      name: 'Branch transactions migrated off the platform',
      categories: ['Operational Resilience'],
      description: 'Share of branch counter transactions moved to the replacement platform.',
      validationSource: 'Branch transaction volumes extract',
      owners: ['Daniel Zhi Hao NG', 'Sarah Jane MCALLISTER'],
      nonFinancial: {
        label: 'Migrated transaction share',
        measure: 'Branch counter transactions served by the replacement platform.',
        unit: '% of counter transactions',
        startingPoint: '0% at April 2024 — all volume on the teller platform.',
        target: '100% of counter transactions, with the teller platform switched off.',
        method: 'Branch transaction volumes by serving platform.',
        frequency: 'Monthly'
      },
      reported: [
        { date: '2025-04-22', progress: '54% migrated across 180 branches.', note: '' },
        { date: '2026-03-20', progress: '100% — teller platform decommissioned on 20 March 2026.', note: '' }
      ],
      closed: true
    }
  ]
};

/** Phases a figure across the request's years, back-loaded as delivery ramps. */
function phase(total: number, years: number[]): Record<number, number> {
  const weights = years.map((_, i) => i + 1);
  const sum = weights.reduce((t, w) => t + w, 0);
  const values: Record<number, number> = {};
  let running = 0;
  years.forEach((y, i) => {
    const share = i === years.length - 1 ? total - running : Math.round((total * weights[i]) / sum);
    values[y] = share;
    running += share;
  });
  return values;
}

/** Expands one seed into the full record the app works with. */
function build(seed: BenefitSeed, index: number, ats: Ats): Benefit {
  const ref = `B${String(index + 1).padStart(2, '0')}`;
  const baselineId = `BL${String(index + 1).padStart(4, '0')}`;
  const from = Number(ats.estStartDate.slice(0, 4));
  const to = Number(ats.estGoLiveDate.slice(0, 4));
  const years = Array.from({ length: Math.max(1, to - from + 1) }, (_, i) => from + i);

  const lines: BaselineLine[] = [];
  const blank = { measure: '', unit: '', startingPoint: '', target: '', method: '', frequency: '' };

  if (seed.financial) {
    lines.push({
      id: `${ats.id}-${ref}-f`, kind: 'Financial', name: seed.financial.label,
      baselineId: `${baselineId}-01`,
      originalValue: seed.financial.value, currentValue: seed.financial.value, ...blank
    });
  }
  if (seed.nonFinancial) {
    lines.push({
      id: `${ats.id}-${ref}-n`, kind: 'Non-Financial', name: seed.nonFinancial.label,
      baselineId: `${baselineId}-${seed.financial ? '02' : '01'}`,
      originalValue: null, currentValue: null,
      measure: seed.nonFinancial.measure,
      unit: seed.nonFinancial.unit,
      startingPoint: seed.nonFinancial.startingPoint,
      target: seed.nonFinancial.target,
      method: seed.nonFinancial.method,
      frequency: seed.nonFinancial.frequency
    });
  }

  const financialRows: BenefitRow[] = seed.financial
    ? [{
        id: `${ats.id}-${ref}-row`,
        benefitRef: ref,
        baselineId: `${baselineId}-01`,
        typeOfFinancial: seed.financial.typeOfFinancial,
        driver: seed.financial.driver,
        measure: 'S$ Value',
        values: phase(seed.financial.value, years),
        comments: 'Read from the uploaded financial impact template.'
      }]
    : [];

  const reportingHistory: BenefitUpdate[] = (seed.reported ?? []).map((r, i) => ({
    id: `${ats.id}-${ref}-ru${i + 1}`,
    updateDate: r.date,
    actualValue: r.actual ?? null,
    progressUpdate: r.progress ?? '',
    variancePct: r.actual && seed.financial
      ? Math.round(((r.actual - seed.financial.value) / seed.financial.value) * 1000) / 10
      : null,
    varianceExplanation: r.note,
    rootCause: '',
    correctiveAction: '',
    updatedBy: seed.owners[0],
    evidence: `${ats.id}_${ref}_${r.date.slice(0, 4)}_evidence.xlsx`
  }));

  return {
    id: `${ats.id}-${ref}`,
    benefitRef: ref,
    name: seed.name,
    type: benefitTypeOf(lines),
    categories: seed.categories,
    description: seed.description,
    owners: seed.owners,
    validationSource: seed.validationSource,
    baselineId,
    originalApprovedBaseline: seed.financial?.value ?? null,
    currentApprovedBaseline: seed.financial?.value ?? null,
    startDate: ats.estStartDate,
    endDate: ats.estGoLiveDate,
    baselineLines: lines,
    status: seed.closed ? 'Closed' : 'Tracking Active',
    financialRows,
    financialFile: seed.financial
      ? {
          name: `${ats.id}-${ref}-financial-impact.xlsx`,
          size: '3.2 MB',
          uploadedBy: seed.owners[0],
          uploadedOn: ats.estStartDate
        }
      : undefined,
    baselineHistory: [{
      baselineId,
      baselineValue: seed.financial?.value ?? null,
      startDate: ats.estStartDate,
      endDate: ats.estGoLiveDate,
      changedBy: seed.owners[0],
      changedOn: ats.estStartDate,
      changeReason: 'Original baseline captured with the ATS request'
    }],
    reportingHistory,
    auditLog: [
      {
        id: `${ats.id}-${ref}-a1`,
        date: ats.estStartDate,
        user: seed.owners[0],
        action: 'Benefit Created',
        comments: `${ref} added to ${ats.id}.`
      },
      ...reportingHistory.map((r, i) => ({
        id: `${ats.id}-${ref}-a${i + 2}`,
        date: r.updateDate,
        user: r.updatedBy,
        action: 'Benefit Updated',
        comments: r.actualValue !== null
          ? `Actuals reported — S$${r.actualValue.toLocaleString('en-SG')}.`
          : `Progress reported — ${r.progressUpdate}`
      })),
      ...(seed.closed
        ? [{
            id: `${ats.id}-${ref}-az`,
            date: ats.estGoLiveDate,
            user: seed.owners[0],
            action: 'Benefit Closed',
            comments: 'Closed on completion of the request.'
          }]
        : [])
    ]
  };
}

/** The benefits an ATS request opens with. */
export function seedBenefitsFor(ats: Ats): Benefit[] {
  return (SEEDS[ats.id] ?? []).map((seed, i) => build(seed, i, ats));
}
