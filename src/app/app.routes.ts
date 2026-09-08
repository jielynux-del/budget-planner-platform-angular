import { Routes } from '@angular/router';
import { WorkstreamListing } from './pages/workstream-listing/workstream-listing';
import { WorkstreamDetail } from './pages/workstream-detail/workstream-detail';
import { Approvals } from './pages/approvals/approvals';

export const routes: Routes = [
  { path: 'workstreams', component: WorkstreamListing },
  { path: 'workstreams/:id', component: WorkstreamDetail },
  { path: 'approvals', component: Approvals },
  { path: '', pathMatch: 'full', redirectTo: 'workstreams' }
];
