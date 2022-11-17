import swaggerAutogen from 'swagger-autogen'

const outputFile = './openapi.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles)
