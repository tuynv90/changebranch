import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalConfirmComponent } from "./modal-confirm.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [ModalConfirmComponent],
    exports: [ModalConfirmComponent]
})
export class ModalConfirmModule { }
