import fsMock from 'fs';

import getFilesData from '../src/getFilesData';

jest.mock('fs');

describe('getFilesData', () => {
  beforeEach(() => {
    fsMock.readFileSync.mockClear();
  });

  it('extracts files data', () => {
    const FILE_PATH1 = '/path/to/file1.json';
    const FILE_PATH2 = '/path/to/file2.json';

    fsMock.__setMockFiles({
      [FILE_PATH1]: `{
        "propA": "foo",
        "propB": "bar",
        "propC": {
          "propA": "baz"
        }
      }`,
      [FILE_PATH2]: `{
        "propA": "foo",
        "propB": ["bar", "baz"]
      }`
    });

    expect(getFilesData([FILE_PATH1, FILE_PATH2])).toMatchSnapshot();
  });

  it('skips non .json files', () => {
    const FILE_PATH1 = 'file1.json';
    const FILE_PATH2 = 'file2.txt';

    fsMock.__setMockFiles({
      [FILE_PATH1]: '{}',
      [FILE_PATH2]: '{}'
    });

    getFilesData([FILE_PATH1, FILE_PATH2]);

    expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
    expect(fsMock.readFileSync).toHaveBeenCalledWith(FILE_PATH1, 'utf8');
  });
});
