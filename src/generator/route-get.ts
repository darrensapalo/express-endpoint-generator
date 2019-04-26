import { of, empty } from 'rxjs'
import { map, mapTo, mergeMap } from 'rxjs/operators'
import { ReplaceModelName, ReplaceTimestamp } from '../parser/replacements'
import { EndPointDefinition } from '@interfaces/endpoint'
import { readFile } from '../parser/file-reader'
import { writeFile } from './file-writer';
import R from 'ramda';
import moment = require('moment');
import path from 'path';

/**
 * Generates the get route.
 * 
 * Emits a single string which is the route output.
 * 
 * **Note:**
 * If the route is disabled, it will emit an empty 
 * string and then complete the stream.
 * 
 * @param endpoint The definition of the end point
 */
export function GenerateGetRoute(endpoint: EndPointDefinition) {
    
    if (endpoint.get.isDisabled === true)
        return of('');

    const fileDestination = path.join(process.env.OUTPUT_DIR, endpoint.serverSubFolder, `${endpoint.get.filename}.ts`);

    const routeOutput = `${endpoint.modelName}Routes.get("/:identifier", ${endpoint.get.functionName});`;

    const now = moment();

    const writeGetRoute = readFile('templates/get.template.txt')
    .pipe(
        map(ReplaceModelName(endpoint.modelName)),
        map(ReplaceTimestamp(now.format("LLL"))),
        // Other transforms
        mergeMap(R.curry(writeFile)(fileDestination))
    )

    return writeGetRoute.pipe(mapTo(routeOutput))
}
