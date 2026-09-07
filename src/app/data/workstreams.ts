import type { Workstream, WorkStatus } from './models';

interface Seed {
  name: string;
  code: string;
  portfolioName: string;
  portfolioCode: string;
  platform: string;
  subPlatform: string;
  reportingLocation: string;
  startDate: string;
  goLiveDate: string;
  workStatus: WorkStatus;
  techUnit: string;
  description?: string;
  deliveryStage?: string;
}

const seeds: Seed[] = [
  {
    name: '[To Delete] Retail-Client Onboarding-Stretch-ID',
    code: 'P02ID-26019-I0041',
    portfolioName: 'Retail-Client Onboarding',
    portfolioCode: 'P02-26019-I',
    platform: '02 - Consumer Digital Channels',
    subPlatform: 'Not Applicable',
    reportingLocation: 'Indonesia',
    startDate: '2026-01-01',
    goLiveDate: '2026-01-30',
    workStatus: 'Cancelled',
    techUnit: 'Consumer Banking Technology',
    deliveryStage: 'Discontinued'
  },
  {
    name: 'ENH HK-4554-Enhancement_READ_HK',
    code: 'P18HK-20006-E0019',
    portfolioName: 'Enterprise Risk-RMG ENH Hong Kong',
    portfolioCode: 'P18-20006-E',
    platform: '18 - Enterprise Risk',
    subPlatform: 'READ',
    reportingLocation: 'Hong Kong',
    startDate: '2024-01-01',
    goLiveDate: '2027-12-31',
    workStatus: 'In Progress',
    techUnit: 'Risk & Compliance Technology'
  },
  {
    name: 'I&I_REG_BUILD CWF Staff',
    code: 'P03SG-21030-I0017',
    portfolioName: 'Dedicated BUILD Perm Staff (I&I)',
    portfolioCode: 'P03-21030-I',
    platform: '03 - Wealth Management',
    subPlatform: 'I&I - SG Perm Build',
    reportingLocation: 'Singapore Reg',
    startDate: '2026-01-01',
    goLiveDate: '2026-12-31',
    workStatus: 'In Progress',
    techUnit: 'Wealth Technology'
  },
  {
    name: 'Retail SG Client Onboarding Regulatory',
    code: 'P02SG-26019-R0002',
    portfolioName: 'Retail-Client Onboarding',
    portfolioCode: 'P02-26019-R',
    platform: '02 - Consumer Digital Channels',
    subPlatform: 'Digital Onboarding',
    reportingLocation: 'Singapore',
    startDate: '2025-04-01',
    goLiveDate: '2026-09-30',
    workStatus: 'In Progress',
    techUnit: 'Consumer Banking Technology',
    deliveryStage: 'Scaling'
  },
  {
    name: 'Retail HK Client Onboarding Regulatory',
    code: 'P02HK-26019-R0003',
    portfolioName: 'Retail-Client Onboarding',
    portfolioCode: 'P02-26019-R',
    platform: '02 - Consumer Digital Channels',
    subPlatform: 'Digital Onboarding',
    reportingLocation: 'Hong Kong',
    startDate: '2025-07-01',
    goLiveDate: '2026-11-30',
    workStatus: 'On-Hold',
    techUnit: 'Consumer Banking Technology'
  },
  {
    name: 'Retail IN Client Onboarding Regulatory',
    code: 'P02IN-26019-R0004',
    portfolioName: 'Retail-Client Onboarding',
    portfolioCode: 'P02-26019-R',
    platform: '02 - Consumer Digital Channels',
    subPlatform: 'Digital Onboarding',
    reportingLocation: 'India',
    startDate: '2025-02-01',
    goLiveDate: '2026-06-30',
    workStatus: 'In Progress',
    techUnit: 'Consumer Banking Technology'
  },
  {
    name: 'ID_CO_Digi_Onboarding',
    code: 'P02ID-26019-I0052',
    portfolioName: 'Retail-Client Onboarding',
    portfolioCode: 'P02-26019-I',
    platform: '02 - Consumer Digital Channels',
    subPlatform: 'Digital Onboarding',
    reportingLocation: 'Indonesia',
    startDate: '2026-02-01',
    goLiveDate: '2026-12-15',
    workStatus: 'Business Case Preparation',
    techUnit: 'Consumer Banking Technology'
  },
  {
    name: 'ID_CO_ESL Partner_Non-digi',
    code: 'P02ID-26019-I0053',
    portfolioName: 'Retail-Client Onboarding',
    portfolioCode: 'P02-26019-I',
    platform: '02 - Consumer Digital Channels',
    subPlatform: 'Partner Channels',
    reportingLocation: 'Indonesia',
    startDate: '2026-03-01',
    goLiveDate: '2027-03-31',
    workStatus: 'Not Started',
    techUnit: 'Consumer Banking Technology'
  },
  {
    name: '[To Delete] SG_Inflight_CO',
    code: 'P02SG-26019-I0061',
    portfolioName: 'Retail-Client Onboarding',
    portfolioCode: 'P02-26019-I',
    platform: '02 - Consumer Digital Channels',
    subPlatform: 'Not Applicable',
    reportingLocation: 'Singapore',
    startDate: '2025-11-01',
    goLiveDate: '2026-04-30',
    workStatus: 'Cancelled',
    techUnit: 'Consumer Banking Technology',
    deliveryStage: 'Discontinued'
  },
  {
    name: 'TW_CS Servicing Uplift',
    code: 'P02TW-26021-I0008',
    portfolioName: 'Retail-Client Servicing',
    portfolioCode: 'P02-26021-I',
    platform: '02 - Consumer Digital Channels',
    subPlatform: 'Client Servicing',
    reportingLocation: 'Taiwan',
    startDate: '2025-09-01',
    goLiveDate: '2026-10-31',
    workStatus: 'In Progress',
    techUnit: 'Consumer Banking Technology'
  },
  {
    name: 'Reg_Defect Fixes_IN',
    code: 'P18IN-20006-E0044',
    portfolioName: 'Enterprise Risk-RMG ENH India',
    portfolioCode: 'P18-20006-E',
    platform: '18 - Enterprise Risk',
    subPlatform: 'READ',
    reportingLocation: 'India',
    startDate: '2025-01-01',
    goLiveDate: '2026-12-31',
    workStatus: 'In Progress',
    techUnit: 'Risk & Compliance Technology'
  },
  {
    name: 'Reg_NCI Integration_IN',
    code: 'P18IN-20006-E0045',
    portfolioName: 'Enterprise Risk-RMG ENH India',
    portfolioCode: 'P18-20006-E',
    platform: '18 - Enterprise Risk',
    subPlatform: 'NCI',
    reportingLocation: 'India',
    startDate: '2025-05-01',
    goLiveDate: '2027-06-30',
    workStatus: 'In Progress',
    techUnit: 'Risk & Compliance Technology'
  },
  {
    name: 'CASA Digital Account Opening-SG',
    code: 'P09SG-24011-I0102',
    portfolioName: 'Consumer Lending & Deposits',
    portfolioCode: 'P09-24011-I',
    platform: '09 - Consumer Lending',
    subPlatform: 'Deposits',
    reportingLocation: 'Singapore',
    startDate: '2025-06-01',
    goLiveDate: '2026-08-31',
    workStatus: 'In Progress',
    techUnit: 'Consumer Banking Technology'
  },
  {
    name: 'Instant Payments Rails Modernisation',
    code: 'P07SG-25004-I0031',
    portfolioName: 'Payments Modernisation',
    portfolioCode: 'P07-25004-I',
    platform: '07 - Payments & Cash Management',
    subPlatform: 'Real-Time Payments',
    reportingLocation: 'Singapore',
    startDate: '2024-10-01',
    goLiveDate: '2027-03-31',
    workStatus: 'In Progress',
    techUnit: 'Institutional Banking Technology'
  },
  {
    name: 'Cash Management Portal Refresh-HK',
    code: 'P07HK-25004-I0033',
    portfolioName: 'Payments Modernisation',
    portfolioCode: 'P07-25004-I',
    platform: '07 - Payments & Cash Management',
    subPlatform: 'Channels',
    reportingLocation: 'Hong Kong',
    startDate: '2026-01-15',
    goLiveDate: '2027-01-31',
    workStatus: 'Business Case Preparation',
    techUnit: 'Institutional Banking Technology'
  },
  {
    name: 'Corporate Credit Workflow Automation',
    code: 'P05SG-23008-I0076',
    portfolioName: 'Institutional Credit Platform',
    portfolioCode: 'P05-23008-I',
    platform: '05 - Institutional Banking',
    subPlatform: 'Credit Origination',
    reportingLocation: 'Singapore',
    startDate: '2024-03-01',
    goLiveDate: '2026-05-31',
    workStatus: 'Completed / Pending Closure',
    techUnit: 'Institutional Banking Technology'
  },
  {
    name: 'Trade Finance Doc Digitisation-IN',
    code: 'P05IN-23009-I0011',
    portfolioName: 'Trade & Working Capital',
    portfolioCode: 'P05-23009-I',
    platform: '05 - Institutional Banking',
    subPlatform: 'Trade Finance',
    reportingLocation: 'India',
    startDate: '2025-08-01',
    goLiveDate: '2026-12-31',
    workStatus: 'In Progress',
    techUnit: 'Institutional Banking Technology'
  },
  {
    name: 'Wealth Advisory Desktop-Phase 2',
    code: 'P03SG-21030-I0021',
    portfolioName: 'Wealth Advisory Platform',
    portfolioCode: 'P03-21030-I',
    platform: '03 - Wealth Management',
    subPlatform: 'Advisory Tools',
    reportingLocation: 'Singapore',
    startDate: '2025-01-01',
    goLiveDate: '2026-09-30',
    workStatus: 'In Progress',
    techUnit: 'Wealth Technology'
  },
  {
    name: 'Wealth Onboarding Straight-Through-HK',
    code: 'P03HK-21031-I0009',
    portfolioName: 'Wealth Client Lifecycle',
    portfolioCode: 'P03-21031-I',
    platform: '03 - Wealth Management',
    subPlatform: 'Client Lifecycle',
    reportingLocation: 'Hong Kong',
    startDate: '2025-10-01',
    goLiveDate: '2027-02-28',
    workStatus: 'Not Started',
    techUnit: 'Wealth Technology'
  },
  {
    name: 'Treasury Pricing Engine Uplift',
    code: 'P11SG-22015-I0044',
    portfolioName: 'Markets Trading Platform',
    portfolioCode: 'P11-22015-I',
    platform: '11 - Treasury & Markets',
    subPlatform: 'Pricing & Risk',
    reportingLocation: 'Singapore',
    startDate: '2024-07-01',
    goLiveDate: '2026-06-30',
    workStatus: 'In Progress',
    techUnit: 'T&M Technology'
  },
  {
    name: 'FX eTrading Latency Reduction',
    code: 'P11SG-22015-I0047',
    portfolioName: 'Markets Trading Platform',
    portfolioCode: 'P11-22015-I',
    platform: '11 - Treasury & Markets',
    subPlatform: 'eTrading',
    reportingLocation: 'Singapore',
    startDate: '2025-03-01',
    goLiveDate: '2026-03-31',
    workStatus: 'Completed / Pending Closure',
    techUnit: 'T&M Technology'
  },
  {
    name: 'Finance Ledger Consolidation-Group',
    code: 'P14SG-20022-I0005',
    portfolioName: 'Finance Data & Reporting',
    portfolioCode: 'P14-20022-I',
    platform: '14 - Finance',
    subPlatform: 'General Ledger',
    reportingLocation: 'Singapore',
    startDate: '2024-01-01',
    goLiveDate: '2026-12-31',
    workStatus: 'In Progress',
    techUnit: 'Finance Technology'
  },
  {
    name: 'Regulatory Reporting Automation-MY',
    code: 'P14MY-20022-R0018',
    portfolioName: 'Finance Data & Reporting',
    portfolioCode: 'P14-20022-R',
    platform: '14 - Finance',
    subPlatform: 'Regulatory Reporting',
    reportingLocation: 'Malaysia',
    startDate: '2026-02-01',
    goLiveDate: '2027-04-30',
    workStatus: 'Business Case Preparation',
    techUnit: 'Finance Technology'
  },
  {
    name: 'Core Infra Zero Trust Rollout',
    code: 'P21SG-25030-I0001',
    portfolioName: 'Technology Services-Infrastructure',
    portfolioCode: 'P21-25030-I',
    platform: '21 - Technology Services',
    subPlatform: 'Security Engineering',
    reportingLocation: 'Singapore',
    startDate: '2025-01-01',
    goLiveDate: '2027-12-31',
    workStatus: 'In Progress',
    techUnit: 'Group Infrastructure'
  },
  {
    name: 'Data Centre Exit Programme-VN',
    code: 'P21VN-25030-I0014',
    portfolioName: 'Technology Services-Infrastructure',
    portfolioCode: 'P21-25030-I',
    platform: '21 - Technology Services',
    subPlatform: 'Hosting',
    reportingLocation: 'Vietnam',
    startDate: '2025-05-01',
    goLiveDate: '2026-11-30',
    workStatus: 'On-Hold',
    techUnit: 'Group Infrastructure'
  },
  {
    name: 'AML Screening Model Refresh-CN',
    code: 'P18CN-20007-R0026',
    portfolioName: 'Financial Crime Compliance',
    portfolioCode: 'P18-20007-R',
    platform: '18 - Enterprise Risk',
    subPlatform: 'Screening',
    reportingLocation: 'China',
    startDate: '2025-09-01',
    goLiveDate: '2026-10-31',
    workStatus: 'In Progress',
    techUnit: 'Risk & Compliance Technology'
  },
  {
    name: 'Basel IV Capital Engine-Group',
    code: 'P18SG-20009-R0002',
    portfolioName: 'Capital & Liquidity Risk',
    portfolioCode: 'P18-20009-R',
    platform: '18 - Enterprise Risk',
    subPlatform: 'Capital',
    reportingLocation: 'Singapore',
    startDate: '2024-04-01',
    goLiveDate: '2026-12-31',
    workStatus: 'In Progress',
    techUnit: 'Risk & Compliance Technology'
  },
  {
    name: 'Mortgage Origination Revamp-AU',
    code: 'P09AU-24012-I0007',
    portfolioName: 'Consumer Lending & Deposits',
    portfolioCode: 'P09-24012-I',
    platform: '09 - Consumer Lending',
    subPlatform: 'Secured Lending',
    reportingLocation: 'Australia',
    startDate: '2026-01-01',
    goLiveDate: '2027-06-30',
    workStatus: 'Not Started',
    techUnit: 'Consumer Banking Technology'
  },
  {
    name: 'Cards Loyalty Platform Migration-UK',
    code: 'P09UK-24013-I0003',
    portfolioName: 'Cards & Unsecured',
    portfolioCode: 'P09-24013-I',
    platform: '09 - Consumer Lending',
    subPlatform: 'Cards',
    reportingLocation: 'United Kingdom',
    startDate: '2025-02-01',
    goLiveDate: '2026-07-31',
    workStatus: 'Operate',
    techUnit: 'Consumer Banking Technology'
  },
  {
    name: 'Branch Teller Workbench Sunset-SG',
    code: 'P02SG-26030-I0077',
    portfolioName: 'Retail-Branch Channels',
    portfolioCode: 'P02-26030-I',
    platform: '02 - Consumer Digital Channels',
    subPlatform: 'Branch',
    reportingLocation: 'Singapore Reg',
    startDate: '2024-06-01',
    goLiveDate: '2026-02-28',
    workStatus: 'Operate',
    techUnit: 'Consumer Banking Technology'
  }
];

