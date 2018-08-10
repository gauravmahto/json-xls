/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

// Patch the path.
import './globals';

import assert from 'assert';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { readFile, WorkBook, WorkSheet } from 'xlsx';

// Get the options.
import options from './config/config.json';

// Create the workbook.
const workBook: WorkBook = readFile(join(global.PROJECT_DIST, options.excelSheet));

// Get the lang sheet.
const langSheet: WorkSheet = workBook.Sheets[options.langSheetName];

// Read and parse the excel sheet.
function getResult(): any {

  const langData = {};
  const langMap = options.langMap;

  assert(options.startRows.length === options.endRows.length, 'Start rows !== End rows');

  // Loop over rows.
  options.startRows.forEach((startRow, index) => {

    const endRow = options.endRows[index];
    assert(startRow <= endRow, 'Start row must be less than or equal to end row');

    const langMapKeys = Object.keys(langMap);

    assert(options.primaryLang === langMap[langMapKeys[0]],
      'First key\'s value of langMap must be equal to primaryLang');

    // Loop between start and end row.
    for (let row = startRow; row <= endRow; ++row) {

      // Create top level key name.
      const candidate = langSheet[langMapKeys[0] + row]['v'];

      // Loop over all the lang for particular string.
      for (const langMapKey of langMapKeys) {

        if (typeof langData[candidate] !== 'object') {

          // Create the top level key.
          langData[candidate] = {

            [langMap[langMapKey]]: langSheet[langMapKey + row]['v']

          };

        } else {

          // Create children.
          langData[candidate][langMap[langMapKey]] = langSheet[langMapKey + row]['v'];

        }

      }

    }

  });

  // Return the populated result object.
  return langData;

}

// Get JSON data.
function getAsJSON(data: object): string {

  return JSON.stringify(data, null, 2);

}

// Write JSON file.
writeFileSync(join(global.PROJECT_DIST, options.outFile), getAsJSON(getResult()));
