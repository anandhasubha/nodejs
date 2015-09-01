/**
*@ngdoc overview
*@name logger.spec.js
*@description
* <p>
* Unit test case for the logger.js file. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/

//Unit testing frameworks to be imported
var chai     	= require('chai'),
    expect   	= chai.expect,
    mocks       = require('../mocks');

describe("MongoDB #lib->logger.js", function() {
	var mockApp = mocks.app,
		pathToSrc = '../../../src/';
	require(pathToSrc + 'lib/logger').attach(mockApp);
	var logger = mockApp.logger;	
	
	//Test the debug method for logger
    it("should test debug message", function(done) {
        expect(logger).to.exist;
        logger.debug('Test debug message');
        done();
    });
});

