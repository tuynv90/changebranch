import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'app/router.animations';

@Component({
    selector: 'tc-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
    animations: [routerTransition()]
})
export class RoleComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
