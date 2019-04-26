import { zip, of, throwError } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators'
import {
    ReplaceGetRoute,
    ReplaceDeleteRoute,
    ReplaceCreateRoute,
} from '../parser/replacements'
import { EndPointDefinition } from '@interfaces/endpoint'
import { GenerateSubRouter } from './generate-subroute'
import { GenerateGetRoute } from './route-get'
import { GenerateDeleteRoute } from './route-delete';
import { GenerateCreateRoute } from './route-create';
import { createFolder, writeFile } from './file-writer';
import path from 'path';
import R from 'ramda';

function CreateSubrouteFolder(route: EndPointDefinition) {
    return createFolder(path.join(process.env.OUTPUT_DIR, route.serverSubFolder))
        .pipe(
            catchError(err => {
                if (err.message.includes("file already exists"))
                    return of({});
                
                return throwError(err);
            })
        );
}

export function GenerateEndPoint(route: EndPointDefinition) {

    const fileDestination = path.join(process.env.OUTPUT_DIR, route.serverSubFolder, `${route.modelName.toLowerCase()}.ts`);

    const getRoute = GenerateGetRoute(route);
    
    const deleteRoute = GenerateDeleteRoute(route);

    const createRoute = GenerateCreateRoute(route);

    const subRoute = GenerateSubRouter(route);

    return CreateSubrouteFolder(route)
    .pipe(
        mergeMap(() => zip(subRoute, getRoute, createRoute, deleteRoute)),
        map(result => {
            let subRoute = result[0]
            const getRoute = result[1]
            const createRoute = result[2]
            const deleteRoute = result[3]
            
            subRoute = ReplaceGetRoute(getRoute)(subRoute)
            subRoute = ReplaceDeleteRoute(deleteRoute)(subRoute)
            subRoute = ReplaceCreateRoute(createRoute)(subRoute)

            return subRoute
        }),
        mergeMap(R.curry(writeFile)(fileDestination))
    )
}
