/**
*@ngdoc overview
*@name user.js
*@description
* <p>
* End to End test case for the user.js file. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
var request = require('supertest');
var should = require('chai').should();
var expect = require('chai').expect;
 
describe("/regUser", function (){
 
  it("posts a new user to /regUser", function(done){
    var user = {
      firstName: 'Mohammed',
      lastName: 'shuaib',
      userName: 'shuaibindia',
      email: 'shuaibindia@gmail.com',
      password:'shuaibindia',
      role: '1',
      gender: 'Male'
    };

    request("http://localhost:4000")
      .post("/regUser")
      .set('x-auth-token','testToken')
      .send(user)
      .expect(200)
      .end(function(err, res) {
          should.not.exist(err);
          // console.log('response body while signup /regUser \n',res.body);
          // console.log(res.body.firstName);
          (res.body.firstName).should.eql('Mohammed');
          (res.body.lastName).should.eql('shuaib');
          (res.body.userName).should.eql('shuaibindia');
          (res.body.email).should.eql('shuaibindia@gmail.com');
          (res.body.role).should.eql('1');
          (res.body.gender).should.eql('Male');
          (res.statusCode).should.eql(200);
          expect(res.body.firstName).to.equal('Mohammed');
          done();
        });
  });
});

