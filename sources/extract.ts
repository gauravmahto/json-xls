/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

import { join } from 'path';

import { readFile, WorkBook, WorkSheet } from 'xlsx';

// Only for static typing.
import optionsType from 'sources/config/config.json';

export function getLangSheet(options: typeof optionsType): WorkSheet {

  // Create the workbook.
  const workBook: WorkBook = readFile(join(global.PROJECT_DIST, options.excelSheet));

  // Get the lang sheet.
  const langSheet: WorkSheet = workBook.Sheets[options.langSheetName];

  // Return the langSheet.
  return langSheet;

}

// Read and parse the excel sheet.
export function getResult(langSheet: WorkSheet, options: typeof optionsType): any {

  const langData = {};
  const langMap = options.langMap;

  if (options.startRows.length !== options.endRows.length) {

    throw new Error('startRows and endRows must be of same size');

  }

  // Loop over rows.
  options.startRows.forEach((startRow, index) => {

    const endRow = options.endRows[index];
    if (endRow < startRow) {

      throw new Error('Start row must be less than or equal to end row');

    }

    const langMapKeys = Object.keys(langMap);

    if (options.primaryLang !== langMap[langMapKeys[0]]) {

      throw new Error('First key\'s value of langMap must be equal to primaryLang');

    }

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
