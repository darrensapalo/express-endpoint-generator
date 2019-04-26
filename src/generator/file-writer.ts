import { Observable } from 'rxjs';
import fs from 'fs';

export function writeFile(filepath: string, data: string): Observable<string> {
    return new Observable<string>(subscriber => {
        fs.writeFile(filepath, data, { encoding: 'utf8' }, (err) => {

            if (err) {
                subscriber.error(err);
                return;
            }
            subscriber.next(filepath);
            subscriber.complete();
        });
        
    })
}