import { signal } from '@angular/core';
import type { UiAvatarColour } from 'ai-dls-kit';

/**
 * Who is signed in.
 *
 * Approval sits on the ATS request now, not on individual benefits: the
 * Requestor populates a request and sends it, the DOA Approver approves it or
 * sends it back, and Finance looks without acting. A request carries its
 * benefits through that one decision.
 */
export interface Persona {
  id: string;
  name: string;
  role: string;
  avatarColour: UiAvatarColour;
  /** Populate a request and send it for approval. The Requestor only. */
  canRequest: boolean;
  /** Decide a request within delegated authority. The DOA Approver only. */
  canApprove: boolean;
  /** Which owner's benefits this persona is accountable for, if any. */
  ownerScope?: string;
}

export const PERSONAS: Persona[] = [
  {
    id: 'p-owner',
    name: 'Tan Hui Ling',
    role: 'Requestor',
    avatarColour: 'mint',
    canRequest: true,
    canApprove: false,
    ownerScope: 'Group Consumer Banking'
  },
  {
    id: 'p-sponsor',
    name: 'Chan Wai Kit',
    role: 'DOA Approver',
    avatarColour: 'ginger',
    canRequest: false,
    canApprove: true
  },
  {
    id: 'p-finance',
    name: 'Kelvin Lim',
    role: 'Finance',
    avatarColour: 'goji',
    canRequest: false,
    canApprove: false
  }
];

/** Session-wide current persona. */
export const currentPersona = signal<Persona>(PERSONAS[0]);
