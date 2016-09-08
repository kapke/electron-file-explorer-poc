import { Component, Input } from '@angular/core';

@Component({
    selector: 'sg-file-list',
    template: `
        <sg-file-entry *ngFor="let file of files" [file]="file"></sg-file-entry>
    `
})
export class FileListComponent {
    @Input() public files: string[] = [];
}
