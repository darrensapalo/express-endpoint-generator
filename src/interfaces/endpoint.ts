export interface RouteDefinition {
    filename: string
    isDisabled?: boolean
}

export class EndPointDefinition {
    constructor(public modelName: string) {
        
    }

    delete: RouteDefinition = {
        filename: `delete${this.modelName}`
    }
    
    get: RouteDefinition = {
        filename: `get${this.modelName}`
    }

    create: RouteDefinition = {
        filename: `create${this.modelName}`
    }
}