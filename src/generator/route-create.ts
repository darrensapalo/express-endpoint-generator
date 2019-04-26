import { of } from 'rxjs'
import { map, mapTo, mergeMap } from 'rxjs/operators'
import { ReplaceModelName, ReplaceTimestamp } from '../parser/replacements'
import { EndPointDefinition } from '@interfaces/endpoint'
import { readFile } from '../parser/file-reader'
import moment = require('moment');
import R from 'ramda';
import { writeFile } from './file-writer';
import path from 'path';

/**
 * Generates the create route.
 * 
 * Emits a single string which is the route output.
 * 
 * **Note:**
 * If the route is disabled, it will emit an empty 
 * string and then complete the stream.
 * 
 * @param endpoint The definition of the end point
 */
export function GenerateCreateRoute(endpoint: EndPointDefinition) {
    
    if (endpoint.create.isDisabled === true)
        return of('');

    const fileDestination = path.join(process.env.OUTPUT_DIR, endpoint.serverSubFolder, `${endpoint.create.filename}.ts`);

    const routeOutput = `${endpoint.modelName}Routes.post("/", ${endpoint.create.functionName});`;

    const now = moment();

    const writeCreateRoute = readFile('templates/create.template.txt')
    .pipe(
        map(ReplaceModelName(endpoint.modelName)),
        map(ReplaceTimestamp(now.format("LLL"))),
        // Other transforms
        mergeMap(R.curry(writeFile)(fileDestination))
    )

    return writeCreateRoute.pipe(mapTo(routeOutput))
}
