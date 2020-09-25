const startMyApp = require('./config');
const express = require('express');
const app = express();
const routes = require('./app/routes');

startMyApp(app, routes);
