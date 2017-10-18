import { AppSettings } from 'app/app.setting';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem(AppSettings.TOKEN)) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
    
}
export class AlwaysAuthChildrenGuard implements CanActivateChild {
    constructor(private router: Router) { }
    canActivateChild() 
    {
        if (localStorage.getItem('role')==='admin') {
            return true;
        }
        this.router.navigate(['/dashboard']);
        return false;
    }
  }
