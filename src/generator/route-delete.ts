import { of } from 'rxjs'
import { map, mapTo, mergeMap } from 'rxjs/operators'
import { ReplaceModelName, ReplaceTimestamp } from '../parser/replacements'
import { EndPointDefinition } from '@interfaces/endpoint'
import { readFile } from '../parser/file-reader'
import moment = require('moment');
import R from 'ramda';
import { writeFile } from './file-writer';

/**
 * Generates the delete route.
 * 
 * Emits a single string which is the route output.
 * 
 * **Note:**
 * If the route is disabled, it will emit an empty 
 * string and then complete the stream.
 * 
 * @param endpoint The definition of the end point
 */
export function GenerateDeleteRoute(endpoint: EndPointDefinition) {
    
    if (endpoint.delete.isDisabled === true)
        return of('');

    const fileDestination = `${process.env.OUTPUT_DIR}${endpoint.delete.filename}.ts`

    const routeOutput = `${endpoint.modelName}Routes.delete("/:identifier", delete${endpoint.modelName});`;

    const now = moment();

    const writeDeleteRoute = readFile('templates/delete.template.txt')
    .pipe(
        map(ReplaceModelName(endpoint.modelName)),
        map(ReplaceTimestamp(now.format("LLL"))),
        // Other transforms
        mergeMap(R.curry(writeFile)(fileDestination))
    )

    return writeDeleteRoute.pipe(mapTo(routeOutput))
}
