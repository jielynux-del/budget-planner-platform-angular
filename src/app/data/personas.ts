import { signal } from '@angular/core';
import type { UiAvatarColour } from 'ai-dls-kit';

/**
 * Who is signed in. The benefits lifecycle has a requester side and an
 * approver side, and which one you are decides what the row actions offer —
 * so the prototype needs to be able to switch between them.
 */
export interface Persona {
  id: string;
  name: string;
  role: string;
  avatarColour: UiAvatarColour;
  /** Raise updates, baseline changes and closure requests. */
  canRequest: boolean;
  /** Approve or reject what someone else raised. */
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
    id: 'p-manager',
    name: 'Arjun Mehta',
    role: 'Work Manager',
    avatarColour: 'lavender',
    canRequest: true,
    canApprove: false
  },
  {
    id: 'p-finance',
    name: 'Kelvin Lim',
    role: 'Finance Business Partner',
    avatarColour: 'goji',
    canRequest: false,
    canApprove: true
  },
  {
    id: 'p-portfolio',
    name: 'Chan Wai Kit',
    role: 'Portfolio Approver',
    avatarColour: 'ginger',
    canRequest: false,
    canApprove: true
  },
  {
    id: 'p-audit',
    name: 'Priyanka Nair',
    role: 'Audit & Assurance',
    avatarColour: 'acai',
    canRequest: false,
    canApprove: false
  }
];

/** Session-wide current persona. */
export const currentPersona = signal<Persona>(PERSONAS[0]);
