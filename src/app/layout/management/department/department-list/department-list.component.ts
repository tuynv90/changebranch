import { AppSettings } from './../../../../app.setting';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../shared/models/department';
import { DepartmentService } from '../../../../shared/services/department.service';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[];
  //for paging
  totalItems: number = 100;
  perpage: number = AppSettings.PER_PAGE;
  page: number = AppSettings.PAGE;
  constructor(
      private deptService: DepartmentService,
      private modalService: NgbModal,
      private router: Router,
  ) {
  }

  ngOnInit() {
      this.deptService.getDepartments(this.page, this.perpage).subscribe(result => {
          if (result['success'] === 1) {
              this.departments = result['data'];
              console.log(this.departments);
              this.totalItems = result['rows'];
          }
      })
      console.log(this.departments);
  }
  editDepartment(id) {
      let link = ['page/department/detail', id];
      this.router.navigate(link);
  }
  deleted(id) {
      this.deptService.deleteDepartment(id).subscribe(result => {
          if (result.success === 1) {
              alert(result.message);
              this.departments = this.departments.filter(t => {
                  return t.dept_id != id;
              });
          } else {
              //TODO: 
          }
      })
    
  }
  loadPage(page) {
      this.deptService.getDepartments(page, this.perpage).subscribe(result => {
          if (result['success'] === 1) {
              this.departments = result['data'];
          }
      })
  }
}

