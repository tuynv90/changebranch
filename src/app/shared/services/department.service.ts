import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpParams } from "@angular/common/http";
import { ObtrHttpClient } from './obtr-http-client.service';
import { Department, ResponseApI, ResponseDetailDepartment } from '../models/department';
import { AppSettings } from '../../app.setting';

@Injectable()
export class DepartmentService {
    constructor(private http: ObtrHttpClient) { };

    makeAPI = {
        getListDepartment: `${AppSettings.API_ENDPOINT}/department?page=@page&perpage=@perpage`,
        getDepartmentById: `${AppSettings.API_ENDPOINT}/department/@id`,
        addDepartment: `${AppSettings.API_ENDPOINT}/department`,
        updateDepartment: `${AppSettings.API_ENDPOINT}/department/update/@id`,
        deleteDepartment: `${AppSettings.API_ENDPOINT}/department/delete/@id`
    };
   
    getDepartments(page, perpage): Observable<Response>{
        return this.http.get(this.makeAPI.getListDepartment
            .replace('@page', page.toString())
            .replace('@perpage', perpage.toString())
        );
    }
    addDepartments(department: Department): Observable<ResponseApI>{
        return this.http.post(this.makeAPI.addDepartment, department);
    }
    getDepartmentbyId(id): Observable<ResponseDetailDepartment>{
        return this.http.get(this.makeAPI.getDepartmentById.replace('@id', id));
    }
    updateDepartment(department: Department, id): Observable<ResponseApI>{
        return this.http.put(this.makeAPI.updateDepartment.replace('@id', id), department);
    }
    deleteDepartment(id): Observable<ResponseApI>{
        return this.http.put(this.makeAPI.deleteDepartment.replace('@id', id), {});
    }

    //get manager for department
    

}