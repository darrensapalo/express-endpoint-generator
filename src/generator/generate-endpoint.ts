import { zip, of, throwError } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators'
import {
    ReplaceFetchRoute,
    ReplaceDeleteRoute,
    ReplaceCreateRoute,
    ReplaceUpdateRoute,
    ReplaceListRoute
} from '@parser/replacements'
import { EndPointDefinition } from '@interfaces/endpoint'
import { GenerateSubRouter } from './generate-subroute'
import { GenerateGetRoute } from './route-fetch'
import { GenerateDeleteRoute } from './route-delete';
import { GenerateCreateRoute } from './route-create';
import { createFolder, writeFile } from './file-writer';
import path from 'path';
import R from 'ramda';
import {GenerateListRoute} from "@generator/route-list";
import {GenerateUpdateRoute} from "@generator/route-update";

function CreateSubrouteFolder(route: EndPointDefinition) {

    const folderPath = path.join(process.env.OUTPUT_DIR, route.serverSubFolder);

    return createFolder(folderPath)
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

    const listRoute = GenerateListRoute(route);

    const updateRoute = GenerateUpdateRoute(route);

    const subRoute = GenerateSubRouter(route);

    return CreateSubrouteFolder(route)
    .pipe(
        mergeMap(() => zip(subRoute, getRoute, createRoute, deleteRoute, listRoute, updateRoute)),
        map(result => {
            let subRoute = result[0];
            const getRoute = result[1];
            const createRoute = result[2];
            const deleteRoute = result[3];
            const listRoute = result[4];
            const updateRoute = result[5];
            
            subRoute = ReplaceFetchRoute(getRoute)(subRoute);
            subRoute = ReplaceDeleteRoute(deleteRoute)(subRoute);
            subRoute = ReplaceCreateRoute(createRoute)(subRoute);
            subRoute = ReplaceListRoute(listRoute)(subRoute);
            subRoute = ReplaceUpdateRoute(updateRoute)(subRoute);

            return subRoute
        }),
        mergeMap(R.curry(writeFile)(fileDestination))
    )
}
