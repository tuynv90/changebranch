import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { AppSettings } from '../../../app.setting';


@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {
  listTrips: any;
  listPending: {}[] = [];
  listApproved: {}[] = [];
  listRejected: {}[] = [];
  //for paging
  totalItems: number = 100;
  perpage: number = 10;
  page: number = AppSettings.PAGE;
  userLogin: Object;
  constructor(private dashboardService: DashboardService, ) {
    let userLocalStorage = localStorage.getItem(AppSettings.USER);
    if (userLocalStorage)
      this.userLogin = JSON.parse(userLocalStorage);
  }

  ngOnInit() {
    this.dashboardService.getMyTrips(this.page, this.perpage, this.userLogin['employee_id']).subscribe(result => {
      if (result['success'] === 1) {
        this.listTrips = result['datas'];
        this.totalItems = result['rows'];
        this.setData()
      }
    })
  }

  setData() {
    this.listTrips.forEach(element => {
      if (element.status == 0) {
        this.listPending.push(element)
      } else if (element.status == 1) {
        this.listApproved.push(element)
      } else if (element.status == 2) {
        this.listRejected.push(element)
      }
    });
  }

  loadPage(page) {
    this.dashboardService.getMyTrips(page, this.perpage, this.userLogin['employee_id']).subscribe(result => {
      if (result['success'] === 1) {
        this.listTrips = result['data'];
      }
    })
  }
}
