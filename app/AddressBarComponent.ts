import {Component, Input, Output, EventEmitter} from "@angular/core";


@Component({
    selector: 'sg-address-bar',
    template: `
        <input #input type="text" [value]="path" (keyup)="changePath(input.value)" />
    `
})
export class AddressBarComponent {
    @Input() path: string;
    @Output() pathChange = new EventEmitter<string>();

    changePath (newPath: string) {
        this.path = newPath;
        this.pathChange.emit(newPath);
    }
}
