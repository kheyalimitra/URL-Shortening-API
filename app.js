const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var swaggerDefinition = {
    info: {
      title: 'URL Shortening API',
      version: '1.0.0',
      description: 'A simple service to shorten URLs',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  // options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./src/api/routes/*.js'],
  };
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
const corsOptions = cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: 'http://localhost:3000',
    preflightContinue: false
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());
app.use(cors(corsOptions));
const appRouter = require('./src/api/routes');
const port = process.env.PORT || 80;
const host = '0.0.0.0';
app.use('/', appRouter);
app.listen(port, host);
console.log('Node server running ...');

module.exports = app;