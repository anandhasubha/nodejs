/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* Defines schema and model for users. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
'use strict';
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
          firstName: String,
          lastName: String,
          userName: String,
          email: String,
          password: String,
          role: String,
          gender: String     
        });
var UserModel = mongoose.model('User', userSchema);

// Public API
exports = module.exports = UserModel;