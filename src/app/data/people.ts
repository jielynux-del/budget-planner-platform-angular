/**
 * Benefit owners are named individuals, not business units.
 *
 * The BU is derived from the person rather than stored on the benefit: a
 * benefit's "BUs involved" is whatever the selected owners represent, so it can
 * never drift out of step with the roster the way a separately-edited field
 * would. `businessUnitsFor` is the only way that field is ever produced.
 *
 * Surnames are capitalised, matching how the bank prints a legal name.
 */
export interface Person {
  /** Display name, surname capitalised — e.g. 'Peter Weng Jian TAN'. */
  name: string;
  businessUnit: string;
}

export const BUSINESS_UNITS = [
  'Group Consumer Banking',
  'Institutional Banking Group',
  'Group Technology & Operations',
  'Group Finance',
  'Group Risk Management'
];

export const PEOPLE: Person[] = [
  { name: 'Peter Weng Jian TAN', businessUnit: 'Group Consumer Banking' },
  { name: 'Michelle Widjaya CHONG', businessUnit: 'Group Consumer Banking' },
  { name: 'Nurul Aisyah BINTE RAHMAN', businessUnit: 'Group Consumer Banking' },
  { name: 'Sunil RAMESH', businessUnit: 'Group Finance' },
  { name: 'Grace Hui Min LOW', businessUnit: 'Group Finance' },
  { name: 'James Robert WHITFIELD', businessUnit: 'Institutional Banking Group' },
  { name: 'Priya Lakshmi NAIR', businessUnit: 'Institutional Banking Group' },
  { name: 'Kelvin Wei Sheng LIM', businessUnit: 'Institutional Banking Group' },
  { name: 'Anand KRISHNAMURTHY', businessUnit: 'Group Technology & Operations' },
  { name: 'Sarah Jane MCALLISTER', businessUnit: 'Group Technology & Operations' },
  { name: 'Daniel Zhi Hao NG', businessUnit: 'Group Technology & Operations' },
  { name: 'Farah Nadia BINTE OMAR', businessUnit: 'Group Risk Management' },
  { name: 'Vikram Singh CHAUDHARY', businessUnit: 'Group Risk Management' },
  { name: 'Rachel Mei Ling KOH', businessUnit: 'Group Risk Management' }
];

export const PEOPLE_NAMES = PEOPLE.map((p) => p.name);

const BU_BY_NAME = new Map(PEOPLE.map((p) => [p.name, p.businessUnit]));

/**
 * The distinct BUs a set of owners represents, in roster order so the same
 * selection always reads the same way. An unknown name contributes nothing
 * rather than an empty entry — RULES #8: show the gap, don't fake a value.
 */
export function businessUnitsFor(owners: readonly string[]): string[] {
  const seen = new Set<string>();
  for (const name of owners) {
    const bu = BU_BY_NAME.get(name);
    if (bu) seen.add(bu);
  }
  return BUSINESS_UNITS.filter((bu) => seen.has(bu));
}

/** People belonging to a BU — used to reassign seed data off the old BU owners. */
export const peopleIn = (businessUnit: string) =>
  PEOPLE.filter((p) => p.businessUnit === businessUnit).map((p) => p.name);
