'use strict';

const bs = require('browser-sync').get('devServer');
const config = require('../config');
const gulp = require('gulp');

// Static server
gulp.task('serve', ['clean', 'scripts', 'styles'], function() {
  bs.init({
    open: 'external',
    port: 3001,
    xip: true,
    server: {
      baseDir: [
        config.rootDir,
        config.tmpDir
      ]
    }
  });

  // watch source files
  bs.watch(config.rootDir + 'index.html', bs.reload);
  bs.watch(config.scriptsCompiledDir, bs.reload);
  gulp.watch(config.scriptsSrcDir + '**/*.js', ['scripts']);
  gulp.watch(config.stylesSrcDir + '**/*.scss', ['styles']);

  // watch compiled files
  bs.watch(config.tmpDir).on('change', bs.reload);
});
