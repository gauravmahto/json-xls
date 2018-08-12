/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

import options from 'sources/config/config.json';
import { getLangSheet, getResult } from 'sources/main/extract';
import { getAsJSON, log } from 'sources/utilities';

export function extractLocalizedStringsIntoAFile(): void {

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

  } else {

    log.error('Empty extracted data.');

  }

}
