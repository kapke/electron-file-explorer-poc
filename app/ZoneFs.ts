import {Fs} from "./Fs";
import {NgZone, Inject} from "@angular/core";


export class ZoneFs implements Fs {
    constructor(
        private zone: NgZone,
        @Inject('raw-fs') private fs: Fs
    ) {}


    public readdir(path: string|Buffer, callback?: (err: NodeJS.ErrnoException, files: string[])=>void): void {
        this.fs.readdir(path, (err, files) => {
            this.zone.run(() => {
                callback(err, files);
            });
        });
    }

    public readdirSync(path: string|Buffer): string[] {
        return this.fs.readdirSync(path);
    }
}
