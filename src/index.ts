import dotenv from 'dotenv'
import path from 'path'
import program, { Command } from 'commander'

require('module-alias/register')
dotenv.config()

import { EndPointDefinition } from '@interfaces/endpoint'
import { GenerateEndPoint } from './generator/generate-endpoint'

export function handleCommandLineInterface() {
    program
        .command('generate <modelName>')
        .option(
            '-d --directoryName [directoryName]',
            'Sub directory for this route'
        )
        .action(function(modelName: string, cmd: Command) {
            let dirName = program.directoryName || `${modelName.toLowerCase()}/`

            console.log()
            console.log(
                `Generating an endpoint for ${modelName}. Subdirectory: ${dirName}.\n`
            )

            const destinationFolder = path.join(process.env.OUTPUT_DIR, dirName)
            GenerateEndPoint(
                new EndPointDefinition(modelName, dirName)
            ).subscribe(() =>
                console.log(
                    `Successfully generated endpoint for ${modelName} at:\n   ${destinationFolder}\n`
                )
            )
        })

    program.parse(process.argv)
}

handleCommandLineInterface()
