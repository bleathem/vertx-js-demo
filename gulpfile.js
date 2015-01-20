'use strict';

process.env.VERTX_MODS = 'vertx_modules';

var gulp = require('gulp');

var opts = {
  module: {
    group: 'ca.bleathem',
    artifact: 'demo',
    version: '0.0.1'
  },
  paths: {
    src: 'src/**/*',
    dist: 'dist'
  }
};

opts.module.name = opts.module.group + '~' + opts.module.artifact + '~' + opts.module.version + '.zip';
opts.paths.cp = 'src';

require('./tasks/vertx.gulp.js')(gulp, opts);
require('./tasks/zip.gulp.js')(gulp, opts);

gulp.task('default', ['vertx']);
