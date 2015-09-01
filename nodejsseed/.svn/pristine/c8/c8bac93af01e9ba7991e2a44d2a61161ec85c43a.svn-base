/**
*@ngdoc overview
*@name logger.js
*@description
* <p>
* Holds all the configuration for the different types of logging provided by
* the winston logger module. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
'use strict';

var winston = require('winston'),
    winstonMongoDB = require('winston-mongodb');

//Define colors for the logger information
function setColors() {
  winston.addColors({
    silly: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
  });
}

/* 
 * Initializes the logger and attaches it to the app module. 
 * Defines the loglevels, colors, json formatting, log file path for the different 
 * types of logging. The logging types being used are
 *  1. Console
 *  2. File 
 *  3. DB - database is turned off for time being since it overloads the DB
 *          in 'dev' mode. Can be turned on for a 'production' mode with 
 *          a restricted log level
 */
function attach(_app_) {
    var app = _app_;
    var logLevels = app.config.log.levels;
    var files = app.config.log.files;

    app.logger = new (winston.Logger)({
      exceptionHandlers: [
          new (winston.transports.Console)({
              colorize: true,
              json: true
          }),
          new (winston.transports.File)({
              level: logLevels.file,
              filename: files.exceptions, 
              timestamp: true,
              json: true
          })
      ],
      transports: [
          new (winston.transports.Console)({
              colorize: true,
              label: 'app',
              level: logLevels.console
          }),
          new (winston.transports.File)({
              level: logLevels.file,
              filename: files.app,
              timestamp: true
          })//,
          // new (winstonMongoDB.MongoDB)({
          //   level: logLevels.mongodb,
          //   host: 'localhost',
          //   port: port,
          //   username: username,
          //   password: password,
          //   db: 'Nodeseed',
          //   collection: 'logs'
          // })
        ]
    });
}       

// Initialize
setColors();

//Expose public method
exports.attach = attach;