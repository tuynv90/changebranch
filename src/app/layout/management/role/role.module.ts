import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { ModalConfirmModule } from '../../../shared/components/modal-confirm/modal.confirm.module';
import { PageHeaderModule } from '../../../shared/components/page-header/page-header.module';



@NgModule({
    imports: [
        CommonModule,
        RoleRoutingModule,
        ModalConfirmModule,
        PageHeaderModule,
    ],
    declarations: [RoleComponent]
})
export class RoleModule { }