const FIRST = ['madhurimasengar', 'yuriatantono', 'kelvinlimws', 'priyankanair', 'chanwaikit', 'tanhuiling', 'arjunmehta', 'lowsuetmin'];
const RISK = ['Low', 'Medium', 'High', 'NA'];
const CATEGORY = ['Regulatory', 'Growth', 'Efficiency', 'Mandatory', 'NA'];
const JOURNEY = ['Initiate', 'Design', 'Build', 'Deploy', 'Discontinued', 'Scaling'];
const CELLS = ['Retail Onboarding Team', 'Payments Core Team', 'Risk Analytics Team', 'Wealth Advisory Team', '-'];

/** Deterministic pseudo random so the mock data never shifts between reloads. */
function rnd(seedValue: number) {
  const x = Math.sin(seedValue) * 10000;
  return x - Math.floor(x);
}
const pick = <T,>(arr: readonly T[], n: number): T => arr[Math.floor(rnd(n) * arr.length) % arr.length];

function buildDetail(s: Seed, i: number): Workstream {
  const ref = s.code.replace(/^P/, '').replace(/-/g, '');
  const yearsRange = [2024, 2025, 2026, 2027];
  const financials = (['Capex', 'Opex'] as const).flatMap((category) =>
    ['Internal Manpower', 'Vendor Services', 'Software Licences', 'Hardware'].map((lineItem, li) => ({
      category,
      lineItem,
      values: Object.fromEntries(
        yearsRange.map((y, yi) => [y, Math.round(rnd(i * 31 + li * 7 + yi) * 1800) * (category === 'Capex' ? 1000 : 500)] as [number, number])
      ) as Record<number, number>
    }))
  );

  return {
    id: s.code,
    name: s.name,
    code: s.code,
    portfolioName: s.portfolioName,
    portfolioCode: s.portfolioCode,
    platform: s.platform,
    subPlatform: s.subPlatform,
    reportingLocation: s.reportingLocation,
    workstreamRef: ref,
    startDate: s.startDate,
    goLiveDate: s.goLiveDate,
    workStatus: s.workStatus,
    techUnit: s.techUnit,
    year: 2026,
    scenario: 'Forecast',
    reportingFlag: i % 11 === 5 ? 'NO' : 'YES',
    singapore: s.reportingLocation.startsWith('Singapore'),

    description: s.description ?? (i % 3 === 0 ? '-' : `${s.name} — delivery of platform capabilities aligned to the ${s.portfolioName} portfolio roadmap.`),
    workCategory: s.workStatus === 'Cancelled' ? 'NA' : pick(CATEGORY, i + 3),
    overallRiskLevel: s.workStatus === 'Cancelled' ? 'NA' : pick(RISK, i + 9),
    valueBenefit: i % 4 === 0 ? '-' : 'Tracked under portfolio benefit case',
    deliveryStage: s.deliveryStage ?? pick(JOURNEY, i + 5),
    dataScope:
      i % 2 === 0
        ? 'No – No change / minor changes in existing customer / employee journey or workflow'
        : 'Yes – New or materially changed customer / employee journey or workflow',
    createdBy: pick(FIRST, i),
    createdOn: '2026-01-29',
    lastEditedBy: pick(FIRST, i + 2),
    lastEditedOn: '2026-04-02',
    deliveryTeamName: pick(CELLS, i + 1),
    deliveryTeamLocation: s.reportingLocation === 'Indonesia' ? '-' : s.reportingLocation,
    programmeElement: i % 3 === 0 ? '-' : 'Programme Element ' + ((i % 6) + 1),

    workManagers: [
      { role: 'Work Manager', name: 'Tan Wei Ming', staffId: 'S0198234', email: 'weiming.tan@bank.com', location: s.reportingLocation },
      { role: 'Team Lead', name: 'Priyanka Nair', staffId: 'S0221765', email: 'priyanka.nair@bank.com', location: 'India' },
      { role: 'Business Sponsor', name: 'Grace Ho', staffId: 'S0100442', email: 'grace.ho@bank.com', location: 'Singapore' },
      { role: 'Finance Partner', name: 'Daniel Ong', staffId: 'S0177310', email: 'daniel.ong@bank.com', location: 'Singapore' }
    ],
    keyDates: [
      { milestone: 'Business Case Approved', baseline: '2025-11-15', forecast: '2025-11-15', actual: '2025-11-20', status: 'Completed' },
      { milestone: 'Design Sign-off', baseline: '2026-02-28', forecast: '2026-03-14', actual: '-', status: 'At Risk' },
      { milestone: 'SIT Complete', baseline: '2026-06-30', forecast: '2026-07-15', actual: '-', status: 'Delayed' },
      { milestone: 'UAT Complete', baseline: '2026-09-30', forecast: '2026-09-30', actual: '-', status: 'On Track' },
      { milestone: 'Go Live', baseline: s.goLiveDate, forecast: s.goLiveDate, actual: '-', status: 'On Track' }
    ],
    fundingSources: [
      { sourceCode: 'FS-' + ref.slice(0, 6), sourceName: s.portfolioName, costCentre: 'CC' + (41000 + i), fundingSplit: 60, currency: 'SGD' },
      { sourceCode: 'FS-' + ref.slice(2, 8), sourceName: 'Group Technology Shared', costCentre: 'CC' + (52000 + i), fundingSplit: 40, currency: 'SGD' }
    ],
    approvers: [
      { level: 'L1 - Work Manager', name: 'Tan Wei Ming', designation: 'SVP, Technology', status: 'Approved', actionedOn: '2026-01-30' },
      { level: 'L2 - Platform Owner', name: 'Grace Ho', designation: 'MD, Platform Owner', status: 'Approved', actionedOn: '2026-02-04' },
      { level: 'L3 - Finance', name: 'Daniel Ong', designation: 'VP, Finance Business Partner', status: 'Pending', actionedOn: '-' },
      { level: 'L4 - Group CIO Office', name: 'Arjun Mehta', designation: 'MD, CIO Office', status: 'Pending', actionedOn: '-' }
    ],
    financials,
    allocations: [
      { resource: 'Perm Staff Pool', vendor: 'In-house', role: 'Engineering', fte: 12.5, location: s.reportingLocation },
      { resource: 'Vendor Pod A', vendor: 'Infosys', role: 'Engineering', fte: 8, location: 'India' },
      { resource: 'Vendor Pod B', vendor: 'Accenture', role: 'Testing', fte: 4.5, location: 'India' },
      { resource: 'Design Chapter', vendor: 'In-house', role: 'UX', fte: 2, location: 'Singapore' }
    ]
  };
}

