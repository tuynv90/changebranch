import { Component, OnInit } from '@angular/core';
// import { AppSettings } from './app/app.setting';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestInfor } from '../../../shared/models/request';
import { AppSettings } from '../../../app.setting';
import { RequestService } from '../../../shared/services/request.service';
import { StatusType } from '../../../shared/enums/status.enum';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requestInfor: RequestInfor[];
  //for paging
  totalItems: number = 100;
  perpage: number = AppSettings.PER_PAGE;
  page: number = AppSettings.PAGE;
  userLogin:Object;
  statusType = StatusType;
  constructor(
      private requestService: RequestService,
      private modalService: NgbModal,
      private router: Router,
  ) {
    let userLocalStorage = localStorage.getItem(AppSettings.USER);
    if (userLocalStorage)
      this.userLogin = JSON.parse(userLocalStorage);
  }

  ngOnInit() {
      this.requestService.getMyRequests(this.page, this.perpage, this.userLogin['employee_id']).subscribe(result => {
          if (result['success'] === 1) {
              this.requestInfor = result['datas'];
              this.totalItems = result['rows'];
          }
      })
    // this.requestInfor = this.requestService.cacheCandidateRequest.filter(x=>{
    //     x.employee_id = this.userLogin['employee_id'];
    // })
      console.log(this.requestInfor);
  }
  editRequest(id) {
      let link = ['page/request/detail', id];
      this.router.navigate(link);

  }
  deleted(id) {
      this.requestService.deleteRequest(id).subscribe(result => {
          if (result.success === 1) {
              alert(result.message);
              this.requestInfor = this.requestInfor.filter(t => {
                  return t.trip_id != id;
              });
          } else {
              //TODO: 
          }
      })
  }
  loadPage(page) {
      this.requestService.getMyRequests(page, this.perpage,this.userLogin['employee_id']).subscribe(result => {
          if (result['success'] === 1) {
              this.requestInfor = result['data'];
          }
      })
  }

}
