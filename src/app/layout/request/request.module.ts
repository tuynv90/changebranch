import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RequestRoutingModule } from './request.routing';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestComponent } from './request.component';
import { RequestListComponent } from './request-list/request-list.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ModalConfirmComponent } from '../../shared/components/modal-confirm/modal-confirm.component';
import { ModalConfirmModule } from '../../shared/components/modal-confirm/modal.confirm.module';
import { PageHeaderModule } from '../../shared/components/page-header/page-header.module';


@NgModule({
    imports: [
        CommonModule,
        RequestRoutingModule,
        FormsModule,
        NgbModule.forRoot(),
        ModalConfirmModule,
        PageHeaderModule,
    ],
    providers: [],
    declarations: [RequestComponent, RequestListComponent, RequestDetailComponent],
})
export class RequestModule {
}
