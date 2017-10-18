import { AppSettings } from './../../../../app.setting';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Tenant } from '../../../../shared/models/tenant';
import { TenantService } from '../../../../shared/services/tenant.service';


@Component({
    selector: 'tc-tenant-list',
    templateUrl: './tenant-list.component.html',
    styleUrls: ['./tenant-list.component.scss'],
})
export class TenantListComponent implements OnInit {
    tenants: Tenant[];
    //for paging
    totalItems: number = 100;
    perpage: number = AppSettings.PER_PAGE;
    page: number = AppSettings.PAGE;
    constructor(
        private tenantService: TenantService,
        private modalService: NgbModal,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.tenantService.getTenants(this.page, this.perpage).subscribe(result => {
            if (result['success'] === 1) {
                this.tenants = result['data'];
                this.totalItems = result['rows'];
            }
        })
        console.log(this.tenants);
    }
    editTenant(tenant_id) {
        let link = ['page/tenant/detail', tenant_id];
        this.router.navigate(link);

    }
    deleted(id) {
        this.tenantService.deleteTenant(id).subscribe(result => {
            if (result.success === 1) {
                alert(result.message);
                this.tenants = this.tenants.filter(t => {
                    return t.tenant_id != id;
                });
            } else {
                //TODO: 
            }
        })
    }
    loadPage(page) {
        this.tenantService.getTenants(page, this.perpage).subscribe(result => {
            if (result['success'] === 1) {
                this.tenants = result['data'];
            }
        })
    }
}
