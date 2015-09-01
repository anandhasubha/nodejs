/**
*@ngdoc overview
*@name mocks.js
*@description
* <p>
* Hosts the mocks for all unit tests. 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/

var pathToSrc = '../../src/';
var sinon = require('sinon');
var mongoose = require('mongoose');

//Mock authorization
var mockLib = {
	auth : {
		isAdmin : function (headers){
			if(headers) {
				return true;
			} else {
				return false;
			}
		},
		adminPredicate : function (){
			return true;
		}
	},
	util : {
		readJsonFileSync : function(filePath){
			return {
			    "item": "list",
			    "label": "List",
			    "url": {
			      "route": "#/list"
			    },
			    "role": [
			      "1",
			      "2"
			    ]
		  	};
		}
	}
};

//Mock logger
var mockLogger = {
	debug : function(msg){
		console.log(msg);
	},
	info : function(msg){
		console.log(msg);
	},
	error : function(msg){
		console.log(msg);
	}
};

//Mock app
var mockApp = {
	config : require(pathToSrc + '/common/config')(),
	constants : require(pathToSrc + 'common/constants'),
	models : {
		user : require(pathToSrc + 'models/UserModel')
	},
	lib : mockLib,
	logger : mockLogger,
	get : function(key){
		return 'This is a secret string';
	}
}

exports.lib = mockLib;
exports.app = mockApp;