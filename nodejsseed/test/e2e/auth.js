/**
*@ngdoc overview
*@name auth.js
*@description
* <p>
* End to End test case for the auth.js file. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
var request = require('supertest');
var should = require('chai').should();
var expect = require('chai').expect;
 
describe("/authenticate", function (){
 
 //postive E2E test case for authentication
  it("authenticate a new user to /authenticate", function(done){
    //passing valid credentials
    var user = {
        username: 'admin',
        password: 'admin',
        role: '1',
        token: '2'
    };

    request("http://localhost:4000")
      .post("/authenticate")
      .send(user)
      .expect(200)
      .end(function(err, res) {
          should.not.exist(err);
          console.log('\t',res.status);
          (res.type).should.eql('application/json');
          (res.status).should.eql(200);
          (res.body.username).should.eql('admin');
          (res.body.role).should.eql('1','role');
          done();
        });
  });

  //negative E2E test case for authentication
  it("unauthorised authentication of a new user to /authenticate", function(done){
    //passing invalid credentials
    var user = {
        username: 'admina',
        password: 'admin',
        role: '1',
        token: '2'
    };

    request("http://localhost:4000")
      .post("/authenticate")
      .send(user)
      .expect(401)
      .end(function(err, res) {
        //res.error :{ [Error: cannot POST /authenticate (401)] status: 401, method: 'POST', path: '/authenticate' },
          should.not.exist(err);
          (res.status).should.eql(401);
          (res.error.path).should.eql('/authenticate');
          done();
        });
  });
});

