/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* Defines schema and model for capability. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
'use strict';
var mongoose = require('mongoose');

var capabilitySchema = new mongoose.Schema({
            name: String,
            Description: String,
            Status: String            
        });    
var CapabilityModel = mongoose.model('Capability', capabilitySchema);
  
// Public API
exports = module.exports = CapabilityModel;