import { signal, type WritableSignal } from '@angular/core';
import { defaultBenefits } from './benefitsData';
import { atsRecord } from './atsStore';
import type { Benefit } from './models';

/**
 * Session store for benefit records, keyed by ATS request. Held here rather
 * than derived per screen so an edit survives navigation.
 *
 * Benefits are logged and tracked against the ATS request that funds them, and
 * are approved with it — they have no approval of their own, so there is no
 * queue to derive from this store any more.
 */
const store = new Map<string, WritableSignal<Benefit[]>>();

export function benefitsFor(atsId: string): WritableSignal<Benefit[]> {
  let entry = store.get(atsId);
  if (!entry) {
    const ats = atsRecord(atsId)();
    entry = signal<Benefit[]>(ats ? defaultBenefits(ats) : []);
    store.set(atsId, entry);
  }
  return entry;
}
