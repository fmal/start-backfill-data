import fs from 'fs';

import { pipeline } from './utils/index';
import getFilesData from './getFilesData';
import backfillFilesData from './backfillFilesData';

export default (/* options */) => input => {
  return function backfillDataTask(log) {
    return new Promise(resolve => {
      pipeline(
        getFilesData,
        backfillFilesData,
        writeFiles,
        logMessagesFactory(log)
      )(input);

      resolve(input);
    });
  };
};

function writeFiles(input) {
  input.filesData.forEach(fileData => {
    fs.writeFileSync(fileData.path, JSON.stringify(fileData.contents, null, 2));
  });

  return input;
}

function logMessagesFactory(log) {
  return function logMessages(input) {
    input.messagesData.forEach(msgData => {
      const msgContent = [
        `Field with key \`${msgData.key}\` was not present in '${msgData.to}', it has been backfilled with '${msgData.from}' value "${msgData.backfill}"`,
        `Go to ${msgData.toPath} to change the value.`
      ].join('\n');

      log(msgContent);
    });
  };
}
