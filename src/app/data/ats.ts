import { PEOPLE_NAMES } from './people';

/**
 * Approval to Spend.
 *
 * A Master ATS is the approved envelope for an initiative's spend. Sub-ATS
 * records sit under it — the original business case, then each revision — and
 * the master is the sum of them. Deliberately holds NO reference to a
 * workstream or a benefit: the two sides of the platform are being built
 * separately and joining them early would bake in a relationship neither has
 * been designed for yet.
 */
export type AtsStatus =
  | 'Approved'
  | 'Draft'
  | 'Pending Approval'
  | 'Sent for Rework'
  | 'Closed';

export type AtsWorkType = 'Initiative' | 'Run' | 'Change';

/** The money split every ATS carries, in whole currency units. */
export interface AtsAmounts {
  capex: number;
  opex: number;
  depreciation: number;
  ownCost: number;
}

export interface SubAts {
  id: string;
  name: string;
  /** 'Business Case (>= $3m)', 'ATS Revision on Business Case (>= S$3m)', … */
  type: string;
  status: AtsStatus;
  /** Which revision this is — the original, then 2nd, 3rd … */
  revision: number;
}

/** One month's figures, used by the Total Financials table. */
export interface AtsMonth {
  year: number;
  month: number;
  investment: number;
  pnl: number;
}

export interface Ats {
  id: string;
  name: string;
  description: string;
  workType: AtsWorkType;
  platform: string;
  subPlatform: string;
  lePcCode: string;
  subWorkstreamName: string;
  subWorkstreamCode: string;
  requestor: string;
  portfolioManagers: string[];
  doaApprovers: string[];
  status: AtsStatus;
  masterType: string;
  approvedDate: string;
  estStartDate: string;
  estGoLiveDate: string;
  createdBy: string;
  createdOn: string;
  lastEditedBy: string;
  lastEditedOn: string;
  totalInvestment: AtsAmounts;
  totalPnl: AtsAmounts;
  subAts: SubAts[];
  months: AtsMonth[];
  /** Unread drawdown alerts, shown as a dot on that tab. */
  alerts: number;
}

export const ATS_STATUSES: AtsStatus[] = [
  'Approved', 'Closed', 'Draft', 'Pending Approval', 'Sent for Rework'
];

export const ATS_WORK_TYPES: AtsWorkType[] = ['Initiative', 'Run', 'Change'];

export const ATS_SUB_TYPES = [
  'Business Case (>= S$3m)',
  'Business Case (< S$3m)',
  'ATS Revision on Business Case (>= S$3m)',
  'ATS Revision on Business Case (< S$3m)',
  'Not Applicable'
];

export const ATS_COST_TYPES = ['All Cost Types', 'CAPEX', 'OPEX', 'Depreciation', 'Own Cost'];

export const ATS_CURRENCIES = ['SGD', 'USD', 'HKD', 'INR'];

const total = (a: AtsAmounts) => a.capex + a.opex + a.depreciation + a.ownCost;
export const amountTotal = total;

/** Twelve months of 2026, flat-phased from an annual figure. */
function phase(investment: number, pnl: number): AtsMonth[] {
  return Array.from({ length: 12 }, (_, i) => ({
    year: 2026,
    month: i + 1,
    investment: Math.round(investment / 12),
    pnl: Math.round(pnl / 12)
  }));
}

/**
 * Seeded ATS records.
 *
 * Names, people and system references are invented: the reference screens this
 * was modelled from carried real staff names and in-house system acronyms, and
 * this prototype is served from a public URL.
 */
