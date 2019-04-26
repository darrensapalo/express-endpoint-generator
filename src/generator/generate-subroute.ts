import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import moment from 'moment'
import {
    ReplaceModelName,
    ReplaceTimestamp,
    ReplaceCreateFilename,
    ReplaceDeleteFilename,
    ReplaceGetFilename,
    ReplaceGetFunc,
    ReplaceDeleteFunc,
    ReplaceCreateFunc,
} from '@parser/replacements'
import { readFile } from '@parser/file-reader'
import { EndPointDefinition } from '@interfaces/endpoint'

/**
 * Emits the subrouter file contents.
 *
 * @param modelName The name of the model
 */
export function GenerateSubRouter(
    endpoint: EndPointDefinition
): Observable<string> {
    const timestamp = moment()

    return readFile('templates/subrouter.template.txt').pipe(
        map(ReplaceModelName(endpoint.modelName)),
        map(ReplaceTimestamp(timestamp.format('LLL'))),
        
        map(ReplaceGetFilename(endpoint.get.filename)),
        map(ReplaceCreateFilename(endpoint.create.filename)),
        map(ReplaceDeleteFilename(endpoint.delete.filename)),
        
        map(ReplaceGetFunc(endpoint.get.functionName)),
        map(ReplaceCreateFunc(endpoint.create.functionName)),
        map(ReplaceDeleteFunc(endpoint.delete.functionName))
    )
}
