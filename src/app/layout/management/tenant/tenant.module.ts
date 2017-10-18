

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant.component';
import { TenantFormComponent } from './detail/tenant-form.component';
import { TenantListComponent } from './list/tenant-list.component';
import { TenantDetailFormComponent } from './detail/tenant-detail-form.component';
import { ModalConfirmModule } from '../../../shared/components/modal-confirm/modal.confirm.module';
import { PageHeaderModule } from '../../../shared/components/page-header/page-header.module';


@NgModule({
    imports: [
        CommonModule,
        TenantRoutingModule,
        ModalConfirmModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot(),
    ],
    declarations: [TenantComponent, TenantFormComponent, TenantListComponent,TenantDetailFormComponent],
    providers:[]
})
export class TenantModule { }
