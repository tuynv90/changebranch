// import { UserModel } from './register/register.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class Constants {
	readonly keyStore = {
		CURRENT_USER: 'currentUser',
		KEEP_LOGIN: 'keepLogin',
		USER_NAME: 'userName',
		USER_ID: 'userId',
		LIST_PERMISSION: 'list',
		NAV_STATIC: 'nav-static'
	};
	
	readonly notifyNumber = {
		NOTIFY_NUMBER: 'notifyNumber'
	};
	readonly countNotification = {
		COUNT_NOTIFICATION: 'count'
	};
	readonly DASHBOARD = '/app/dashboard';
	readonly LOGIN = '/login';
	readonly API_URL = 'http://10.0.0.68:3000';
	readonly API_MOBILE_URL = 'http://10.0.0.68:5555';
}
@Injectable()
export class RSAGlobal {
	// user: UserModel;
	currentUrl: string;
	notifyCount = 0;
	unassignedCaseCount = 0;
	unassignedCaseReload = new Subject();
	unassignedCaseReloadSubscribed = false;
	userName: string;
	userAva: string;
}
