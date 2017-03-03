'use strict';

const bs = require('browser-sync').get('devServer');
const config = require('../config');
const gulp = require('gulp');

// Static server
gulp.task('serve', ['sprite', 'scripts', 'styles'], function() {
  bs.init({
    open: 'external',
    port: 3001,
    xip: true,
    server: {
      baseDir: [
        config.tmpDir
      ]
    }
  });

  // watch source files
  bs.watch(config.tmpDir + 'index.html', bs.reload);
  bs.watch(config.scriptsCompiledDir, bs.reload);
  gulp.watch([config.spritesSrcDir + '**/*.js', config.rootDir + 'index.html'], ['sprites']);
  gulp.watch(config.scriptsSrcDir + '**/*.js', ['scripts']);
  gulp.watch(config.stylesSrcDir + '**/*.scss', ['styles']);

  // watch compiled files
  bs.watch(config.tmpDir).on('change', bs.reload);
});