const SEED: Array<Partial<Ats> & Pick<Ats, 'id' | 'name' | 'status'>> = [
  {
    id: 'A25182',
    name: 'Commercial Cards Digitisation',
    description:
      'Straight-through origination for commercial cards: simplified customer flows for digital '
      + 'origination, instant decisioning, credit approval and limit issuance. Adds card servicing '
      + 'and add-on card linkage to the corporate channel, and cards as a payment option at the '
      + 'payment page.',
    workType: 'Initiative',
    platform: '05 - Institutional Banking',
    subPlatform: 'Not Applicable',
    lePcCode: '071_396U',
    subWorkstreamName: 'Commercial Cards Digitisation',
    subWorkstreamCode: 'P10REG-23008-I0001-P10-001',
    status: 'Approved',
    masterType: 'Business Case (>= S$3m)',
    approvedDate: '2025-01-01',
    estStartDate: '2023-01-02',
    estGoLiveDate: '2025-07-10',
    createdOn: '2023-01-09',
    lastEditedOn: '2025-07-10',
    totalInvestment: { capex: 3716671, opex: 633783, depreciation: 0, ownCost: 0 },
    totalPnl: { capex: 0, opex: 633783, depreciation: 3716671, ownCost: -23331 },
    alerts: 2,
    subAts: [
      { id: 'A25182T1000', name: 'Commercial Cards Digitisation (Original Business Case)', type: 'Business Case (>= S$3m)', status: 'Approved', revision: 0 },
      { id: 'A25182T2001', name: 'Commercial Cards Digitisation (B2025 FYF9)', type: 'ATS Revision on Business Case (>= S$3m)', status: 'Approved', revision: 1 },
      { id: 'A25182T3002', name: 'Commercial Cards Digitisation (B2025 Original)', type: 'ATS Revision on Business Case (>= S$3m)', status: 'Approved', revision: 2 }
    ]
  },
  {
    id: 'A26689',
    name: 'Cards and Unsecured Loans Modernisation',
    description:
      'Re-platforms card and unsecured lending onto the shared origination stack, retiring two '
      + 'legacy front ends and consolidating limit management into one service.',
    workType: 'Initiative',
    platform: '09 - Consumer Lending',
    subPlatform: 'Not Applicable',
    lePcCode: '071_470P',
    subWorkstreamName: 'Cards and Unsecured Loans Master ATS',
    subWorkstreamCode: 'P42REG-26008-I0001-P42-002',
    status: 'Approved',
    masterType: 'Business Case (< S$3m)',
    approvedDate: '2026-02-14',
    estStartDate: '2026-01-05',
    estGoLiveDate: '2027-03-31',
    createdOn: '2025-11-03',
    lastEditedOn: '2026-06-18',
    totalInvestment: { capex: 900000, opex: 0, depreciation: 0, ownCost: 0 },
    totalPnl: { capex: 0, opex: 0, depreciation: 900000, ownCost: 0 },
    alerts: 0,
    subAts: [
      { id: 'A26689T1000', name: 'Cards and Unsecured Loans (Original Business Case)', type: 'Business Case (< S$3m)', status: 'Approved', revision: 0 }
    ]
  },
  {
    id: 'A26914',
    name: 'Payments Hub Resiliency Uplift',
    description:
      'Removes single points of failure in the cross-border payments chain and brings recovery '
      + 'time within the agreed tolerance for all priority corridors.',
    workType: 'Change',
    platform: '07 - Payments & Cash Management',
    subPlatform: 'Cross-Border',
    lePcCode: '007_396U',
    subWorkstreamName: 'Payments Hub Resiliency',
    subWorkstreamCode: 'P07SG-26011-I0004-P07-003',
    status: 'Pending Approval',
    masterType: 'Business Case (>= S$3m)',
    approvedDate: '-',
    estStartDate: '2026-04-01',
    estGoLiveDate: '2027-09-30',
    createdOn: '2026-03-12',
    lastEditedOn: '2026-09-02',
    totalInvestment: { capex: 2140000, opex: 480000, depreciation: 0, ownCost: 0 },
    totalPnl: { capex: 0, opex: 480000, depreciation: 2140000, ownCost: 12400 },
    alerts: 1,
    subAts: [
      { id: 'A26914T1000', name: 'Payments Hub Resiliency (Original Business Case)', type: 'Business Case (>= S$3m)', status: 'Pending Approval', revision: 0 }
    ]
  },
  {
    id: 'A26330',
    name: 'Wealth Onboarding Straight-Through Processing',
    description:
      'Digitises wealth onboarding end to end, replacing branch-captured documents with verified '
      + 'digital identity and reducing time to first trade.',
    workType: 'Initiative',
    platform: '03 - Wealth Management',
    subPlatform: 'Digital Onboarding',
    lePcCode: '032_118C',
    subWorkstreamName: 'Wealth Onboarding STP',
    subWorkstreamCode: 'P03SG-26002-I0002-P03-001',
    status: 'Draft',
    masterType: 'Business Case (< S$3m)',
    approvedDate: '-',
    estStartDate: '2026-07-01',
    estGoLiveDate: '2027-06-30',
    createdOn: '2026-08-21',
    lastEditedOn: '2026-09-19',
    totalInvestment: { capex: 620000, opex: 145000, depreciation: 0, ownCost: 0 },
    totalPnl: { capex: 0, opex: 145000, depreciation: 620000, ownCost: 0 },
    alerts: 0,
    subAts: []
  },
  {
    id: 'A26551',
    name: 'Regulatory Reporting Automation',
    description:
      'Automates the manual assembly of regulatory returns, replacing spreadsheet consolidation '
      + 'with a governed pipeline and a reviewable audit trail.',
    workType: 'Change',
    platform: '18 - Enterprise Risk',
    subPlatform: 'READ',
    lePcCode: '184_207R',
    subWorkstreamName: 'Regulatory Reporting Automation',
    subWorkstreamCode: 'P18HK-26006-I0003-P18-001',
    status: 'Sent for Rework',
    masterType: 'Business Case (>= S$3m)',
    approvedDate: '-',
    estStartDate: '2026-02-01',
    estGoLiveDate: '2027-12-31',
    createdOn: '2025-12-04',
    lastEditedOn: '2026-09-15',
    totalInvestment: { capex: 3180000, opex: 720000, depreciation: 0, ownCost: 0 },
    totalPnl: { capex: 0, opex: 720000, depreciation: 3180000, ownCost: -8900 },
    alerts: 3,
    subAts: [
      { id: 'A26551T1000', name: 'Regulatory Reporting Automation (Original Business Case)', type: 'Business Case (>= S$3m)', status: 'Sent for Rework', revision: 0 }
    ]
  },
  {
    id: 'A24007',
    name: 'Branch Teller Platform Decommission',
    description:
      'Retires the legacy teller platform after migration, releasing its run cost and removing an '
      + 'unsupported dependency from the estate.',
    workType: 'Run',
    platform: '21 - Technology Services',
    subPlatform: 'Not Applicable',
    lePcCode: '210_884T',
    subWorkstreamName: 'Teller Platform Decommission',
    subWorkstreamCode: 'P21SG-24003-I0001-P21-004',
    status: 'Closed',
    masterType: 'Business Case (< S$3m)',
    approvedDate: '2024-03-18',
    estStartDate: '2024-04-01',
    estGoLiveDate: '2026-03-31',
    createdOn: '2024-01-22',
    lastEditedOn: '2026-04-30',
    totalInvestment: { capex: 410000, opex: 96000, depreciation: 0, ownCost: 0 },
    totalPnl: { capex: 0, opex: 96000, depreciation: 410000, ownCost: 0 },
    alerts: 0,
    subAts: [
      { id: 'A24007T1000', name: 'Teller Platform Decommission (Original Business Case)', type: 'Business Case (< S$3m)', status: 'Closed', revision: 0 }
    ]
  }
];

