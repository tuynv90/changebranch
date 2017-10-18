
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpParams } from "@angular/common/http";

import { Department, ResponseApI, ResponseDetailDepartment } from '../models/department';
import { ObtrHttpClient } from './obtr-http-client.service';
import { AppSettings } from '../../app.setting';
import { ResponseDetailLand } from '../models/land-transport';

@Injectable()
export class LandTransportService {
    cacheCandidateVehicle:{}[];
    makeAPI = {
        getListLandTranport: `${AppSettings.API_ENDPOINT}/landTransport?page=@page&perpage=@perpage`,
        getLandById: `${AppSettings.API_ENDPOINT}/landTransport/@id`,
        addDepartment: `${AppSettings.API_ENDPOINT}/landTransport`,
        updateDepartment: `${AppSettings.API_ENDPOINT}/landTransport/update/@id`,
        deleteDepartment: `${AppSettings.API_ENDPOINT}/landTransport/delete/@id`,
        getLandVehicles : `${AppSettings.API_ENDPOINT}/vehicle`,
    };
    constructor(private http: ObtrHttpClient) { };

    getLandVehicles(){
        return this.http.get(this.makeAPI.getLandVehicles);
    }
   
    getLandbyId(id): Observable<ResponseDetailLand>{
        return this.http.get(this.makeAPI.getLandById.replace('@id', id));
    }
    

}