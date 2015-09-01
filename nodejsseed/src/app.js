/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* The main application app.js 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
'use strict';

var http = require("http");
var https = require('https');
var express   = require("express"), 
    passport  = require("passport");

//Create app
var app = module.exports = express();

//dbConnect requires logger requires config, so the order of loading should be preserved
app.config = require('./common/config')('local');
app.constants=require('./common/constants');
require('./lib/logger').attach(app); 

//===============EXPRESS================
// Configure Express

//Public directories to be exposed
app.use('/', express.static(__dirname + '/..'));
app.use(express.bodyParser());
app.use(express.methodOverride());

//===============EXPRESS================

//Load models - Models are required by passport, so loaded before passport
app.models = {
  user : require('./models/UserModel'),
  capability : require('./models/CapabilityModel')
}

// init passport
require('./common/initialize')(app, passport);

//Load helpers 
app.lib = {
  util : require('./lib/utility')
}

//Load controllers 
app.controllers = {
  api : {
    auth : require('./controllers/api/auth'), 
    capabilities : require('./controllers/api/capabilities')
  }
}

//Load routes
app.routes = require('./routes').register(app, passport);

//Trigger dbconnect
require('./lib/dbConnect')(app);

//Start the http and https servers 
var fs = require("fs");
//Create certificate for https server
var privateKey = fs.readFileSync(__dirname + '/../cert/privatekey.pem').toString();
var certificate = fs.readFileSync(__dirname + '/../cert/certificate.pem').toString();
var credentials = { key: privateKey, cert: certificate };
var server = http.createServer(app);
var secureServer = https.createServer(credentials, app);

server.listen(app.config.server.port);
secureServer.listen(app.config.server.port + 1);
app.logger.info(app.constants.SERVER_RUNNING);
app.logger.info(app.constants.SECURE_SERVER_RUNNING);

//Server should be up and running