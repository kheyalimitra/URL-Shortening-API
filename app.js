const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const options = cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: 'http://localhost:8080',
    preflightContinue: false
};
app.use(bodyParser.json());
app.use(cors(options));
const appRouter = require('./routes');
const port = process.env.PORT || 3000;
const host = '127.0.0.1';
app.use('/', appRouter);
app.listen(port, host);
console.log('Node server running on port 3000 ...');