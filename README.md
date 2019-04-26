# node-express-endpoint-generator

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