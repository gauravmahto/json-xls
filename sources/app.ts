/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

// Patch the path.
import './globals';

import { writeFileSync } from 'fs';
import { join } from 'path';

import options from 'sources/config/config.json';
import { getLangSheet, getResult } from 'sources/extract';
import { getAsJSON } from 'sources/utils';

const log = console;

let fileData;
try {

  fileData = getResult(getLangSheet(options), options);
  fileData = getAsJSON(fileData);

} catch (err) {

  log.error('Error:', err.message);

}

// Write JSON file.
if (typeof fileData !== 'undefined') {

  writeFileSync(join(global.PROJECT_DIST, options.outFile), fileData);

}
