'use strict';

const gulp = require('gulp');
const config = require('../config');
const rollup = require('rollup').rollup;
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');

gulp.task('scripts', function() {
  return rollup({
    entry: config.scriptsSrc,
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        include: 'node_modules/**',
      }),
      eslint({
        exclude: [
          'src/styles/**',
        ]
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      sourceMap: true,
      dest: config.scriptsCompiled,
    });
  });
});