/** Deterministic pick, so figures and names never shift between reloads. */
const pick = (seed: number, n: number) => PEOPLE_NAMES[(seed * 7 + n * 3) % PEOPLE_NAMES.length];

export const ATS_RECORDS: Ats[] = SEED.map((s, i) => {
  const investment = s.totalInvestment ?? { capex: 0, opex: 0, depreciation: 0, ownCost: 0 };
  const pnl = s.totalPnl ?? { capex: 0, opex: 0, depreciation: 0, ownCost: 0 };
  return {
    subPlatform: 'Not Applicable',
    lePcCode: '-',
    subWorkstreamName: '-',
    subWorkstreamCode: '-',
    masterType: 'Not Applicable',
    approvedDate: '-',
    estStartDate: '-',
    estGoLiveDate: '-',
    createdOn: '-',
    lastEditedOn: '-',
    workType: 'Initiative',
    platform: '02 - Consumer Digital Channels',
    description: '',
    alerts: 0,
    subAts: [],
    ...s,
    requestor: pick(i, 1),
    portfolioManagers: [pick(i, 2)],
    doaApprovers: [pick(i, 3), pick(i, 4), pick(i, 5)],
    createdBy: pick(i, 6),
    lastEditedBy: 'SYSTEM',
    totalInvestment: investment,
    totalPnl: pnl,
    months: phase(total(investment), total(pnl))
  } as Ats;
});

export const atsById = (id: string) => ATS_RECORDS.find((a) => a.id === id) ?? null;

/** Counts behind the status pills, so they cannot disagree with the table. */
export function atsCounts() {
  const counts = new Map<string, number>();
  for (const a of ATS_RECORDS) counts.set(a.status, (counts.get(a.status) ?? 0) + 1);
  return counts;
}
