
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { ModalConfirmModule } from '../../../shared/components/modal-confirm/modal.confirm.module';
import { PageHeaderModule } from '../../../shared/components/page-header/page-header.module';




@NgModule({
    imports: [
        CommonModule,
        DepartmentRoutingModule,
        FormsModule,
        ModalConfirmModule,
        PageHeaderModule,
        NgbModule.forRoot(),
    ],
    declarations: [DepartmentComponent, DepartmentListComponent, DepartmentDetailComponent],
    providers:[]
})
export class DepartmentModule { }
