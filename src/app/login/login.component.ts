import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../shared/services/login.service";
import { routerTransition } from '../router.animations';
import { HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from "../app.setting";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[routerTransition()]
})
export class LoginComponent implements OnInit {

  email: string = '';
    password: string = '';
    alert: any = null;
    constructor(public router: Router, private loginService: LoginService) {
    }

    ngOnInit() {
    }

    onLoggedin() {
        this.loginService.login(this.email, this.password).subscribe(
            (data) => {
                if (data.success === 1) {
                    // Reach here if res.status >= 200 && <= 299
                    localStorage.setItem(AppSettings.TOKEN, data.access_token);
                    localStorage.setItem(AppSettings.USER, JSON.stringify(data.user));
                    this.router.navigate(['/']);
                }else{
                    // alert('An error occurred:' + data.message);
                    this.alert = {
                        type: 'danger',
                        message: data.message
                      }
                    
                }
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    // alert('An error occurred:' + err.error.message);
                    this.alert = {
                        type: 'danger',
                        message: 'An error occurred:' + err.error.message
                      }
                } 
                else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    // alert(`Backend returned code ${err.status}, body was: ${err.error.message}`);
                    this.alert = {
                        type: 'danger',
                        message: `Backend returned code ${err.status}, body was: ${err.error.message}`
                      }
                }
            }
        )
    }
    closeAlert() {
        this.alert = null;
    }
    onKey(event: any) { // without type info
        // this.values += event.target.value + ' | ';
        this.alert = null;
    }

}

