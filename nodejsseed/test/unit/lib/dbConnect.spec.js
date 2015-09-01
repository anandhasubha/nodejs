/**
*@ngdoc overview
*@name dbConnect.spec.js
*@description
* <p>
* Unit test case for the dbConnect.js file. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/

//Unit testing frameworks to be imported
var chai     = require('chai'),
    expect   = chai.expect,
    mocks       = require('../mocks');

describe("MongoDB #lib->dbConnect.js", function() {
	var mockApp 		= mocks.app,
		pathToSrc 		= '../../../src/',
		dbConnection 	= require(pathToSrc + 'lib/dbConnect')(mockApp);	

    it("should create the db connection", function(done) {
        expect(dbConnection).to.exist;
        done();
    });
});

