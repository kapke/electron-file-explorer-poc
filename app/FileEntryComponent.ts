import { Component, Input } from '@angular/core';


@Component({
    selector: 'sg-file-entry',
    template: `
        <div>{{ file }}</div>
    `,
    styles: [`
        :host {
            display: block;
            border-bottom: 1px solid black;
            padding: 0.5em;
        }
    `]
})
export class FileEntryComponent {
    @Input() public file: string;
}
