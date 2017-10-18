import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpParams } from "@angular/common/http";
import { ObtrHttpClient } from './obtr-http-client.service';
import { RequestInfor, ResponseCandidateRquest, ResponseApI, ResponseDetailRequest } from '../models/request';
import { AppSettings } from '../../app.setting';
import { ResponseDetailAir } from '../models/air-transport';
import { ResponseDetailOwn } from '../models/own-accommodation';
import { ResponseDetailHotel } from '../models/hotem-accommodation';
import { ResponseDetailMeal } from '../models/meal-allowance';
import { ResponseDetailDailyReport } from '../models/daily-report';

@Injectable()
export class RequestService {
    cacheCandidateRequest: RequestInfor[];
    constructor(private http: ObtrHttpClient) { };

    makeAPI = {
        getListRequest: `${AppSettings.API_ENDPOINT}/request?page=@page&perpage=@perpage&employee_id=@employee_id`,
        getRequestById: `${AppSettings.API_ENDPOINT}/request/@id`,
        addRequest: `${AppSettings.API_ENDPOINT}/request`,
        updateRequest: `${AppSettings.API_ENDPOINT}/request/update/@id`,
        deleteRequest: `${AppSettings.API_ENDPOINT}/request/delete/@id`,
        getListCandidateRequest: `${AppSettings.API_ENDPOINT}/request/`,
        addLandTransport: `${AppSettings.API_ENDPOINT}/landTransport`,
        addAirTransport: `${AppSettings.API_ENDPOINT}/airTransport`,
        getAirTransportById : `${AppSettings.API_ENDPOINT}/airTransport/@id`,
        addOwnTransport: `${AppSettings.API_ENDPOINT}/ownAccomadation`,
        getOwnById : `${AppSettings.API_ENDPOINT}/ownAccomadation/@id`,
        addHotelAccom : `${AppSettings.API_ENDPOINT}/hotelAccomadation`,
        getHotelById: `${AppSettings.API_ENDPOINT}/hotelAccomadation/@id`,
        addMealAccom : `${AppSettings.API_ENDPOINT}/mealAccomadation`,
        getMealById: `${AppSettings.API_ENDPOINT}/mealAccomadation/@id`,
        addDaily : `${AppSettings.API_ENDPOINT}/daily`,
        getDailyById: `${AppSettings.API_ENDPOINT}/daily/@id`,
    };
    getCandidateRequest(): Observable<ResponseCandidateRquest>{
        return this.http.get(this.makeAPI.getListCandidateRequest);
    }
    getMyRequests(page, perpage,employee_id): Observable<Response>{
        return this.http.get(this.makeAPI.getListRequest
            .replace('@page', page.toString())
            .replace('@perpage', perpage.toString())
            .replace('@employee_id',employee_id.toString())
        );
    }
    addRequests(request: RequestInfor): Observable<ResponseApI>{
        return this.http.post(this.makeAPI.addRequest, request);
    }
    addLandTransport(data){
        return this.http.post(this.makeAPI.addLandTransport, data);
    }
    addAirTransport(data){
        return this.http.post(this.makeAPI.addAirTransport, data);
    }
    addOWnTransport(data){
        return this.http.post(this.makeAPI.addOwnTransport, data);
    }
    addHotelAccom(data){
        return this.http.post(this.makeAPI.addHotelAccom, data);
    }
    addMeallAccom(data){
        return this.http.post(this.makeAPI.addMealAccom, data);
    }
    addDaily(data){
        return this.http.post(this.makeAPI.addDaily, data);
    }
    getDailybyId(id): Observable<ResponseDetailDailyReport>{
        return this.http.get(this.makeAPI.getDailyById.replace('@id', id));
    }
    getMealAccombyId(id): Observable<ResponseDetailMeal>{
        return this.http.get(this.makeAPI.getMealById.replace('@id', id));
    }
    getHotelAccom(id): Observable<ResponseDetailHotel>{
        return this.http.get(this.makeAPI.getHotelById.replace('@id', id));
    }
    getOwnbyId(id): Observable<ResponseDetailOwn>{
        return this.http.get(this.makeAPI.getOwnById.replace('@id', id));
    }
    getAirTransportbyId(id): Observable<ResponseDetailAir>{
        return this.http.get(this.makeAPI.getAirTransportById.replace('@id', id));
    }
    getRequestbyId(id): Observable<ResponseDetailRequest>{
        return this.http.get(this.makeAPI.getRequestById.replace('@id', id));
    }
    updateRequest(request: RequestInfor, id): Observable<ResponseApI>{
        return this.http.put(this.makeAPI.updateRequest.replace('@id', id), request);
    }
    deleteRequest(id): Observable<ResponseApI>{
        return this.http.put(this.makeAPI.deleteRequest.replace('@id', id), {});
    }
}