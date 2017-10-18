import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { LandTransportService } from '../../shared/services/land-transport.service';
import { RequestService } from '../../shared/services/request.service';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  animations: [routerTransition()]
})
export class RequestComponent implements OnInit {

  constructor(private requestService: RequestService) {
    // if (!this.requestService.cacheCandidateRequest)
    //   this.requestService.getCandidateRequest().subscribe((result) => {
    //     this.requestService.cacheCandidateRequest = result.datas;
    //   })
  }

  ngOnInit() {
  }

}
