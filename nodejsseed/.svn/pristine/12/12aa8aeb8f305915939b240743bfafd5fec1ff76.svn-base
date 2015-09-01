/*
*@ngdoc overview
*@name config.spec.js
*@description
* <p>
* Unit test case for the config.js file. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/

//Unit testing frameworks to be imported
var chai     = require('chai'),
    expect   = chai.expect;

describe("Configuration setup", function() {
	var pathToSrc = '../../../src/',
        configFilePath = pathToSrc + 'common/config';

    it("should load default configurations", function(done) {
        var config = require(configFilePath)();
        // console.log(config);
        expect(config.log.levels).to.exist;
        expect(config.log.levels.console).to.exist;
        expect(config.log.levels.file).to.exist;
        expect(config.log.levels.mongodb).to.exist;
        expect(config.dbUrl).to.exist;
        done();
    });

    it("should load local configurations", function(done) {
        var server = require(configFilePath)().server;
        expect(server.mode).to.equal('local');
        expect(server.port).to.equal(4000);
        done();
    });

    it("should load staging configurations", function(done) {
        var server = require(configFilePath)('staging').server;
        expect(server.mode).to.equal('staging');
        expect(server.port).to.equal(5000);        
        done();
    });

    it("should load production configurations", function(done) {
        var server = require(configFilePath)('production').server;
        expect(server.mode).to.equal('production');
        expect(server.port).to.equal(6000);        
        done();
    });
});

/* Reference : http://code.tutsplus.com/tutorials/build-a-complete-mvc-website-with-expressjs--net-34168 */