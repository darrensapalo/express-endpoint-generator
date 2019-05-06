export interface RouteDefinition {
    filename: string
    functionName: string
    isDisabled?: boolean
    filterPrimaryKeyOnRequestMapper?: boolean
}

export class EndPointDefinition {
    constructor(public modelName: string, public serverSubFolder: string) {
        
    }

    delete: RouteDefinition = {
        filename: `delete`,
        functionName: `deletion`
    };

    fetch: RouteDefinition = {
        filename: `fetch`,
        functionName: `fetch`
    };

    list: RouteDefinition = {
        filename: `list`,
        functionName: `list`
    };

    create: RouteDefinition = {
        filename: `create`,
        functionName: `creation`,
        // By default, models must provide their primary keys on creation.
        filterPrimaryKeyOnRequestMapper: false
    };

    update: RouteDefinition = {
        filename: `update`,
        functionName: `update`,
        // By default, models cannot change their primary keys.
        filterPrimaryKeyOnRequestMapper: true
    };
}