const base = seeds.map(buildDetail);

/** Expand the seed set so the listing paginates like the real application. */
function expand(): Workstream[] {
  const out: Workstream[] = [...base];
  const statuses: WorkStatus[] = [
    'In Progress', 'In Progress', 'In Progress', 'Not Started', 'Business Case Preparation',
    'Completed / Pending Closure', 'On-Hold', 'Cancelled', 'Operate'
  ];
  const suffixes = ['Phase 2', 'Phase 3', 'Uplift', 'Remediation', 'Migration', 'Stabilisation', 'Rollout', 'Discovery'];
  for (let i = 0; i < 90; i++) {
    const src = seeds[i % seeds.length];
    const n = i + 100;
    const seq = String(1000 + i);
    const code = `${src.code.slice(0, 9)}-X${seq}`;
    const clone = buildDetail(
      {
        ...src,
        name: `${src.name.replace(/^\[To Delete\] /, '')} ${suffixes[i % suffixes.length]}`,
        code,
        workStatus: statuses[Math.floor(rnd(n) * statuses.length) % statuses.length],
        startDate: `${2024 + (i % 3)}-0${(i % 9) + 1}-01`,
        goLiveDate: `${2026 + (i % 2)}-1${i % 2 ? 1 : 2}-30`
      },
      n
    );
    out.push(clone);
  }
  return out;
}

export const workstreams: Workstream[] = expand();

export const workstreamById = (id: string) => workstreams.find((w) => w.id === id);
