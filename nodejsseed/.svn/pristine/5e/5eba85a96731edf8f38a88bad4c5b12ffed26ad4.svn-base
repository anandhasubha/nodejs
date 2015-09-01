/**
*@ngdoc overview
*@name capabilityModel.spec.js
*@description
* <p>
* Unit test case for the CapabilityModel.js file. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/

//Unit testing frameworks to be imported
var chai     = require('chai'),
    expect   = chai.expect;

//Test suite
describe('#Models->CapabilityModel', function(){	
	var pathToSrc = '../../../src/';
	//Model to be tested
	var CapabilityModel = require(pathToSrc + 'models/CapabilityModel');

  	it('should create CapabilityModel', function(done){
  		var newCap= new CapabilityModel({
		    name: 'new CapabilityModel',
		   	description : 'new CapabilityModel for testing',
		   	status : 'Open'
	  	});  
	  	expect(newCap).to.exist;
	  	expect(newCap._id).not.to.be.a('null');
	  	done(); 
  	});
});
