import dotenv from 'dotenv';
require('module-alias/register');
dotenv.config()

import { EndPointDefinition } from '@interfaces/endpoint';
import { GenerateEndPoint } from './generator/generate-endpoint';

GenerateEndPoint(new EndPointDefinition("Doctor"))
    .subscribe(console.log);