/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* DB connection script. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
'use strict';

//Imports
var mongoose = require('mongoose');

module.exports = function(app){
	var logger = app.logger;
	var config = app.config;

	//Create connection
	var dbConnection = mongoose.connection;

	//Define event handlers
	dbConnection.on('error', console.error);
	dbConnection.once('open', function() {});

	//Open the connection
	mongoose.connect(config.dbUrl);
	
	return dbConnection;
};