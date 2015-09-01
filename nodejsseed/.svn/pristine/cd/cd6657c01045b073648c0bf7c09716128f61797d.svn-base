/**
*@ngdoc overview
*@name auth.spec.js
*@description
* <p>
* Unit test case for the auth.js file. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/

//Unit testing frameworks to be imported
var chai    	= require('chai'),
    expect  	= chai.expect,
	proxyquire =  require('proxyquire').noCallThru(), 
	sinon		= require('sinon'), 
	httpMocks	= require('node-mocks-http'), 
	mocks 		= require('../../mocks');

//Test suite for auth controller
describe('"#controllers#api -> auth.js"', function() {
	var pathToSrc = '../../../../src/',
	 	mockApp = mocks.app,
		authApi;
	var response = httpMocks.createResponse();
    response.set = function(key, value){
    	key = value;
    }

	beforeEach(function(){
		authApi = proxyquire(pathToSrc + 'controllers/api/auth', 
			{ '../../app': mockApp });
	});

	// Test if the controller is created
	it('should create authApi controller', function(done){
		expect(authApi).to.exist;
		done();
	});

	//Test suite for authenticate api
	describe('authenticate api' , function(){
		beforeEach(function(){	
			//Set up sinon spy
			sinon.spy(authApi, 'authenticate');
		});

		//Test if authenticate method is correct
		it('should return 200 for correct user', function(done){
			//Stub mongoose 'find' method with valid reponse
			sinon.stub(mockApp.models.user, 'find').yields(null, [{
	            username: 'admin',
	            password: 'admin',
	            role: '1',
	            token: 'mockToken'
	        }]);
			//Fake http request / response
			var request  = httpMocks.createRequest({
	            method: 'POST',
	            url: '/authenticate',
	            body: { 
	             username : 'admin',
	             password : 'admin' 
	            },
	            session: {
	            	passport : {
	            		user : {
	            			userName : 'admin',
	            			role : '1'
	            		}
	            	}
	            }
	        });
	        authApi.authenticate(request, response);

	        //Test if the method has been called
	        expect(authApi.authenticate.calledOnce).to.be.true;
	        expect(response.statusCode).to.equal(200);

	        //Unwrap the stub
	        mockApp.models.user.find.restore();
	        done();
		});

		afterEach(function(){	
			//Unwrap the spy
	        authApi.authenticate.restore();
		});
    });

	//Test suite for menu api
	describe('menu api' , function(){

		beforeEach(function(){	
			//Set up sinon spy
			sinon.spy(authApi, 'menu');
		});

		//Test if menu method 
		it('menu api should return 200', function(done){
			//Fake http request / response
			var request  = httpMocks.createRequest({
	            method: 'POST',
	            url: '/menu'
	        });
	        authApi.menu(request, response);

	        //Test if the method has been called
	        expect(authApi.menu.calledOnce).to.be.true;
	        expect(response.statusCode).to.equal(200);
	        done();
		});

		afterEach(function(){	
			//Unwrap the spy
	        authApi.menu.restore();
		});
    });

	//Test suite for regUser api
	describe('regUser api' , function(){
		beforeEach(function(){	
			//Set up sinon spy
			sinon.spy(authApi, 'regUser');
		});

		//Test if regUser method 
		it('regUser api should return 200', function(done){
			//Fake http request / response
			var request  = httpMocks.createRequest({
	            method: 'POST',
	            url: '/regUser'
	        });
	        request.body = {
		        firstName: 'David',
		        lastName: 'Richard',
		        userName: 'rDavid',
		        email: 'rDavid@cts.com',
		        password1: 'myPasswor$',
		        role: '2',
		        gender: 'Male'
		    };  
	        authApi.regUser(request, response);

	        //Test if the method has been called
	        expect(authApi.regUser.calledOnce).to.be.true;
	        expect(response.statusCode).to.equal(200);
	        done();
		});

		afterEach(function(){	
			//Unwrap the spy
	        authApi.regUser.restore();
		});
    });
});
