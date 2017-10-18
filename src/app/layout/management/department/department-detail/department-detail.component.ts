import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../../../shared/models/department';
import { Manager } from '../../../../shared/models/user-management';
import { Tenant } from '../../../../shared/models/tenant';
import { DepartmentService } from '../../../../shared/services/department.service';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { TenantService } from '../../../../shared/services/tenant.service';


@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  department: Department;
  department_id: number;
  isEdit: boolean;
  alert:any = '';
  selectedManager: Manager;
  selectedTenant: Tenant;
  constructor(private departmentService: DepartmentService, private route: ActivatedRoute,
    private employeeService: EmployeeService, private location: Location, private tenantService: TenantService) {
  }

  submitted = false;

  onSubmit() { this.submitted = true; }

  ngOnInit() {
    // alert(this.tenant.tenant_name);
    this.alert = null;
    this.route.params.subscribe(params => {
      this.department_id = +params['id']; // (+) converts string 'id' to a number
      if(this.department_id > 0){
        //1. for Edit
        this.isEdit = true;
        this.departmentService.getDepartmentbyId(this.department_id).subscribe(result => {
          if (result.success === 1) {
            this.alert = { type: 'success', message: result.message}
            this.department = result.data;
            let managerResults = this.employeeService.cacheCandidateManagers.filter(e => { return e.employee_id == result.data.manager_id });
            if (managerResults.length > 0) {
              this.selectedManager = managerResults[0];
            }
            let tenantsResults = this.tenantService.cacheCandidateTenants.filter(e => { return e.tenant_id == result.data.tenant_id });
            if (tenantsResults.length > 0) {
              this.selectedTenant = tenantsResults[0];
            }
          } else {
            // TODO:
            this.alert = {type: 'danger', message: result.message}
          }
        });
      }else{
        //2. for Addnew
        this.isEdit = false;
        this.department = {dept_name: '',tenant_id:null,  manager_id: null}
      }
      
    });
  }
  onChangeManager(selectedManager) {
    this.department.manager_id = selectedManager.employee_id;

  }
  onChangeTenant(selectedTenant) {
    this.department.tenant_id = selectedTenant.tenant_id;

  }
  updateDepartment() {
    this.departmentService.updateDepartment(this.department, this.department_id).subscribe(result=>{
      if(result.success === 1){
        
      }
    })
  }
  addDepartment() {
    this.departmentService.addDepartments(this.department).subscribe(result=>{
      if(result.success ===1)
      {
        alert(result.message);
      }else{
        // TODO: 
      }
    })
  }
  goback(){
    this.location.back();
  }
  public closeAlert() {
    this.alert = null;
  }
}

