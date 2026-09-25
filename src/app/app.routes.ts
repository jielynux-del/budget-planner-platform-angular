import { Routes } from '@angular/router';
import { WorkstreamListing } from './pages/workstream-listing/workstream-listing';
import { WorkstreamDetail } from './pages/workstream-detail/workstream-detail';
import { AtsListing } from './pages/ats-listing/ats-listing';
import { AtsDetail } from './pages/ats-detail/ats-detail';

export const routes: Routes = [
  { path: 'workstreams', component: WorkstreamListing },
  { path: 'workstreams/:id', component: WorkstreamDetail },
  { path: 'approval-to-spend', component: AtsListing },
  { path: 'approval-to-spend/:id', component: AtsDetail },
  { path: '', pathMatch: 'full', redirectTo: 'workstreams' }
];
