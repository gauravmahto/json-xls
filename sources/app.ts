/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

// Patch the path.
import './globals';

import { extractLocalizedStringsIntoAFile } from 'sources/main/actions';
import { getArgKeyVal, log } from 'sources/utilities';

const supportedProgramArgs = {
  ACTION: 'action'
};

enum actions {
  extractLocalizedStrings = 'extractLS'
}

const args: string[] = [];
// See, https://nodejs.org/docs/latest/api/all.html#modules_accessing_the_main_module
if (require.main === module) {

  // Called directly from CLI.
  args.push(...process.argv.slice(2));

} else {
  // Required by another module.
}

const action = getArgKeyVal(supportedProgramArgs.ACTION, args).val;

if (typeof action === 'undefined') {

  log.error('Please provide the action argument.');

} else {

  switch (action) {

    case actions.extractLocalizedStrings:
      extractLocalizedStringsIntoAFile();
      break;

    default:
      log.error('Invalid action provided.');

  }

}
