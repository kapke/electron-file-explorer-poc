import * as fs from 'fs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppComponent} from "./AppComponent";
import {FileLister} from "./FileLister";
import {FileListComponent} from "./FileListComponent";
import {FileEntryComponent} from "./FileEntryComponent";
import {FsToken} from "./Fs";
import {ZoneFs} from "./ZoneFs";
import {PanelComponent} from "./PanelComponent";
import {AddressBarComponent} from "./AddressBarComponent";


@NgModule({
    declarations: [AppComponent, FileListComponent, FileEntryComponent, PanelComponent, AddressBarComponent],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent],
    providers: [
        {provide: 'raw-fs', useValue: fs},
        {provide: FsToken, useClass: ZoneFs},
        FileLister
    ]
})
export class AppModule {}
