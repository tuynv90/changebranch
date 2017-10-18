import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from "./services/login.service";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AuthGuard } from './guard/auth.guard';
import { DashboardService } from './services/dashboard.service';
import { DepartmentService } from './services/department.service';
import { EmployeeService } from './services/employee.service';
import { LandTransportService } from './services/land-transport.service';
import { NotifyService } from './services/notify.service';
import { ObtrHttpClient } from './services/obtr-http-client.service';
import { ObtrHttp } from './services/obtr-http.service';
import { RequestService } from './services/request.service';
import { TenantService } from './services/tenant.service';
import { TokenService } from './services/token.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ],
  providers: [
    LoginService,
    AuthGuard,
    DashboardService,
    DepartmentService,
    EmployeeService,
    LandTransportService,
    LoginService,
    NotifyService,
    ObtrHttpClient,
    ObtrHttp,
    RequestService,
    TenantService,
    TokenService
  ]
})
export class SharedModule { }
