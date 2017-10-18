import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'app/router.animations';

@Component({
    selector: 'tc-jobgrade',
    templateUrl: './jobgrade.component.html',
    styleUrls: ['./jobgrade.component.scss'],
    animations: [routerTransition()]
})
export class JobgradeComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
