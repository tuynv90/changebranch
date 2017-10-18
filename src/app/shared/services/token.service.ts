// export 
// createAuthorizationHeader(): Headers {
//     let token = localStorage.getItem(AppSettings.TOKEN);
//     let headers = new Headers({
//         'Authorization': token,
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': 0
//     });
//     return headers;
// }

import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.setting';

declare var toastr: any;
@Injectable()
export class TokenService {

    constructor() {    
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

}