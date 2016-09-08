import {OpaqueToken} from "@angular/core";


interface Fs {
    readdir(path: string | Buffer, callback?: (err: NodeJS.ErrnoException, files: string[]) => void): void;
    readdirSync(path: string | Buffer): string[];
}

const FsToken = new OpaqueToken('fs');

export {Fs, FsToken};
