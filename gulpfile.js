var gulp = require('gulp');
var Server = require('karma').Server;

// Run test once and exit
gulp.task('karma_test', function (done) {
  var karmaServer = new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
  karmaServer.start();
});

