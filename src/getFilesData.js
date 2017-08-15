import fs from 'fs';
import path from 'path';

import { flattenObject } from './utils/index';

export default function getFilesData(filePaths) {
  return filePaths.reduce((filesData, filePath) => {
    const pathInfo = path.parse(filePath);

    if (pathInfo.ext !== '.json') {
      return filesData;
    }

    const contents = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    filesData.push({
      contents,
      flattenedContents: flattenObject(contents),
      path: filePath,
      name: pathInfo.name
    });

    return filesData;
  }, []);
}
