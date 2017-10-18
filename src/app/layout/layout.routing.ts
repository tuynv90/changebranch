import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyInforComponent } from './my-infor/my-infor.component';


export const LAYOUT_ROUTES : Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'tenant', loadChildren: './management/tenant/tenant.module#TenantModule' },
            { path: 'department', loadChildren: './management/department/department.module#DepartmentModule' },
            { path: 'jobgrade', loadChildren: './management/jobgrade/jobgrade.module#JobgradeModule' },
            { path: 'role', loadChildren: './management/role/role.module#RoleModule' },
            { path: 'user', loadChildren: './management/user/user.module#UserModule' },
            { path: 'my-infor', component: MyInforComponent },
            { path: 'request', loadChildren: './request/request.module#RequestModule' }
        ]
    }

];
export const LayoutRouting : ModuleWithProviders = RouterModule.forChild(LAYOUT_ROUTES);