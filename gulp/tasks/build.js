'use strict';

const gulp = require('gulp');

gulp.task('build', ['sprite', 'scripts', 'styles']);

gulp.task('buildProd', ['spriteProd', 'scriptsProd', 'stylesProd']);
