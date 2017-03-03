'use strict';

const config = require('../config');
const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const inject = require('gulp-inject');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('sprite', function() {
  var svgs = gulp
    .src('./src/assets/vectors/icons/*.svg')
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents (filePath, file) {
      return file.contents.toString();
  }

  return gulp
    .src('index.html')
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest(config.tmpDir));
});

gulp.task('spriteProd', function() {
  var svgs = gulp
    .src('./src/assets/vectors/icons/*.svg')
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents (filePath, file) {
      return file.contents.toString();
  }

  return gulp
    .src('index.html')
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.tmpDir));
});
