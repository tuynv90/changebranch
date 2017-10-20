import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children:
    [
      { path: '', component: DashboardListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
