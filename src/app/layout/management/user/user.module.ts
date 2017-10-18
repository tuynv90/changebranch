
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ModalConfirmModule } from '../../../shared/components/modal-confirm/modal.confirm.module';
import { PageHeaderModule } from '../../../shared/components/page-header/page-header.module';




@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        ModalConfirmModule,
        PageHeaderModule,
    ],
    declarations: [UserComponent]
})
export class UserModule { }
