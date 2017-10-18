
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobgradeRoutingModule } from './jobgrade-routing.module';
import { JobgradeComponent } from './jobgrade.component';
import { ModalConfirmModule } from '../../../shared/components/modal-confirm/modal.confirm.module';
import { PageHeaderModule } from '../../../shared/components/page-header/page-header.module';



@NgModule({
    imports: [
        CommonModule,
        JobgradeRoutingModule,
        ModalConfirmModule,
        PageHeaderModule,
    ],
    declarations: [JobgradeComponent]
})
export class JobgradeModule { }
