import { zip } from 'rxjs'
import { map } from 'rxjs/operators'
import {
    ReplaceCreateFilename,
    ReplaceDeleteFilename,
    ReplaceGetFilename,
    ReplaceGetRoute,
    ReplaceDeleteRoute,
    ReplaceCreateRoute,
} from '../parser/replacements'
import { EndPointDefinition } from '@interfaces/endpoint'
import { GenerateSubRouter } from './generate-subroute'
import { GenerateGetRoute } from './route-get'
import { GenerateDeleteRoute } from './route-delete';
import { GenerateCreateRoute } from './route-create';

export function GenerateEndPoint(route: EndPointDefinition) {

    const getRoute = GenerateGetRoute(route);
    
    const deleteRoute = GenerateDeleteRoute(route);

    const createRoute = GenerateCreateRoute(route);

    const subRoute = GenerateSubRouter(route.modelName)
    .pipe(
        map(ReplaceCreateFilename(route.create.filename)),
        map(ReplaceDeleteFilename(route.delete.filename)),
        map(ReplaceGetFilename(route.get.filename))
    )

    return zip(subRoute, getRoute, createRoute, deleteRoute)
    .pipe(
        map(result => {
            let subRoute = result[0]
            const getRoute = result[1]
            const createRoute = result[2]
            const deleteRoute = result[3]
            
            subRoute = ReplaceGetRoute(getRoute)(subRoute)
            subRoute = ReplaceDeleteRoute(deleteRoute)(subRoute)
            subRoute = ReplaceCreateRoute(createRoute)(subRoute)

            return subRoute
        })
    )
}
