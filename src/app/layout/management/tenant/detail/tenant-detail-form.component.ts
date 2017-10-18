import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Tenant } from '../../../../shared/models/tenant';
import { Manager } from '../../../../shared/models/user-management';
import { TenantService } from '../../../../shared/services/tenant.service';
import { EmployeeService } from '../../../../shared/services/employee.service';


@Component({
  selector: 'tenant-detail-form',
  templateUrl: './tenant-detail-form.component.html'
})
export class TenantDetailFormComponent implements OnInit {
  tenant: Tenant;
  tenant_id: number;
  isEdit: boolean;
  alert:any = '';
  selectedManager: Manager;
  constructor(private tenantService: TenantService, private route: ActivatedRoute,
    private employeeService: EmployeeService, private location: Location) {

  }

  submitted = false;

  onSubmit() { this.submitted = true; }

  ngOnInit() {
    // alert(this.tenant.tenant_name);
    this.alert = null;
    this.route.params.subscribe(params => {
      this.tenant_id = +params['id']; // (+) converts string 'id' to a number
      if(this.tenant_id > 0){
        //1. for Edit
        this.isEdit = true;
        this.tenantService.getTenantbyId(this.tenant_id).subscribe(result => {
          if (result.success === 1) {
            this.alert = { type: 'success', message: result.message}
            this.tenant = result.data;
            let managerResults = this.employeeService.cacheCandidateManagers.filter(e => { return e.employee_id == result.data.manager_id });
            if (managerResults.length > 0) {
              this.selectedManager = managerResults[0];
            }
          } else {
            // TODO:
            this.alert = {type: 'danger', message: result.message}
          }
        });
      }else{
        //2. for Addnew
        this.isEdit = false;
        this.tenant = {tenant_name: '', description: '', manager_id: null}
      }
      
    });
  }
  onChangeManager(selectedManager) {
    this.tenant.manager_id = selectedManager.employee_id;

  }
  updateTenant() {
    this.tenantService.updateTenant(this.tenant, this.tenant_id).subscribe(result=>{
      if(result.success === 1){
        
      }
    })
  }
  addTenant() {
    this.tenantService.addTenants(this.tenant).subscribe(result=>{
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
