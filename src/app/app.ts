import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  UiDropdownAccountItem, UiDropdownMenu, UiIcon, UiNavRail, UiNavRailFlyout, UiNavRailFooter,
  UiNavRailHeader, UiNavRailItem, UiNavRailSubItem, type UiIconName
} from 'ai-dls-kit';
import { PERSONAS, currentPersona, type Persona } from './data/personas';

interface RailItem {
  icon: UiIconName;
  label: string;
  route?: string;
  children?: { label: string; route?: string }[];
}

/** Application shell: the persistent nav rail, its persona switcher, and the routed page. */
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, UiNavRail, UiNavRailItem, UiNavRailSubItem, UiNavRailFlyout,
    UiNavRailHeader, UiNavRailFooter, UiIcon, UiDropdownMenu, UiDropdownAccountItem
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly router = inject(Router);

  protected readonly navExpanded = signal(true);
  protected readonly openGroup = signal<string | null>('Work Management');
  protected readonly personaMenuOpen = signal(false);

  protected readonly personas = PERSONAS;
  protected readonly persona = currentPersona;
  protected readonly active = signal('Build Workstream Listing');

  protected readonly items: RailItem[] = [
    { icon: 'bar-chart', label: 'Current Year Insights' },
    { icon: 'document-chart', label: 'Next Year Demand Dashboard' },
    { icon: 'people-conversation', label: 'Workforce Management' },
    {
      icon: 'chart-search',
      label: 'Work Management',
      children: [
        { label: 'Financial View' },
        { label: 'Budget Prioritisation' },
        { label: 'Build Portfolio Listing' },
        { label: 'Build Workstream Listing', route: '/workstreams' },
        { label: 'Build Sub-Workstream Listing' },
        { label: 'Maintain & Operate Listing' },
        { label: 'Maintain & Operate Forecast' }
      ]
    },
    { icon: 'table', label: 'Driver Based Forecast' },
    { icon: 'money-bank-calculator', label: 'Work Accounting' }
  ];

  protected readonly utility: RailItem[] = [
    { icon: 'mail', label: 'My Items' },
    { icon: 'bell', label: 'Notification' }
  ];

  protected readonly initials = computed(() =>
    this.persona().name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase());

  protected toggleGroup(label: string) {
    this.openGroup.set(this.openGroup() === label ? null : label);
  }

  protected go(item: { label: string; route?: string }) {
    this.active.set(item.label);
    if (item.route) this.router.navigateByUrl(item.route);
  }

  protected pickPersona(p: Persona) {
    currentPersona.set(p);
    this.personaMenuOpen.set(false);
  }
}
