/**
*@ngdoc overview
*@name bootstrap
*@description
* <p>
* Defines application wide configurations
* </p>
* @project NodeJS Seed 
* @Date
* @version 1.0
* @author Advanced Javascript Solutions COE
*/
module.exports = function(mode) {
    var config = {
        //to configure log level and log file paths
        log : {
            levels : {
                console: 'debug',
                file: 'error',
                mongodb: 'error'
            },
            files : {
                app : __dirname + '\\..\\app.log',
                exceptions : __dirname + '\\..\\exceptions.log'
            }
        },
        data : {
            json : {
                menu : __dirname + '\\..\\..\\data\\menu.json',
                users : __dirname + '\\..\\..\\data\\users.json'
            }
        },
        dbUrl : 'mongodb://10.251.167.199/NodeSeedProject'
    }

    /*
     * Default mode is local, however the port can be changed by specifying 
     * different process arguments
     * To run as staging server, launch as 
        > node app.js staging 
     * To run as production server, launch as 
        > node app.js production
     * Enables the capability to host the server is different modes on the same VM 
     */
    var serverModes = {
        local: {
            mode: 'local',
            port: 4000
        },
        staging: {
            mode: 'staging',
            port: 5000
        },
        production: {
            mode: 'production',
            port: 6000
        }
    }

    //Switches the server mode based on the input parameter
    config.server = serverModes[mode || process.argv[2] || 'local'] || serverModes.local;
    return config;
}