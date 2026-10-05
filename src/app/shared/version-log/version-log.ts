import { Component, signal } from '@angular/core';
import { UiButton, UiFab, UiIcon, UiIconButton } from 'ai-dls-kit';
import { VERSIONS } from '../../data/versions';

/**
 * A log of the prototype's own deployed versions, reachable from anywhere.
 *
 * Earlier builds are frozen under `public/v/<date>/` and opened in a new tab,
 * so a reviewer can see what a screen looked like before a round of changes
 * rather than taking a description of it on trust.
 */
@Component({
  selector: 'app-version-log',
  imports: [UiFab, UiIcon, UiIconButton, UiButton],
  templateUrl: './version-log.html',
  styleUrl: './version-log.scss'
})
export class VersionLog {
  protected readonly versions = VERSIONS;
  protected readonly open = signal(false);

  protected toggle() { this.open.update((v) => !v); }
  protected close() { this.open.set(false); }
}
