import swaggerAutogen from 'swagger-autogen';
import './build/src/main.js';

swaggerAutogen();

const outputFile = './swagger_output.json'

const endpointsFiles = ['./build/src/routes.js']

swaggerAutogen(outputFile, endpointsFiles);
