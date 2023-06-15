import swaggerAutogen from 'swagger-autogen';

const outputFile = './sys/swagger_output_generated.json'
const endpointsFiles = ['./router/*', './controller/*']

const doc = {
    info: {
        title: 'Cashflow API Documentation',
        version: '1.0.0',
    },
    host: null,
    basePath: "/",
    schemes: [],
    consumes: ['application/json'],
    produces: ['application/json']

};

swaggerAutogen()(outputFile, endpointsFiles, doc)
