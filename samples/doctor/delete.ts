import express from 'express';

import {pipe} from "rxjs";
import Doctor from "@models/Doctor";
import ServiceEndpoint from '@design/service-endpoint';
import {
    SuccessfulProcess
} from "@design/processors";
import {map, mergeMap} from "rxjs/operators";
import {RequiredRequestParam} from "@design/validators";
import {deleteFromModel} from "@design/model-operators";


/**
 * API route that deletes an instance of a Doctor.
 *
 * @param request - An HTTP Request object
 * @param response - An HTTP Response object
 */
const deleteCHF = function(request: express.Request, response: express.Response) {
    
    const endpoint = new ServiceEndpoint();

    endpoint.Validators = [ RequiredRequestParam("identifier") ];

    endpoint.RequestMapper = map(request => request.params.identifier);

    endpoint.Processor = pipe(
        mergeMap(deleteFromModel(Doctor)),
        SuccessfulProcess("Successfully deleted a Doctor.")
    );

    endpoint.perform(request, response);
};

export default deleteCHF;
