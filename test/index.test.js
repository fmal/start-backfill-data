import fsMock from 'fs';

import task from '../src';

jest.mock('fs');

describe('backfillData task', () => {
  it('returns function', () => {
    expect(typeof task).toBe('function');
  });

  it('returns function -> function', () => {
    expect(typeof task()).toBe('function');
  });

  it('returns function -> function -> function', () => {
    expect(typeof task()([])).toBe('function');
  });

  it('returns function -> function -> function -> Promise', () => {
    expect(task()([])()).toBeInstanceOf(Promise);
  });

  describe('returned Promise', () => {
    beforeEach(() => {
      fsMock.writeFileSync.mockClear();
    });

    it('rejects when geting files data fails', () => {
      jest.resetModules().doMock('../src/getFilesData', () => () => {
        throw 'test error';
      });
      const rejectingTask = require('../src').default;

      expect.assertions(2);

      return rejectingTask()(['some-file.json'])()
        .catch(e => {
          expect(e).toMatch('test error');
        })
        .then(() => {
          expect(fsMock.writeFileSync).not.toHaveBeenCalled();
        });
    });

    it('fullfils after succesfull read/write', () => {
      const FILE = 'some-file.json';
      fsMock.__setMockFiles({ [FILE]: '{}' });

      expect.assertions(3);

      return task()([FILE])().then(input => {
        expect(input).toEqual([FILE]);
        expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
        expect(fsMock.writeFileSync).toHaveBeenCalledTimes(1);
      });
    });
  });
});
