import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, ConnectionBackend, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.setting';

@Injectable()
export class ObtrHttpClient {
    constructor(private http: HttpClient, private router: Router, ) {
    }
    createAuthorizationHeader(): HttpHeaders {
        let token = localStorage.getItem(AppSettings.TOKEN);
        return new HttpHeaders().set('Authorization', token ? token : 'pham khanh toan');
    }

    public get(url): Observable<any> {

        return this.http.get(url,
            {
                headers: this.createAuthorizationHeader()
            }
        )
        // .map((res: Response) => {
        //     return res;
        // });
    }

    public post(url, data): Observable<any> {
        return this.http.post(url, data, {
            headers: this.createAuthorizationHeader()
        })
            // .map((res: Response) => {
            //     return res;
            // })
    }

    public put(url, data): Observable<any> {
        return this.http.put(url, data, {
            headers: this.createAuthorizationHeader()
        })
        // .map((res: Response) => {
        //     return res;
        // })
    }

    public delete(url): Observable<any> {
        return this.http.delete(url, {
            headers: this.createAuthorizationHeader()
        })
        // .map((res: Response) => {
        //     return res.json();
        // })
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
            if (error.status === 401) {
                localStorage.removeItem(AppSettings.TOKEN);
                this.router.navigate(['/login']);
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        // this.notify.error(errMsg);
        return Observable.throw(errMsg);
    }
}
