import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from 'app/layout/management/department/department.component';
import { DepartmentListComponent } from 'app/layout/management/department/department-list/department-list.component';
import { DepartmentDetailComponent } from 'app/layout/management/department/department-detail/department-detail.component';

const routes: Routes = [
  {
    path: '', component: DepartmentComponent
    , children:
    [
      { path: '', component: DepartmentListComponent },
      { path: 'detail/:id', component: DepartmentDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
