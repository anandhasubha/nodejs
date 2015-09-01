/**
*@ngdoc overview
*@name userModel.spec.js
*@description
* <p>
* Unit test case for the UserModel.js file. 
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
describe('#Models->UserModel', function(){
	var pathToSrc = '../../../src/';
	//Model to be tested
	var UserModel = require(pathToSrc + 'models/UserModel');

  	it('should create UserModel', function(done){
  		var newUser= new UserModel({
		    firstName: 'John',
		    lastName: 'Roger',
		    userName: 'rjohn',
		    email: 'rjohn@cognizant.com',
		    password: 'password',
		    role: '1',
		    gender: 'male'
	  	});  
	  	expect(newUser).to.exist;
	  	expect(newUser._id).not.to.be.a('null');
	  	done(); //not invoking done() gives timeout error
  	});
});
