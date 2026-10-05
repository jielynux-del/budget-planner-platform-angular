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

/* ---- Benefits Tracking ---- */
export type FinancialType =
  | 'Revenue Uplift'
  | 'Cost Save'
  | 'Cost Avoidance'
  | 'Risk Reduction'
  | 'Capital Release';

export interface BenefitRow {
  id: string;
  benefitRef: string;
  /**
   * Which financial baseline this row posts against. The template writes rows
   * per baseline, and the page shows each row under the baseline it explains —
   * so the link is stored rather than inferred from `driver`, which is a
   * business label and not an identifier.
   */
  baselineId: string;
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

/**
 * Read from a benefit's baseline lines, never chosen by hand — a benefit that
 * holds both kinds of baseline is 'Mixed'. Stored rather than computed at every
 * read so existing filters and columns keep working, but only ever written by
 * `benefitTypeOf`.
 */
export type BenefitType = 'Financial' | 'Non-Financial' | 'Mixed';

/**
 * 'Rework' is sent back to the requester to amend and resubmit — the request
 * stays alive. 'Rejected' ends it. The Sponsor's queue only offers approve and
 * rework; Rejected remains in the type for records that already carry it.
 */
/**
 * Retired. Benefits are populated as part of an ATS request and approved with
 * it, so nothing at benefit level carries an approval state of its own.
 * Baseline history keeps the record of WHAT changed and why; the approval that
 * covered it belongs to the ATS.
 */

/**
 * Two states, not four: the other two were waiting-rooms for an approval that
 * no longer exists at this level. The BAs are reworking the status set, so
 * this is deliberately the smallest honest version rather than a guess at
 * theirs.
 */
export type BenefitLifecycleStatus = 'Tracking Active' | 'Closed';

/**
 * One immutable entry in a benefit's baseline history. Never overwritten.
 *
 * A change log, not an approval trail: the approval that covered a baseline
 * belongs to the ATS request the benefit sits in, so what is worth keeping
 * here is what the baseline became, when, and why.
 */
export interface BaselineRecord {
  baselineId: string;              // BL0001, BL0002, ...
  baselineValue: number | null;    // null for non-financial benefits
  startDate: string;
  endDate: string;
  /** Who made the change, and when. */
  changedBy: string;
  changedOn: string;
  changeReason: string;
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

/**
 * One field that changed in an edit. Kept now only to describe the change in
 * the audit log — there is no approver to show a diff to, but "what did this
 * edit actually alter" is still the question the log has to answer.
 */
export interface BenefitFieldChange {
  /** Property on Benefit that this change applies to. */
  key: string;
  /** Human label — e.g. 'Benefit Owner'. */
  label: string;
  from: string;
  to: string;
}

/**
 * The benefit as it stood when an audit entry was written.
 *
 * Materialised at the moment the entry is created rather than reconstructed on
 * read: the descriptive fields (name, owners, categories) are not versioned
 * anywhere, so there is no way to work out later what they used to say. An
 * entry without one shows as not captured — RULES #8, state the gap.
 */
export interface BenefitSnapshot {
  name: string;
  type: BenefitType;
  categories: string[];
  owners: string[];
  businessUnits: string[];
  description: string;
  validationSource: string;
  startDate: string;
  endDate: string;
  status: string;
  baselineId: string;
  baselineValue: number | null;
  originalBaseline: number | null;
  /** Reporting lines in the history at that point. */
  reportingLines: number;
  latestReported: string;
}

export interface AuditEntry {
  id: string;
  date: string;
  user: string;
  action: string;
  comments: string;
  /** What the benefit looked like at this point. Absent on older entries. */
  snapshot?: BenefitSnapshot;
}

/**
 * A benefit is created once through Add New Benefit and then managed through
 * its lifecycle. It is the single record behind both the Benefits Tracking and
 * the Benefits Tracking table — its baseline lives inside it, not in a view
 * of its own.
 */
/**
 * Which kind of baseline a line is. The choice is made when the line is added,
 * because a single benefit may carry both — a cost saving and a service-level
 * improvement are one benefit to the business, not two.
 */
export type BaselineKind = 'Financial' | 'Non-Financial';

/**
 * One baseline within a benefit.
 *
 * A non-financial baseline used to be a sentence of prose, which meant two
 * people could read the same benefit and disagree about whether it had been
 * met. It is now stated in the same terms a financial one is: what is being
 * measured, from where, where it stands today, and the condition that counts
 * as meeting it.
 */
export interface BaselineLine {
  id: string;
  kind: BaselineKind;
  /** What this baseline is called, e.g. 'Straight-through processing rate'. */
  name: string;

  /**
   * Assigned per baseline, not per benefit: a benefit may carry several, and
   * each moves through approval on its own reference.
   */
  baselineId: string;

  /**
   * The figure first approved for this baseline, and the one in force now.
   *
   * FINANCIAL: both are read from the uploaded template — there is no single
   * number to type, because the workbook phases the money across years and it
   * is the year columns that carry the meaning. A financial baseline with no
   * file behind it has no value at all.
   *
   * NON-FINANCIAL: null. The pass condition below is what it is measured
   * against, and that is prose rather than a figure.
   */
  originalValue: number | null;
  currentValue: number | null;

  /* ---- Non-financial only. ---- */
  /** What it intends to measure. */
  measure: string;
  /** The unit that measure is counted in — days, %, NPS points, incidents. */
  unit: string;
  /** Where it stands today, so the improvement can be read against something. */
  startingPoint: string;
  /** What constitutes meeting the baseline. The pass condition, stated plainly. */
  target: string;
  /** How it will be measured, and from which system or report. */
  method: string;
  /** How often it is measured. */
  frequency: string;
}

/**
 * The financial impact workbook.
 *
 * Financial figures arrive as a filled template rather than by typing: the
 * numbers are prepared and checked in Excel, and re-keying them into a form
 * only adds a place for them to diverge. One file is kept per benefit, so a
 * correction is a fresh upload rather than an edit, and the audit log records
 * every replacement.
 */
export interface FinancialImpactFile {
  name: string;
  size: string;
  uploadedBy: string;
  uploadedOn: string;
}

export interface Benefit {
  id: string;
  benefitRef: string;              // B01, B02, ...
  name: string;
  type: BenefitType;
  /** Several people may own one benefit; the BUs involved derive from them. */
  categories: string[];
  description: string;
  owners: string[];
  /**
   * Where the actuals for this benefit are read from — a PC code, a GL
   * account, or a sentence naming the report that carries it. Free text
   * because the source is not always a coded system.
   */
  validationSource: string;

  // Baseline. The original is immutable; the current one moves through workflow.
  baselineId: string;
  originalApprovedBaseline: number | null;
  currentApprovedBaseline: number | null;
  /** Where tracking begins. */
  startDate: string;
  /** Where the benefit is targeted to be realised. */
  endDate: string;
  /**
   * Every baseline on this benefit, financial and non-financial alike. The
   * benefit's own type is read from these rather than stored separately, so it
   * can never contradict what the benefit actually contains.
   */
  baselineLines: BaselineLine[];

  status: BenefitLifecycleStatus;

  /**
   * Year-phased financial lines. Read-only in the UI: they are written by
   * uploading a template and replaced wholesale by uploading another, never
   * edited in place.
   */
  financialRows: BenefitRow[];

  /** Where those rows came from. Absent until a template has been uploaded. */
  financialFile?: FinancialImpactFile;

  baselineHistory: BaselineRecord[];
  reportingHistory: BenefitUpdate[];
  auditLog: AuditEntry[];
}
