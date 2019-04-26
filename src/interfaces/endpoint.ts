export interface RouteDefinition {
    filename: string
    functionName: string
    isDisabled?: boolean
}

export class EndPointDefinition {
    constructor(public modelName: string, public serverSubFolder: string) {
        
    }

    delete: RouteDefinition = {
        filename: `delete`,
        functionName: `deletion`
    }
    
    get: RouteDefinition = {
        filename: `get`,
        functionName: `fetch`
    }

    create: RouteDefinition = {
        filename: `create`,
        functionName: `creation`
    }
}