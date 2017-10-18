
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpParams } from "@angular/common/http";
import { ObtrHttpClient } from './obtr-http-client.service';
import { Tenant, ResponseApI, ResponseDetailTenant, ResponseCandidateTenant } from '../models/tenant';
import { AppSettings } from '../../app.setting';

@Injectable()
export class TenantService {
    cacheCandidateTenants: Tenant[];
    constructor(private http: ObtrHttpClient) { };

    makeAPI = {
        getListTenant: `${AppSettings.API_ENDPOINT}/tenant?page=@page&perpage=@perpage`,
        getTenentById: `${AppSettings.API_ENDPOINT}/tenant/@id`,
        addTenent: `${AppSettings.API_ENDPOINT}/tenant`,
        updateTenant: `${AppSettings.API_ENDPOINT}/tenant/update/@id`,
        deleteTenant: `${AppSettings.API_ENDPOINT}/tenant/delete/@id`,
        getListCandidateTenant: `${AppSettings.API_ENDPOINT}/tenant/candidateTenant`
    };
    getCandidateTenant(): Observable<ResponseCandidateTenant>{
        return this.http.get(this.makeAPI.getListCandidateTenant);
    }
    getTenants(page, perpage): Observable<Response>{
        return this.http.get(this.makeAPI.getListTenant
            .replace('@page', page.toString())
            .replace('@perpage', perpage.toString())
        );
    }
    addTenants(tenant: Tenant): Observable<ResponseApI>{
        return this.http.post(this.makeAPI.addTenent, tenant);
    }
    getTenantbyId(id): Observable<ResponseDetailTenant>{
        return this.http.get(this.makeAPI.getTenentById.replace('@id', id));
    }
    updateTenant(tenant: Tenant, id): Observable<ResponseApI>{
        return this.http.put(this.makeAPI.updateTenant.replace('@id', id), tenant);
    }
    deleteTenant(id): Observable<ResponseApI>{
        return this.http.put(this.makeAPI.deleteTenant.replace('@id', id), {});
    }

    //get manager for tenant
    

}