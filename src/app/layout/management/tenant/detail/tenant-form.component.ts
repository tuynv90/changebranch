import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
@Component({
    selector: 'tc-tenant-form',
    template: '<tenant-detail-form></tenant-detail-form>',
    styleUrls: ['./tenant-form.component.scss'],
})
export class TenantFormComponent {
    constructor() {
    }
}
