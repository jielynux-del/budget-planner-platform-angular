import type { YearRange } from './models';

export const YEARS = [2024, 2025, 2026, 2027];

export const SCENARIOS = ['Forecast', 'Budget', 'Actuals'] as const;

export const REPORTING_FLAGS = [
  'Reporting Flag - YES',
  'Reporting Flag - NO',
  'Reporting Flag - ALL'
];

export const LOCATIONS = [
  'All Locations',
  'Singapore',
  'Singapore Reg',
  'Hong Kong',
  'Indonesia',
  'India',
  'Taiwan',
  'China',
  'Malaysia',
  'Vietnam',
  'United Kingdom',
  'Australia'
];

export const TECH_UNITS = [
  'All Tech Units',
  'Consumer Banking Technology',
  'Institutional Banking Technology',
  'Risk & Compliance Technology',
  'Finance Technology',
  'Wealth Technology',
  'T&M Technology',
  'Group Infrastructure'
];

export const PLATFORMS = [
  'All Platforms',
  '02 - Consumer Digital Channels',
  '03 - Wealth Management',
  '05 - Institutional Banking',
  '07 - Payments & Cash Management',
  '09 - Consumer Lending',
  '11 - Treasury & Markets',
  '14 - Finance',
  '18 - Enterprise Risk',
  '21 - Technology Services'
];

export const WORK_STATUSES = [
  'Not Started',
  'Business Case Preparation',
  'In Progress',
  'Completed / Pending Closure',
  'Operate',
  'On-Hold',
  'Cancelled'
] as const;

export const BENEFIT_CATEGORIES = [
  'Revenue Growth',
  'Cost Efficiency',
  'Risk & Control',
  'Regulatory Compliance',
  'Customer Experience',
  'Employee Experience'
];

export const FINANCIAL_TYPES = [
  'Revenue Uplift',
  'Cost Save',
  'Cost Avoidance',
  'Risk Reduction',
  'Capital Release'
] as const;

export const BENEFIT_DRIVERS = [
  'Straight Through Processing',
  'Digital Adoption',
  'Manual Effort Reduction',
  'Cross-Sell Uplift',
  'Loss Event Reduction',
  'Vendor Rationalisation'
];

export const BENEFIT_MEASURES = [
  'S$ Value',
  '# of Accounts',
  '# of FTE',
  '% Reduction',
  'Basis Points'
];

export const BENEFIT_OWNERS = [
  'Group Consumer Banking',
  'Institutional Banking Group',
  'Group Technology & Operations',
  'Group Finance',
  'Group Risk Management'
];

export const YEAR_RANGES: YearRange[] = [
  { id: '2018-2020', label: '2018 - 2020', years: [2018, 2019, 2020] },
  { id: '2021-2023', label: '2021 - 2023', years: [2021, 2022, 2023] },
  { id: '2024-2026', label: '2024 - 2026', years: [2024, 2025, 2026] }
];
