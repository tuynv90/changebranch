import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { TenantService } from '../../../shared/services/tenant.service';
import { EmployeeService } from '../../../shared/services/employee.service';


@Component({
    selector: 'tc-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss'],
    animations: [routerTransition()]
})
export class DepartmentComponent implements OnInit {
    constructor(private tenantService: TenantService, private employeeService: EmployeeService) {
        this.tenantService.getCandidateTenant().subscribe(result=>{
            if(result.success ===1){
                this.tenantService.cacheCandidateTenants = result.data;
            }
        });
        this.employeeService.getCandidateManager().subscribe(result=>{
            if(result.success ===1){
                this.employeeService.cacheCandidateManagers = result.data;
            }
        });
    }

    ngOnInit() {
    }
}
