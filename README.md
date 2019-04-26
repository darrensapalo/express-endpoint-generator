# node-express-endpoint-generator

Allows you to automatically generate three endpoints given the name of the resource model.

Currently, it supports generation of one GET request (fetch single detail), one POST request, and one DELETE request.

Technically, extending the templates should allow you to generate more than one operation.

## Installation

1. Clone the project.
2. Run `npm install` to get the dependencies.

## Usage

1. Configure `.env` such that its `OUTPUT_DIR` environment variable points to your desired output location.

2. Double check if the `src/templates/` are correct. You may check the allowed variables that you can modify as documented below.

3. Generate an endpoint using the following command: 

```
npm run generate <MODEL_NAME> -d [ROUTE SUBDIRECTORY]
```

Note that the `-d, --directory` flag is optional. By default it will use the model name in lower case.

## Example

Given a `.env` with the following configuration:

```
OUTPUT_DIR=/Users/darrenkarlsapalo/git/work/node-express-endpoint-generator/output/
```

Running the following code gets this result:

```
$ npm run generate Doctor

Generating an endpoint for Doctor. Subdirectory: doctor/.
Successfully generated endpoint for Doctor at:
   /Users/darrenkarlsapalo/git/work/node-express-endpoint-generator/output/doctor/

```

See the `samples` folder for results.

## Supported Template Variables

1. `<MODEL_NAME>` - The name of your model.
2. `<TIMESTAMP>` - The current timestamp, using `moment.format("LLL")` which looks like this: April 26, 2019 4:25 PM.
3. `<OP_FUNC>` - The name of the function operation (whether `OP` = `GET`, `CREATE`, or `DELETE`) that will be used on your subroute file.