/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* The main application app.js 
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
* cmd: node nodeloadScript.js
* cmd: localhost:8000 for op
*/
'use strict';

var http = require('http'),
    nl = require('nodeload');
    nl.disableLogs();

var svr = http.createServer(function (req, res) {
    res.writeHead((Math.random() < 0.8) ? 200 : 404, {'Content-Type': 'text/plain'});
    res.end(req.url);
});
svr.listen(9000);
console.log('Started test server.');

var i = 0,
    readtest = {
        name: "Read",
        host: 'localhost',
        port: 4000,
        timeLimit: 40,
        loadProfile: [[0,0], [10, 100], [30, 100], [39, 0]],
        userProfile: [[0,0], [20, 10]],
        stats: ['result-codes', {name: 'latency', percentiles: [0.95, 0.999]}, 'concurrency', 'uniques', 'request-bytes', 'response-bytes'],
        requestGenerator: function(http) {
            return http.request('GET', "/angularseedDB", { 'host': 'localhost:4000', 'connection': 'keep-alive' });
        }
    },
    writetest = {
        name: "Write",
        host: 'localhost',
        port: 4000,
        numUsers: 10,
        timeLimit: 40,
        targetRps: 20,
        stats: ['result-codes', 'latency', 'uniques'],
        requestGenerator: function(http) {
            var request = http.request('PUT', "/angularseedDB/:id", { 'host': 'localhost:4000', 'connection': 'keep-alive' });
            request.end('foo');
            return request;
        }
    },
    cleanup = {
        name: "Cleanup",
        host: 'localhost',
        port: 9000,
        numUsers: 50,
        numRequests: 8001,
        stats: ['result-codes'],
        requestGenerator: function(http) {
            return http.request('DELETE', "/" + i++, { 'host': 'localhost', 'connection': 'keep-alive' });
        }
    },
    loadtest = nl.run(readtest);

    loadtest.updateInterval = 1000;
    loadtest.on('end', function() {
    loadtest = nl.run(cleanup);
    loadtest.on('end', function() {
        console.log('Closing test server.');
        svr.close();
        process.exit(0);
    });
});