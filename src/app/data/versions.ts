/**
 * Deployed versions of this prototype, newest first.
 *
 * Each entry is a frozen build parked under `public/v/<date>/`, so an earlier
 * version stays reachable after the live one has moved on. Kept in the repo
 * rather than pointed at Vercel's own deployment URLs: those exist, but they
 * are not knowable from here and would break the moment the project moved.
 *
 * `path` is null for the version currently live — there is no snapshot to open
 * because you are already looking at it.
 */
export interface PrototypeVersion {
  /** Date the build went to the public URL. */
  date: string;
  /** What this round was about, in one line. */
  summary: string;
  /** What changed since the version below it. */
  changes: string[];
  /** Where the frozen build is served, or null when this is the live one. */
  path: string | null;
}

export const VERSIONS: PrototypeVersion[] = [
  {
    date: '2026-10-12',
    summary: 'Columns, sections and guidance put where the reader expects them',
    path: null,
    changes: [
      'ATS listing: Status moves from the far right to sit beside LE-PC Code, and the cost-type and currency selects no longer touch.',
      'The Master ATS explanation moves from a banner above the whole record into a tooltip on the section it describes.',
      'A Draft request now says what the state means and what to do about it.',
      'Benefits table: Benefit Status sits next to Benefit Owner, rather than six columns away.',
      'Baseline History leaves its accordion for a section of its own, beside its title like every other section.',
      'Reporting History moves beside its title too.'
    ]
  },
  {
    date: '2026-10-05',
    summary: 'Benefits move onto the ATS request, and approval moves with them',
    path: '/v/2026-10-05/',
    changes: [
      'Benefits Tracking is now a tab on the ATS request, between Drawdown Alerts and ATS Owners. The workstream no longer carries it.',
      'Benefits have no approval of their own. They are populated before a request is sent, and approved with it.',
      'Maker-checker built on the request: a Requestor submits, an Approver approves or sends it back with required comments.',
      'A request under approval locks everything in it, benefits included, until it is decided.',
      'Each request now has its own benefits rather than every request showing the same six.',
      'Benefit statuses reduce to Tracking Active and Closed.'
    ]
  },
  {
    date: '2026-09-29',
    summary: 'Benefits Tracking on the workstream, with its own approval cycle',
    path: '/v/2026-09-29/',
    changes: [
      'Value / Benefits renamed Benefits Tracking throughout.',
      'Each baseline is its own accordion, carrying its ID and approved figures.',
      'Financial baselines are defined by an uploaded template rather than a typed figure.',
      'Non-financial baselines state what they measure and what counts as meeting them.',
      'Benefits are approved by a Sponsor, separately from any ATS request.',
      'Approval to Spend listing and record pages, with no link to benefits.'
    ]
  }
];
