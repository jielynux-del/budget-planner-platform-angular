import { Routes } from '@angular/router';
import { WorkstreamListing } from './pages/workstream-listing/workstream-listing';

export const routes: Routes = [
  { path: 'workstreams', component: WorkstreamListing },
  { path: '', pathMatch: 'full', redirectTo: 'workstreams' }
];
