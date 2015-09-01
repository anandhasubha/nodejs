/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* Utility functions for the application. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
'use strict';
var fs = require("fs"),
    jwt = require('jsonwebtoken');
var CONSTANTS = require('../common/constants');

/* 
 * Method to read the contents of a json file
 */
exports.readJsonFileSync = function (filepath, encoding) {
    if (typeof (encoding) == 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

//General utility methods
exports.isEmptyObject = function (obj) {
    var obj;
    for (key in obj) return !1;
    return !0;
}

exports.isNullOrEmpty = function (obj) {
    if (obj === undefined || obj === null || obj === "") {
        return true;
    }
    return false;
}

/* 
 * Method to read the 'authorization' header from the response, decode the same 
 * with the secret key to retrieve the user's role.
 * Throws/Returns a session expired response in case of an expired token
 * The other possible error is JsonWebTokenError
    Error object:
        name: 'JsonWebTokenError'
        message:
        'jwt malformed'
        'jwt signature is required'
        'invalid signature'
        'jwt audience invalid. expected: [PAYLOAD AUDIENCE]'
        'jwt issuer invalid. expected: [PAYLOAD ISSUER]'
 */
exports.decodeRole = function (req, res){
    //Retrieve the token
    var token = req.headers.authorization;
    var role = false;
    //If the token is present
    if(token){        
        //Remove the 'Bearer' string
        token = token.replace('Bearer ', '');
        //Decode the role
        jwt.verify(token, CONSTANTS.TOKEN_SECRET, function (err, decodedRole) {
            if(err) {
                logger.error(err);
                //Return session expired response for expired tokens
                if(err.name == 'TokenExpiredError') {
                    return res.status(401).send(
                        'Sorry your session has expired. Please login again');
                }
                //Return access denied error for 'JsonWebTokenError'
                return res.status(401).send('Unauthorized : Access denied');
            } else {
                //Save the decoded role
                role = decodedRole;
            }
        });
    }
    return role;
}