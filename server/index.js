const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, '..', 'dist')));

const routes = require('./routes');
app.use('/', routes);

const port = process.env.PORT || '9000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server Running on port ${port}`));


