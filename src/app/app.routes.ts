import { Routes } from '@angular/router';
import { WorkstreamListing } from './pages/workstream-listing/workstream-listing';
import { WorkstreamDetail } from './pages/workstream-detail/workstream-detail';

export const routes: Routes = [
  { path: 'workstreams', component: WorkstreamListing },
  { path: 'workstreams/:id', component: WorkstreamDetail },
  { path: '', pathMatch: 'full', redirectTo: 'workstreams' }
];
