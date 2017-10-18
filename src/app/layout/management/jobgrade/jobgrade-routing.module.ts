import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobgradeComponent } from 'app/layout/management/jobgrade/jobgrade.component';

const routes: Routes = [
    { path: '', component: JobgradeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobgradeRoutingModule { }
