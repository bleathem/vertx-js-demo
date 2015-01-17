'use strict';

/**
 * A gulp task that build the vert.x zip module for this project
 **/

var zip = require('gulp-zip');

module.exports = function(gulp, opts) {
  return gulp.task('zip', function() {
    return gulp.src(opts.paths.src)
      .pipe(zip(opts.module.name))
      .pipe(gulp.dest(opts.paths.dist));
  });
};
