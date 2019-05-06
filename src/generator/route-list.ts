import { of } from 'rxjs'
import { map, mapTo, mergeMap } from 'rxjs/operators'
import { ReplaceModelName, ReplaceTimestamp } from '@parser/replacements';
import { EndPointDefinition } from '@interfaces/endpoint'
import { readFile } from '@parser/file-reader'
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
export function GenerateListRoute(endpoint: EndPointDefinition) {

    if (endpoint.list.isDisabled === true)
        return of('');

    const fileDestination = path.join(process.env.OUTPUT_DIR, endpoint.serverSubFolder, `${endpoint.list.filename}.ts`);

    const routeOutput = `${endpoint.modelName}Routes.get("/", ${endpoint.list.functionName});`;

    const now = moment();

    const writeListRoute = readFile('templates/list.template.txt')
        .pipe(
            map(ReplaceModelName(endpoint.modelName)),
            map(ReplaceTimestamp(now.format("LLL"))),
            // Other transforms
            mergeMap(R.curry(writeFile)(fileDestination))
        );

    return writeListRoute.pipe(mapTo(routeOutput))
}


