import dotenv from 'dotenv'
import path from 'path'
import program, { Command } from 'commander'

require('module-alias/register');
dotenv.config();

import { EndPointDefinition } from '@interfaces/endpoint'
import { GenerateEndPoint } from '@generator/generate-endpoint'

export function handleCommandLineInterface() {
    program
        .command('generate <modelName>')
        .option(
            '-d, --directoryName [directoryName]',
            'Sub directory for this route'
        )
        .option(
            '-a, --autoIncrement',
            'On create, use auto-increment to define the primary key. Default, all required fields must be filled.'
        )
        .option(
            '--pkRelaxed',
            'On update, allow the primary key field to be modified. Default strict.'
        )
        .action(function(modelName: string, cmd: Command) {
            let dirName = cmd.directoryName || `${modelName.toLowerCase()}/`;

            
            console.log(
                `Generating an endpoint for ${modelName}. Subdirectory: ${dirName}.\n`
            );

            const destinationFolder = path.join(process.env.OUTPUT_DIR, dirName);

            const definition = new EndPointDefinition(modelName, dirName);

            if (cmd.autoIncrement) {
                console.log("Auto-increment enabled. Primary key will be filtered on creation.");
                definition.create.filterPrimaryKeyOnRequestMapper = true;
            }

            if (cmd.pkRelaxed) {
                console.log("Primary key updates relaxed. Primary key will be allowed to be modified on updates.");
                definition.update.filterPrimaryKeyOnRequestMapper = false;
            }

            console.log("");

            GenerateEndPoint(definition)
                .subscribe(() =>
                console.log(
                    `Successfully generated endpoint for ${modelName} at:\n   ${destinationFolder}\n`
                )
            )
        });

    program.parse(process.argv)
}

handleCommandLineInterface();
