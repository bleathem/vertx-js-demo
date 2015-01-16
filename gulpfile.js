'use strict';

var gulp = require('gulp');

var opts = {};

require('./tasks/vertx.gulp.js')(gulp, opts);

gulp.task('default', ['vertx']);
