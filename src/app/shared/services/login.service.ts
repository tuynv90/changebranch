import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpParams } from "@angular/common/http";
import { AppSettings } from "../../app.setting";

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { };

    makeAPI = {
        login: `${AppSettings.API_ENDPOINT}/login`,

    };
    // getQuestionById():
    login(email, password): Observable<any> {
        return this.http.post(this.makeAPI.login, {email: email, password: password})
          
    }
}
