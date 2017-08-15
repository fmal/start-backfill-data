import path from 'path';

import { set, normalizePath } from './utils/index';

export default function backfillFilesData(filesData) {
  const CWD = process.cwd();
  const messagesData = [];

  filesData.forEach(file1Data => {
    Object.keys(file1Data.flattenedContents).map(key => {
      filesData.forEach(file2Data => {
        if (file1Data.path !== file2Data.path) {
          if (!(key in file2Data.flattenedContents)) {
            messagesData.push({
              key,
              from: file1Data.name,
              to: file2Data.name,
              toPath: normalizePath(path.relative(CWD, file2Data.path)),
              backfill: file1Data.flattenedContents[key]
            });

            set(file2Data.contents, key, file1Data.flattenedContents[key]);
          }
        }
      });
    });
  });

  return {
    filesData,
    messagesData
  };
}
