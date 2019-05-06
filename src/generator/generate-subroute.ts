import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import moment from 'moment'
import {
    ReplaceModelName,
    ReplaceTimestamp,
    ReplaceCreateFilename,
    ReplaceDeleteFilename,
    ReplaceFetchFilename,
    ReplaceListFilename,
    ReplaceUpdateFilename,
    ReplaceFetchFunc,
    ReplaceDeleteFunc,
    ReplaceCreateFunc,
    ReplaceListFunc,
    ReplaceUpdateFunc,
} from '@parser/replacements'
import { readFile } from '@parser/file-reader'
import { EndPointDefinition } from '@interfaces/endpoint'

/**
 * Emits the subrouter file contents.
 *
 * @param endpoint
 */
export function GenerateSubRouter(
    endpoint: EndPointDefinition
): Observable<string> {
    const timestamp = moment();

    return readFile('templates/subrouter.template.txt').pipe(
        map(ReplaceModelName(endpoint.modelName)),
        map(ReplaceTimestamp(timestamp.format('LLL')))
    )
        .pipe(
            map(ReplaceFetchFilename(endpoint.fetch.filename)),
            map(ReplaceCreateFilename(endpoint.create.filename)),
            map(ReplaceDeleteFilename(endpoint.delete.filename)),
            map(ReplaceListFilename(endpoint.list.filename)),
            map(ReplaceUpdateFilename(endpoint.update.filename)),

        )
        .pipe(
            map(ReplaceFetchFunc(endpoint.fetch.functionName)),
            map(ReplaceCreateFunc(endpoint.create.functionName)),
            map(ReplaceDeleteFunc(endpoint.delete.functionName)),
            map(ReplaceListFunc(endpoint.list.functionName)),
            map(ReplaceUpdateFunc(endpoint.update.functionName))
        )

}
