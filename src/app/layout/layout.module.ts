import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutRouting } from './layout.routing';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyInforComponent } from './my-infor/my-infor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalConfirmComponent } from '../shared/components/modal-confirm/modal-confirm.component';
import { PageHeaderComponent } from '../shared/components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRouting,
    FormsModule,
    NgbDropdownModule.forRoot(),
    NgbModule.forRoot(),
  ],
  declarations: [LayoutComponent, DashboardComponent, HeaderComponent,
    SidebarComponent,
    MyInforComponent]
})
export class LayoutModule { }
