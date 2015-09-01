/**
*@ngdoc overview
*@name initialize.js
*@description
* <p>
* Passport is authentication middleware for Node.js. Extremely flexible and modular, 
* Passport can be unobtrusively dropped in to any Express-based web application. 
* A comprehensive set of strategies support authentication using a username and password, 
* Facebook, Twitter, and more. Passport has a comprehensive set of over 
* 140 authentication strategies covering social networking, enterprise integration, API services, and more.
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
* http://www.learnallthenodes.com/episodes/21-password-authentication-in-node-with-passport
* http://www.sitepoint.com/local-authentication-using-passport-node-js/
*/
'use strict';
var express = require('express');

// Initializing passport
function initPassport(app, passport) {
  var CONSTANTS = app.constants;
  var LocalStrategy = require('passport-local').Strategy;

  /* The local authentication strategy authenticates users using a username and password. 
  The strategy requires a verify callback, which accepts these credentials and calls done providing a user.*/
  passport.use('local-login', new LocalStrategy(
    function(username, password, done) {
      app.models['user'].findOne({
          userName: username, 
        }, function(err, user) {
          //If there is any error with mongodb lookup, 
          //pass on the error to the callback function
          if (err) {
            return done(err);
          }
     
          //In case of authentication issues, return false flag for user
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }     
          if (user.password != password) {
            return done(null, false, { message: 'Incorrect password.' });
          } 

          //Set the default role if undefined
          if (!user.role) {
            user.role = '2';
          }
          return done(null, user);
        });
    }));

    /* 
    * Passport will maintain persistent login sessions. In order for 
    * persistent sessions to work, the authenticated user must be 
    * serialized to the session, and deserialized when subsequent requests are made. 
    * However out current implementation is stateless, hence these methods
    * are not needed
    */
    // passport.serializeUser(function(user, done) {
    //   done(null, user);
    // });
     
    // passport.deserializeUser(function(user, done) {
    //   done(null, user);
    // });

    //Passport middleware to be initialized before app router
    app.use(passport.initialize());
    app.use(app.router);
}

module.exports = initPassport;