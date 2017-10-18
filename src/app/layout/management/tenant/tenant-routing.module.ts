import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantFormComponent } from 'app/layout/management/tenant/detail/tenant-form.component';
import { TenantComponent } from 'app/layout/management/tenant/tenant.component';
import { TenantListComponent } from './list/tenant-list.component';

const routes: Routes = 
[
  {
    path: '', component: TenantComponent, children: 
    [
      { path: '', component: TenantListComponent },
      { path: 'detail/:id', component: TenantFormComponent },
    ]
  }
    // {path: '', component: TenantComponent},
    // {path: 'list', component: TenantListComponent},
    // {path: 'detail/:id', component: TenantFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
