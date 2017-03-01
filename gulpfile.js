'use strict';

var requireDir = require('require-dir');
var bs = require('browser-sync').create('devServer');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });
