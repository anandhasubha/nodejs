/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* This file includes the implementation of the logic and DB related operations for 
* REST apis that support the capabilities feature 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
'use strict';
var promise = require('bluebird');

var app = require('../../app');
var logger = app.logger;
var util = app.lib.util;
var CapabilityModel = app.models.capability;

/* 
 * GET REST api implementation 
 * Method supports the listing of all capabilities to the user. It retrieves
 * all available capabilites from the DB and returns them as a json list in the 
 * response
 */
function GET(req, res){
  //'find' is an mongoose api that helps to retrieve all entries from 
  //the capability table
  CapabilityModel.find(function (err, capabilities) {
    return new promise(function (resolve, reject) {
      if (err) {
        logger.error(err);
        res.send(err);
        return reject(err);
      }
      return res.send(capabilities);
      resolve(newCapability);
    });
  })
};

/* 
 * POST REST api implementation 
 * Method supports the addition of a new capability in the system. It constructs a 
 * mongoose schema from the capabilities details in the request object and 
 * saves it in the database
 */
function POST(req, res){
  //'save' api from mongoose helps the addition of new capability to
  // the database
  var newCapability= new CapabilityModel({
      name: req.body.name,
      Description: req.body.Description,
      Status: req.body.Status
  });  
  newCapability.save(function(err, newCapability) {
    return new promise(function (resolve, reject) {
      if (err) { 
        logger.error(err);          
        res.send(err);
        return reject(err);
      }
      resolve(newCapability);
    })
  });
  logger.debug('Record inserted successfully...');
  return res.send(newCapability);
}

/* 
 * PUT REST api implementation 
 * Method supports updating a capability in the system. It updates a specific
 * capability in the database with the new information from the request.
 */
function PUT(req, res){
  //'findById' - fetches the record from the db to update
  CapabilityModel.findById(req.params.id, 
    function(err, capability) {
      return new promise(function (resolve, reject) {
      if (err) {
        logger.error(err);
        res.send(err);
        return reject(err);
      }     
      capability.name= req.body.name;
      capability.Description= req.body.Description;
      capability.Status= req.body.Status;
     
      logger.debug('Request id:'+ req.params.id);

      //'save' - updates the capability in the database
      //save acts as add when the '_id' is not provided and
      //when the '_id' is provided, it updates the existing record
      capability.save(function(err,capability) {
        return new promise(function (resolve, reject) {
          if (err) {
            logger.error(err);
            res.send(err);
            return reject(err);
          }
          logger.debug('Successfully updated capability!!');
          res.json({ message: 'Successfully updated!' });
          resolve(capability);
        })
      });
      resolve(capability);
    })
  });
};

/* 
 * DELETE REST api implementation 
 * Method supports the deletion of a capability from the database. It deletes
 * the capability that matches the '_id' from the request
 */
function DELETE(req, res){
  //'remove' - Removes the record from the capability table
  CapabilityModel.remove({
      _id: req.params.id
    }, function(err, docs) {
      return new promise(function (resolve, reject) {
        if (err) {
          logger.error(err);
          res.send(err);
          return reject(err);
        }
        logger.debug('Successfully deleted!!');
        res.json({ message:'Successfully deleted' });
        resolve(docs);
      });
    });
};

// Public API
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;