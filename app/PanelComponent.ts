import {Component, Input, OnInit} from "@angular/core";
import {FileLister} from "./FileLister";
import {Observable} from "rxjs";


@Component({
    selector: 'sg-panel',
    template: `
        <sg-address-bar [path]="path" (pathChange)="changePath($event)"></sg-address-bar>
        <sg-file-list [files]="files$ | async"></sg-file-list>
    `
})
export class PanelComponent implements OnInit {
    @Input() private path: string;

    private files$: Observable<string[]>;
    private fileLister: FileLister;

    constructor (fileLister: FileLister) {
        this.fileLister = fileLister;
    }

    ngOnInit (): void {
        this.updateFiles();
    }

    changePath (newPath: string) {
        this.path = newPath;
        this.updateFiles();
    }

    updateFiles () {
        this.files$ = this.fileLister.listDirectory(this.path);
    }
}
