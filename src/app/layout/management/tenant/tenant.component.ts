import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { EmployeeService } from '../../../shared/services/employee.service';

@Component({
    selector: 'tc-tenant',
    templateUrl: './tenant.component.html',
    styleUrls: ['./tenant.component.scss'],
    animations: [routerTransition()]
})
export class TenantComponent implements OnInit {
    constructor(private employeeService: EmployeeService) {
        this.employeeService.getCandidateManager().subscribe(result=>{
            if(result.success ===1){
                this.employeeService.cacheCandidateManagers = result.data;
            }
        });
    }

    ngOnInit() {

    }

}
