/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* This file configures all the routes hosted by the application. The routes are the 
* REST apis exposed by the server. 
* Authetication and authorization for the apis are configured in this file
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
'use strict';
var expressJwt = require('express-jwt');

// Register controllers to routes.
exports.register = function (app, passport) {
  var c = app.controllers;
  var util = app.lib.util;

  /* 
   * Configure the general header settings for all routes. 
   * This enables the CORS support
   */
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, ' 
      + 'X-HTTP-Method-Override, Content-Type, Accept, Authorization, x-auth-token');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  });

  /* 
   * Authentication
   * expressJwt({secret: app.constants.TOKEN_SECRET}) - handles authentication. It checks
   * for the availability of the token in each request, throws 401-Unauthorized error for any
   * invalid tokens. 
   * app.constants.TOKEN_SECRET - this is the secret key used to sign the token when it was 
   * generated

   * Authorization
   * ensureAuthorized - function that checks if the user's role is authorized for the
   * api being invoked
   */

  // APIs - authentication
  app.post ('/authenticate', c.api.auth.authenticate);
  app.get  ('/menu', expressJwt({secret: app.constants.TOKEN_SECRET}), c.api.auth.menu);
  app.post ('/regUser', c.api.auth.regUser);

  // API - capabilities 
  app.get  ('/angularseedDB', 
    expressJwt({secret: app.constants.TOKEN_SECRET}), c.api.capabilities.GET);
  app.post ('/angularseedDB', 
    expressJwt({secret: app.constants.TOKEN_SECRET}), 
    ensureAuthorized,
    c.api.capabilities.POST);
  app.put  ('/angularseedDB/:id', expressJwt({secret: app.constants.TOKEN_SECRET}), 
    ensureAuthorized,
    c.api.capabilities.PUT);
  app.delete  ('/angularseedDB/:id', expressJwt({secret: app.constants.TOKEN_SECRET}), 
    ensureAuthorized,
    c.api.capabilities.DELETE);

  /* 
   * Middleware to ensure user is authorized. 
   * This function can be wired up to any route to check if the role encoded into the 
   * token is authorized to use the api being executed
   */
  function ensureAuthorized(req, res, next) {  
    var role = util.decodeRole(req, res);
    if(role !== 1) {
      return res.status(401).send('Unauthorized : Access Denied');
    }
    return next(); 
  }
};
