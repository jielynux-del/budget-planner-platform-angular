import { Component } from '@angular/core';
import { UiButton, UiIcon, UiPageHeader, UiSearchInput, UiStatusTag } from 'ai-dls-kit';

/** Smoke test: proves the kit's components compile and render before any porting begins. */
@Component({
  selector: 'app-root',
  imports: [UiPageHeader, UiButton, UiIcon, UiSearchInput, UiStatusTag],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  query = '';
}
