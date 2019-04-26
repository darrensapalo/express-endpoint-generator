import { Observable } from 'rxjs';
import fs from 'fs';

export function readFile(filepath: string) {
    return new Observable<string>(subscriber => {
        fs.readFile(`./src/${filepath}`, "utf8", (err, data) => {

            if (err) {
                subscriber.error(err);
                return;
            }

            subscriber.next(data);
            subscriber.complete();

        });
    })
}