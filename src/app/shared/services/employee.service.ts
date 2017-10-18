
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpParams } from "@angular/common/http";
import { ObtrHttpClient } from './obtr-http-client.service';
import { ResponseCandidateManager, Manager, Employee } from '../models/user-management';
import { AppSettings } from '../../app.setting';

@Injectable()
export class EmployeeService {
    constructor(private http: ObtrHttpClient) { };
    cacheCandidateManagers: Manager[];
    makeAPI = {
        getListCandidateManager: `${AppSettings.API_ENDPOINT}/employee/candidateManager`,
        getEmployeeById: `${AppSettings.API_ENDPOINT}/employee/@id`,
        updateEmployee: `${AppSettings.API_ENDPOINT}/employee/update/@id`,
    };
    getCandidateManager(): Observable<ResponseCandidateManager>{
        return this.http.get(this.makeAPI.getListCandidateManager);
    }
    getEmployeeById(id){
        return this.http.get(this.makeAPI.getEmployeeById.replace('@id',id.toString()));
    }
    updateEmployee(data, id){
        return this.http.put(this.makeAPI.updateEmployee.replace('@id', id), data);
    }
}