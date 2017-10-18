import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'app/router.animations';

@Component({
    selector: 'tc-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: [routerTransition()]
})
export class UserComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
