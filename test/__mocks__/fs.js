const fs = require.requireActual('fs');

const mockFiles = new Map();

function __setMockFiles(newMockFiles) {
  mockFiles.clear();
  Object.keys(newMockFiles).forEach(filePath => {
    mockFiles.set(filePath, newMockFiles[filePath]);
  });
}

export default Object.assign({}, fs, {
  readFileSync: jest.fn(file => mockFiles.get(file)),
  writeFileSync: jest.fn(),
  __setMockFiles
});
