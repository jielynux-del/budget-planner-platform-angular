import { signal } from '@angular/core';
import type { UiAvatarColour } from 'ai-dls-kit';

/**
 * Who is signed in. The benefits lifecycle has three roles: the Benefit
 * Owner creates and updates benefits, the Sponsor approves any change, and
 * Finance is a read-only viewer with no actions. Which role you hold decides
 * what row actions are available.
 */
export interface Persona {
  id: string;
  name: string;
  role: string;
  avatarColour: UiAvatarColour;
  /** Raise updates, baseline changes and closure requests. Only the Benefit Owner can do this; Finance cannot. */
  canRequest: boolean;
  /** Approve or reject what someone else raised. Only the Sponsor can do this; Finance cannot. */
  canApprove: boolean;
  /** Which owner's benefits this persona is accountable for, if any. */
  ownerScope?: string;
}

export const PERSONAS: Persona[] = [
  {
    id: 'p-owner',
    name: 'Tan Hui Ling',
    role: 'Benefit Owner',
    avatarColour: 'mint',
    canRequest: true,
    canApprove: false,
    ownerScope: 'Group Consumer Banking'
  },
  {
    id: 'p-sponsor',
    name: 'Chan Wai Kit',
    role: 'Sponsor',
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
