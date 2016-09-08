import {Component, NgZone} from '@angular/core';


@Component({
    selector: 'sg-app',
    template: `
        <sg-panel [path]="'/'"></sg-panel>
        <sg-panel [path]="'/'"></sg-panel>
    `,
    styles: [`
        :host {
            font-family: "Helvetica Neue", Arial, sans-serif;
            display: flex;
            flex-direction: row;
            min-height: 100vh;
        }
        sg-panel {
            flex-grow: 1;
            border: none;
            border-left: 1px solid black;
            border-right: 1px solid black;
        }
    `]
})
export class AppComponent {
    constructor () {
    }
}
