/**
*@ngdoc overview
*@name capabilities.js
*@description
* <p>
* End to End test case for the capabilities.js file. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
var request = require('supertest');
var should = require('chai').should();
var expect = require('chai').expect;
 
describe("/angularseedDB", function (){

  var id = "";
 
  //E2E test case for getting the list of features
  it("adding a new list of features to /angularseedDB", function(done){
    //passing valid data
    var newCapability= {
        name: 'EtoE Test',
        Description: 'End to End Test Description',
        Status: 'Open'
    };  

    request("http://localhost:4000")//.headers['x-auth-token']
      .post("/angularseedDB")
      .set('x-auth-token','testToken')
      .send(newCapability)
      .expect(200)
      .end(function(err, res) {
          should.not.exist(err);
          console.log('\t',res.status);
          console.log('\t',res.body._id);
          id=res.body._id;
          (res.status).should.eql(200);
          (res.body.name).should.eql(newCapability.name);
          (res.body.Description).should.eql(newCapability.Description);
          (res.body.Status).should.eql(newCapability.Status);
          done();
        });
  });

  //E2E test case for getting the list of features
  it("getting the list of features from /angularseedDB", function(done){
    request("http://localhost:4000")
      .get("/angularseedDB")
      .set('x-auth-token','testToken')
      .expect(200)
      .end(function(err, res) {
          should.not.exist(err);
          console.log('\t',res.status);
          console.log('\t',res.body.length);
          (res.body.length).should.not.eql(0);
          done();
        });
  });

  //E2E test case for updating the list of features
  it("updating the list of features from /angularseedDB/id", function(done){
    //passing valid data
    var newCapability= {
        name: 'updated name',
        Description: 'updated description',
        Status: 'In-Progress'
    };  
    request("http://localhost:4000")
      .put("/angularseedDB/"+id)
      .set('x-auth-token','testToken')
      .expect(200)
      .send(newCapability)
      .end(function(err, res) {
          should.not.exist(err);
          console.log('\t',res.status);
          console.log('\t',res.body.message);
          (res.body.message).should.eql("Successfully updated!");
          done();
        });
  });

  //E2E test case for deleting the list of features
  it("deleting the list of features from /angularseedDB/id", function(done){
    request("http://localhost:4000")
      .delete("/angularseedDB/"+id)
      .set('x-auth-token','testToken')
      .expect(200)
      .end(function(err, res) {
          should.not.exist(err);
          console.log('\t',res.status);
          console.log('\t',res.body.message);
          (res.body.message).should.eql("Successfully deleted");
          done();
        });
  });
});

