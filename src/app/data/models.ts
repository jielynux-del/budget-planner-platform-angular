export type WorkStatus =
  | 'Not Started'
  | 'Business Case Preparation'
  | 'In Progress'
  | 'Completed / Pending Closure'
  | 'Operate'
  | 'On-Hold'
  | 'Cancelled';

export type ReportingFlag = 'YES' | 'NO';

export interface Workstream {
  id: string;
  name: string;
  code: string;              // e.g. P02ID-26019-I0041
  portfolioName: string;
  portfolioCode: string;     // e.g. P02-26019-I
  platform: string;          // e.g. 02 - Consumer Digital Channels
  subPlatform: string;
  reportingLocation: string;
  workstreamRef: string;     // e.g. 02ID26019I0041
  startDate: string;         // YYYY-MM-DD
  goLiveDate: string;        // YYYY-MM-DD
  workStatus: WorkStatus;
  techUnit: string;
  year: number;
  scenario: 'Forecast' | 'Budget' | 'Actuals';
  reportingFlag: ReportingFlag;
  singapore: boolean;

  // Detail attributes
  description: string;
  workCategory: string;
  overallRiskLevel: string;
  valueBenefit: string;
  deliveryStage: string;
  dataScope: string;
  createdBy: string;
  createdOn: string;
  lastEditedBy: string;
  lastEditedOn: string;
  deliveryTeamName: string;
  deliveryTeamLocation: string;
  programmeElement: string;
  workManagers: WorkManager[];
  keyDates: KeyDate[];
  fundingSources: FundingSource[];
  approvers: Approver[];
  financials: FinancialLine[];
  allocations: Allocation[];
}

export interface WorkManager {
  role: string;
  name: string;
  staffId: string;
  email: string;
  location: string;
}

export interface KeyDate {
  milestone: string;
  baseline: string;
  forecast: string;
  actual: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
}

export interface FundingSource {
  sourceCode: string;
  sourceName: string;
  costCentre: string;
  fundingSplit: number;
  currency: string;
}

export interface Approver {
  level: string;
  name: string;
  designation: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  actionedOn: string;
}

export interface FinancialLine {
  category: 'Capex' | 'Opex';
  lineItem: string;
  values: Record<number, number>;
}

export interface Allocation {
  resource: string;
  vendor: string;
  role: string;
  fte: number;
  location: string;
}

/* ---- Left-hand hierarchy tree ---- */
export type NodeStatus = 'blue' | 'red' | 'green' | 'amber' | 'grey';

export interface TreeNode {
  id: string;
  label: string;
  status: NodeStatus;
  children?: TreeNode[];
}

/* ---- Value / Benefits ---- */
export type FinancialType =
  | 'Revenue Uplift'
  | 'Cost Save'
  | 'Cost Avoidance'
  | 'Risk Reduction'
  | 'Capital Release';

export interface BenefitRow {
  id: string;
  benefitRef: string;
  typeOfFinancial: FinancialType | '';
  driver: string;
  measure: string;
  values: Record<number, number>;
  comments: string;
}

export interface KeyBenefit {
  benefitRef: string;
  category: string;
  description: string;
  withFinancialImpact: boolean;
}

export interface InvestmentRow {
  category: 'Capex' | 'Opex';
  values: Record<number, number>;
}

export interface ValueBenefitsModel {
  benefitOwner: string;
  yearRangeId: string;
  keyBenefit: KeyBenefit;
  benefitRows: BenefitRow[];
  investments: InvestmentRow[];
}

export interface YearRange {
  id: string;
  label: string;
  years: number[];
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  kind: 'info' | 'warn' | 'success';
}

/* ---- Benefit lifecycle: definition -> baseline -> tracking ---- */

export type BenefitType = 'Financial' | 'Non-Financial';

export type BaselineApprovalStatus = 'Approved' | 'Pending Approval' | 'Rejected';

export type BenefitLifecycleStatus = 'Tracking Active' | 'Closure Pending Approval' | 'Closed';

/** One immutable entry in a benefit's baseline history. Never overwritten. */
export interface BaselineRecord {
  baselineId: string;              // BL0001, BL0002, ...
  baselineValue: number | null;    // null for non-financial benefits
  effectiveDate: string;
  targetRealisationDate: string;
  requestedBy: string;
  approvedBy: string;
  approvalDate: string;
  changeReason: string;
  status: BaselineApprovalStatus;
}

/** One periodic update. Appended, never edited in place. */
export interface BenefitUpdate {
  id: string;
  updateDate: string;
  actualValue: number | null;      // financial benefits only
  progressUpdate: string;          // non-financial benefits only
  variancePct: number | null;      // financial benefits only
  varianceExplanation: string;
  rootCause: string;
  correctiveAction: string;
  updatedBy: string;
  evidence: string;
}

export interface AuditEntry {
  id: string;
  date: string;
  user: string;
  action: string;
  comments: string;
}

/**
 * A benefit is created once through Add New Benefit and then managed through
 * its lifecycle. It is the single record behind both the Benefits Tracking and
 * the Baseline Management tables.
 */
export interface Benefit {
  id: string;
  benefitRef: string;              // B01, B02, ...
  name: string;
  type: BenefitType;
  category: string;
  description: string;
  owner: string;

  // Baseline. The original is immutable; the current one moves through workflow.
  baselineId: string;
  originalApprovedBaseline: number | null;
  currentApprovedBaseline: number | null;
  effectiveDate: string;
  targetRealisationDate: string;
  approvalStatus: BaselineApprovalStatus;
  approvedBy: string;
  approvalDate: string;

  status: BenefitLifecycleStatus;

  /** Year-phased financial lines captured at definition (financial benefits). */
  financialRows: BenefitRow[];

  baselineHistory: BaselineRecord[];
  reportingHistory: BenefitUpdate[];
  auditLog: AuditEntry[];
}
