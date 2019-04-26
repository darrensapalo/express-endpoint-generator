
import express from "express";

import {pipe} from "rxjs";

import Doctor, { AddDisplayNameProperty } from '@models/Doctor';

import ServiceEndpoint from "@design/service-endpoint";
import {ValidResourceRequest} from "@design/validators";
import {mergeMap, map} from "rxjs/operators";
import {findOneModel} from "@design/model-operators";
import {FindResourceFromParam} from "@design/mappers";
import {FindResourceRequest} from "@interfaces/request";
import { SuccessfulProcess } from '@design/processors';

/**
 * Returns the full details of an instance of a Doctor.
 *
 * This endpoint was automatically generated on April 26, 2019 4:25 PM
 * using the `node-express-endpoint-generator` package.
 * 
 * @param request The HTTP request
 * @param response The HTTP response
 */
export default function get(request: express.Request, response: express.Response) {

    const endpoint = new ServiceEndpoint<FindResourceRequest>("Fetch Doctor instance");

    endpoint.Validators = [ ValidResourceRequest(Doctor) ];

    endpoint.RequestMapper = FindResourceFromParam(Doctor);

    endpoint.Processor = pipe(
        mergeMap(findOneModel<Doctor>(Doctor)),
        map(AddDisplayNameProperty),
        SuccessfulProcess("Successfully fetched Doctor instance.", { shouldLogProcess: false })
    );

    endpoint.perform(request, response);
}