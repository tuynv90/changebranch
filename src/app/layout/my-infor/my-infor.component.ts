import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { AppSettings } from '../../app.setting';

@Component({
  selector: 'app-my-infor',
  templateUrl: './my-infor.component.html',
  styleUrls: ['./my-infor.component.scss']
})
export class MyInforComponent implements OnInit {
  myInfo = {};
  isEdit: boolean = true;
  userLogin: Object;
  constructor(private employeeService: EmployeeService) {
    let userLocalStorage = localStorage.getItem(AppSettings.USER);
    if (userLocalStorage)
      this.userLogin = JSON.parse(userLocalStorage);
    console.log(this.userLogin);
    this.employeeService.getEmployeeById(this.userLogin['employee_id']).subscribe((result) => {
      this.myInfo = result['data'][0];
      console.log(this.myInfo)
    });
  }

  ngOnInit() {
  }
  changeState() {
    this.isEdit = this.isEdit ? false : true;
  }
  updateInfor() {
    let data = {
      'employee_name': this.myInfo['employee_name'],
      'email': this.myInfo['email'],
      'phone_number': this.myInfo['phone_number'],
      'jobgrade_id': this.myInfo['jobgrade_id'],
      'dept_id': this.myInfo['dept_id'],
      'birthday': this.myInfo['birthday'],
      'gender': this.myInfo['gender'] == 'male' ? 0 : 1
    }
    this.employeeService.updateEmployee(data, this.userLogin['employee_id']).subscribe(result => {
      if (result.success === 1) {
        console.log(true);
      }
    })
  }
}

