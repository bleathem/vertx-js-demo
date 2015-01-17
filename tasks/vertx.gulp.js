'use strict';

/**
 * A gulp task that uses a node child process to start a vert.x instance
 **/

var spawn = require('child_process').spawn
  , gutil = require('gulp-util');

module.exports = function(gulp, opts) {
  gulp.task('vertx', ['zip'], function(done) {
    var child = spawn('vertx', ['runmod', opts.module.name, '-cp', opts.paths.cp ], {cwd: process.cwd()}),
        stdout = '',
        stderr = '';

    child.stdout.setEncoding('utf8');

    child.stdout.on('data', function (data) {
        stdout += data;
        gutil.log(data.slice(0, data.length - 1));
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        stderr += data;
        gutil.log(gutil.colors.red(data.slice(0, data.length - 1)));
        gutil.beep();
    });

    child.on('close', function(code) {
        gutil.log('Done with exit code', code);
        gutil.log('You access complete stdout and stderr from here'); // stdout, stderr
        done();
    });
  });
};
