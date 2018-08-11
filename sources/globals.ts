/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

import * as path from 'path';

global.PROJECT_SOURCE_ROOT = path.resolve(__dirname);
global.PROJECT_ROOT = path.resolve(global.PROJECT_SOURCE_ROOT, '..');
global.PROJECT_AFTER_BUILD_ROOT = path.resolve(global.PROJECT_SOURCE_ROOT, '..', '..');
global.PROJECT_DIST = path.resolve(global.PROJECT_AFTER_BUILD_ROOT, 'dist');

// Path require base path.
require('app-module-path')  // tslint:disable-line
  .addPath(global.PROJECT_ROOT);
