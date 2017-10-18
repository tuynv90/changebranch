
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpParams } from "@angular/common/http";

import { RequestInfor, ResponseCandidateRquest, ResponseApI, ResponseDetailRequest } from '../models/request';
import { ObtrHttpClient } from './obtr-http-client.service';
import { AppSettings } from '../../app.setting';

@Injectable()
export class DashboardService {
    cacheCandidateTenants: RequestInfor[];
    constructor(private http: ObtrHttpClient) { };

    makeAPI = {
        getListTrips: `${AppSettings.API_ENDPOINT}/request?page=@page&perpage=@perpage&employee_id=@employee_id`,
    };
    getMyTrips(page, perpage, employee_id): Observable<Response> {
        return this.http.get(this.makeAPI.getListTrips
            .replace('@page', page.toString())
            .replace('@perpage', perpage.toString())
            .replace('@employee_id', employee_id.toString())
        );
    }
}