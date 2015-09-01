/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* This file includes the implementation of the logic and DB related operations for 
* authentication, registration REST apis
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
'use strict';

var jwt = require('jsonwebtoken'),
    passport  = require("passport");
var _us = require('underscore')._;
var promise = require('bluebird');

var app = require('../../app');
var CONSTANTS = app.constants;
var logger = app.logger;
var util = app.lib.util;
var UserModel = app.models.user;

/* 
 * Authenticate REST api implementation
 *  Method calls passport authentication with local strategy. Frames response
 *  using the authentication result from passport.
 *  For a successful authentication creates the json web token signed using
 *  user's role as payload
 */
function authenticatePOST(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) { 
            return next(err); 
        }

        //Send unauthorized response for login errors
        if (!user) {
            return res.status(401).send('Unauthorized : Invalid User Id or Password');;
        }

        /* 
        * User has authenticated correctly thus create a JWT token 
        * Usage : jwt.sign(payload, secretOrPrivateKey, options)
        * The jsonwebtoken is signed using the role as payload and the application secret key 
        * stored in constants file.
        * options:
        *   algorithm (default: HS256)
        *   expiresInMinutes
        *   audience
        *   subject
        *   issuer
        */
        var token = jwt.sign(user.role, 
            CONSTANTS.TOKEN_SECRET, { expiresInMinutes: 60*5 });
        return res.json({ 
            token : token,
            user  : {
                name: user.userName,
                role: user.role
            }
        });
    })(req, res, next);
}

/* 
* Menu REST api implementation
* Method reads the JSON file for the menu list, filters them according to the 
* user's role and send the relevant menu items in the response 
*/
function menuGET(req, res) {
    //Retrieve the user's role from the jwt token
    var role = util.decodeRole(req, res);
    if(role) {
        //Read json file that has the menu items
        var menu = util.readJsonFileSync(app.config.data.json.menu); 
        //If the user is not an admin, filter the menu
        if(role !== 1) {
            menu = _us.filter(menu, adminPredicate);
        }
        res.set("Content-Type", "application/json");
        return res.status(200).send(menu);
    } 
    //Return access denied error if the role in not 
    //decoded from the jwt token
    return res.status(401).send('Unauthorized : Access Denied');
}

function adminPredicate(obj) {
    return !(obj.hasOwnProperty("role") && obj["role"] === "1");
}

/* 
 * regUser REST api implementation
 * Method helps in the new user registration/signup. A new user is added to the 
 * database with the default role. The default role is 'guest'
 * As of now, system does not support 'admin' role registration. The admin user
 * has to be seeded into the DB directly
 */
function regUserPOST(req, res){
    //Create the new user
    var newUser= new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password1,
        role: req.body.role,
        gender: req.body.gender
    });  
    //Add the user to DB
    newUser.save(function(err, newUser) {
        return new promise(function (resolve, reject) {
            if (err) {
              return reject(err);
            }
            resolve(newUser);
            logger.debug("Saved new user:");
        });
    });
    return res.send(newUser);
};

//Export local functions
exports.authenticate = authenticatePOST;
exports.menu = menuGET;
exports.regUser = regUserPOST;
