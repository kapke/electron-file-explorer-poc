import {Inject, EventEmitter, NgZone} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {FsToken, Fs} from "./Fs";


export class FileLister {
    constructor (
        private zone: NgZone,
        @Inject(FsToken) private fs: Fs) {
    }

    listDirectory (path: string): Observable<string[]> {
        //bindNodeCallback typings don't play well with that
        const files$ = new EventEmitter<string[]>();

        this.fs.readdir(path, (err, data) => {
            this.zone.run(() => {
                if (err) {
                    files$.error(err);
                } else {
                    files$.emit(data);
                }

                files$.complete();
            });
        });

        return files$;
    }
}
