
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Constants, RSAGlobal } from './../../app.common';
import { Http, Headers, Response, ConnectionBackend, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';
import { AppSettings } from '../../app.setting';
/**
 * client will parse to json and process response when receive this status code
 */
const ALLOWED_STATUS = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 304];
/**
 * client will redirect to login screen when receive this status code
 */
const UNAUTHEN_STATUS = [401, 403];
/**
 * client will have special notification when receive this status code
 */
const SERVER_ERROR_STATUS = 500;
/**
 * client will retry the request after 3 second
 */
const TIMEOUT_STATUS = 408;
const BAD_REQUEST_STATUS = 400;
const ERROR_RESPONSE = {
    success: 0,
    message: 'Server error'
};
const UNAUTHEN_RESPONSE = {
    success: 0,
    message: 'Your session is expired, please login to use system!'
};
const BAD_REQUEST_RESPONSE = {
    success: 0,
    message: 'Your session is expired, please login to use system!'
};
@Injectable()
export class ObtrHttp {
    apiList: any = [];
    listPermission: any = [];
    readonly IS_NEED_AUTHEN = true;
    constructor(private http: Http, private global: RSAGlobal,
        private constant: Constants, private router: Router, private notify: NotifyService) {
    }
    createAuthorizationHeader(): Headers {
        let token = localStorage.getItem(AppSettings.TOKEN);
        let headers = new Headers({
            'Authorization': token,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
        });
        return headers;
    }
    /**
     * custom get for http
     * step :
     * - if request is not "error response" (4xx or 5xx) -> map it response to json
     * - if request is not "error response" and not in allowed status -> throw it to catch
     * - if request is "error response" -> jump to catch and handle based on status code
     * - if request is "error response" and response has status 408 (request time out) -> retry again after 3s
     * - if request is "error response" and response has status 401,403(Unauthorized, Forbidden) -> redirect to login screen
     * @param url 
     */
    public get(url): Observable<any> {
        return this.http.get(url, {
            headers: this.createAuthorizationHeader()
        }).map((res: Response) => {
            if (ALLOWED_STATUS.indexOf(res.status) !== -1) {
                return res.json();
            }
            throw res;
        }).catch((error) => {
            if (error.status === TIMEOUT_STATUS) {
                throw error;
            }
            if (error.status === SERVER_ERROR_STATUS) {
                return Observable.of(JSON.stringify(ERROR_RESPONSE));
            }
            if (error.status === BAD_REQUEST_STATUS) {
                return Observable.of(error.json().message);
            }
            if (UNAUTHEN_STATUS.indexOf(error.status) !== -1) {
                localStorage.removeItem(AppSettings.TOKEN);
                this.notify.error(UNAUTHEN_RESPONSE.message);
                this.router.navigate([this.constant.LOGIN]);
                return Observable.empty();
            }
            return Observable.empty();
        }).retryWhen((error) => error.do(() => {
            console.log('DEV : request time out, try again after 3 second');
        }).delayWhen(() => Observable.timer(3000)));
    }

    public post(url, data): Observable<any> {
        return this.http.post(url, data, {
            headers: this.createAuthorizationHeader()
        }).map((res: Response) => {
            if (ALLOWED_STATUS.indexOf(res.status) !== -1) {
                return res.json();
            }
            throw res;
        }).catch((error) => {
            if (error.status === TIMEOUT_STATUS) {
                throw error;
            }
            if (error.status === SERVER_ERROR_STATUS) {
                return Observable.of(JSON.stringify(ERROR_RESPONSE));
            }
            if (error.status === BAD_REQUEST_STATUS) {
                return Observable.of(error.json().message);
            }
            if (UNAUTHEN_STATUS.indexOf(error.status) !== -1) {
                localStorage.removeItem(AppSettings.TOKEN);
                this.notify.error(UNAUTHEN_RESPONSE.message);
                this.router.navigate([this.constant.LOGIN]);
                return Observable.empty();
            }
            return Observable.empty();
        }).retryWhen((error) => error.do(() => {
            console.log('DEV : request time out, try again after 3 second');
        }).delayWhen(() => Observable.timer(3000)));
    }

    public put(url, data): Observable<any> {
        return this.http.put(url, data, {
            headers: this.createAuthorizationHeader()
        }).map((res: Response) => {
            if (ALLOWED_STATUS.indexOf(res.status) !== -1) {
                return res.json();
            }
            throw res;
        }).catch((error) => {
            if (error.status === TIMEOUT_STATUS) {
                throw error;
            }
            if (error.status === SERVER_ERROR_STATUS) {
                return Observable.of(JSON.stringify(ERROR_RESPONSE));
            }
            if (error.status === BAD_REQUEST_STATUS) {
                return Observable.of(error.json().message);
            }
            if (UNAUTHEN_STATUS.indexOf(error.status) !== -1) {
                localStorage.removeItem(AppSettings.TOKEN);
                this.notify.error(UNAUTHEN_RESPONSE.message);
                this.router.navigate([this.constant.LOGIN]);
                return Observable.empty();
            }
            return Observable.empty();
        }).retryWhen((error) => error.do(() => {
            console.log('DEV : request time out, try again after 3 second');
        }).delayWhen(() => Observable.timer(3000)));
    }

    public delete(url): Observable<any> {
        return this.http.delete(url, {
            headers: this.createAuthorizationHeader()
        }).map((res: Response) => {
            if (ALLOWED_STATUS.indexOf(res.status) !== -1) {
                return res.json();
            }
            throw res;
        }).catch((error) => {
            if (error.status === TIMEOUT_STATUS) {
                throw error;
            }
            if (error.status === SERVER_ERROR_STATUS) {
                return Observable.of(JSON.stringify(ERROR_RESPONSE));
            }
            if (error.status === BAD_REQUEST_STATUS) {
                return Observable.of(error.json().message);
            }
            if (UNAUTHEN_STATUS.indexOf(error.status) !== -1) {
                localStorage.removeItem(AppSettings.TOKEN);
                this.notify.error(UNAUTHEN_RESPONSE.message);
                this.router.navigate([this.constant.LOGIN]);
                return Observable.empty();
            }
            return Observable.empty();
        }).retryWhen((error) => error.do(() => {
            console.log('DEV : request time out, try again after 3 second');
        }).delayWhen(() => Observable.timer(3000)));
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
            if (error.status === 401) {
                localStorage.removeItem(AppSettings.TOKEN);
                this.router.navigate([this.constant.LOGIN]);
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.notify.error(errMsg);
        return Observable.throw(errMsg);
    }
}
