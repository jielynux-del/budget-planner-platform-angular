import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiIcon, UiNavRail, UiNavRailItem, type UiIconName } from 'ai-dls-kit';

interface RailItem { icon: UiIconName; label: string; route?: string; }

/** Application shell: the persistent left nav rail plus the routed page region. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UiNavRail, UiNavRailItem, UiIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly active = signal('Workstream Listing');

  protected readonly primary: RailItem[] = [
    { icon: 'home', label: 'Home Dashboard' },
    { icon: 'money-bank-calculator', label: 'Budget Management' },
    { icon: 'people-conversation', label: 'Resource Management' },
    { icon: 'chart-bar', label: 'Performance Insights' }
  ];

  protected readonly listings: RailItem[] = [
    { icon: 'bar-chart', label: 'Financial View' },
    { icon: 'document-chart', label: 'Business Plan' },
    { icon: 'list', label: 'Portfolio Listing' },
    { icon: 'table', label: 'Workstream Listing', route: '/workstreams' },
    { icon: 'list-bullet', label: 'Sub-Workstream Listing' },
    { icon: 'grid-layout', label: 'Manage Online Listing' },
    { icon: 'chart-search', label: 'Manage Online Forecast' }
  ];

  protected readonly utility: RailItem[] = [
    { icon: 'grid', label: 'Reference Data' },
    { icon: 'report', label: 'Reports' },
    { icon: 'mail', label: 'Inbox' },
    { icon: 'bell', label: 'Notifications' },
    { icon: 'settings', label: 'Settings' }
  ];
}
