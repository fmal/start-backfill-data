import path from 'path';

import backfillFilesData from '../src/backfillFilesData';
import getFilesData from '../src/getFilesData';

function createPath(name) {
  return path.join(__dirname, '__fixtures__', name);
}

function createFakeFilesData() {
  const fixtures = [
    createPath('translations-en.json'),
    createPath('translations-pl.json')
  ];
  return getFilesData(fixtures);
}

describe('backfillFilesData', () => {
  it('backfills files data', () => {
    const filesData = createFakeFilesData();

    expect(backfillFilesData(filesData)).toMatchSnapshot();
  });
});
