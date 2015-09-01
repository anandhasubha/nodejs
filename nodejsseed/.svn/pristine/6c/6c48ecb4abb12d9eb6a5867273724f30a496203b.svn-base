/*grutnfile*/
"use strict";

module.exports = function(grunt) {
  // automatically load all  the grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);
  //Displays the elapsed execution time of grunt tasks when done
  // Time how long each tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var path = require('path');
 
   //allows to break up large Gruntfile config  into several individual task files.
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'build/gruntTasks'), //path to task json files, defaults to grunt dir
    init: true //auto grunt.initConfig
  });

  // notification when files are edited
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
  var gruntConfig = grunt.file.readJSON('build/gruntTasks/cfg.json');


  //loading the Jenkins plugin
  grunt.loadNpmTasks('grunt-jenkins');
  //loading the nodemon plugin
  grunt.loadNpmTasks('grunt-nodemon');
  //loading the node inspector plugin
  grunt.loadNpmTasks('grunt-node-inspector');
  //loading the forever plugin
  grunt.loadNpmTasks('grunt-forever');

  // Tell Grunt to register our custom tasks
  grunt.registerTask(
    'default',
    'Basic build for development purpose that copies all the source files to dist directory',
    [ 'clean:build','copy:vendor','copy:scripts','copy:data','copy:cert']
  );

  grunt.registerTask(
    'forstart',
    [ 'forever:appserver']
  );
  grunt.registerTask(
    'forstop',
    [ 'forever:appserver:stop']
  );


   grunt.registerTask(
   'reports',
   'Scans source code to generate quality reports',
    ['clean:reports','concurrent:staticCodeAnalyzer',
      'concurrent:qualityReports','concurrent:jsdocs']
  );


  grunt.registerTask(
    'unit-test',
    'Execute unit testing, code coverage & test reports',
    ['clean:instrumented','clean:unittestreports','clean:unitcoveragereports',
      'instrument', 'copy:coverage', 'mochaTest:unit', 
      'storeCoverage', 'unit-test-coverage']    
  );

  grunt.registerTask(
    'unit-test-coverage', 'custom task to override makeReport path for unit tests coverage', 
    function(){
      grunt.config.set('cfg.path.distCoverageReports', '<%=cfg.path.distUnitCoverageReports%>');
      grunt.task.run('makeReport');
    }
  );

  /*
  grunt.registerTask(
    'e2e-test',
    'Execute E2E testing & generates test reports and coverage reports',
    ['clean:instrumented','clean:e2etestreports','clean:e2ecoveragereports',
      'instrument', 'copy:coverage', 'mochaTest:e2e', 
      'storeCoverage', 'e2e-test-coverage']
  );

  grunt.registerTask(
    'e2e-test-coverage', 'custom task to override makeReport path for e2e tests coverage', 
    function(){
      grunt.config.set('cfg.path.distCoverageReports', '<%=cfg.path.distE2ECoverageReports%>');
      grunt.task.run('makeReport');
    }
  );
  */

  grunt.registerTask(
    'test',
    'Execute both unit testing and E2E testing with code coverage using Jasmine, Karma and Protractor',
    [ 'unit-test']
  );

  grunt.registerTask(
   'base-build',
   'Base E2E integration build for other  environments - Dev-int,Nightly, QA & Production',
    [ 'clean:build', 'copy:vendor','copy:scripts','copy:data','copy:cert', 'uglify','clean:scripts']
  );

  grunt.registerTask(
      'on-commit',
      'On every file commit,executes default build and unit testing',
      [ 'default','unit-test']
  );

  grunt.registerTask(
    'dev-int',
    'Development integration build for development integration  environment',
    [ 'base-build']
  );

  grunt.registerTask(
   'nightly',
   'Development Integration Build for development integration environment',
    ['base-build','reports','test']
  );

  grunt.registerTask(
   'inspector',
   'Debugging through node-inspector',
    ['node-inspector']
  );

  grunt.registerTask(
   'for-ever',
   'CLI tool for ensuring that a given node script runs continuously',
    ['forever']
  );

  grunt.registerTask(
   'node-mon',
   'Monitors for any changes in your source and automatically restarts your server',
    ['nodemon']
  );

  /*
  grunt.registerTask(
    'prod',
    'Build for production release ',
      ['ngtemplates','base-build','clean:partials','replace:releaseCacheBustVer','precompress']
  );
*/
};