import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import moment from 'moment'
import { ReplaceModelName, ReplaceTimestamp } from '@parser/replacements'
import { readFile } from '@parser/file-reader'

/**
 * Emits the subrouter file contents.
 *
 * @param modelName The name of the model
 */
export function GenerateSubRouter(modelName: string): Observable<string> {
    const timestamp = moment();

    return readFile('templates/subrouter.template.txt')
    .pipe(
        map(ReplaceModelName(modelName)),
        map(ReplaceTimestamp(timestamp.format('LLL')))
    )
}
