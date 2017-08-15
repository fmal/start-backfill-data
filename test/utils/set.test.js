import set from '../../src/utils/set';
import { PATH_SEPARATOR } from '../../src/constants';

describe('set', () => {
  it('sets existing property using dot-notation', () => {
    const obj1 = { a: { aa: { aaa: 2 } } };

    set(obj1, ['a', 'aa', 'aaa'].join(PATH_SEPARATOR), 3);

    expect(obj1).toEqual({ a: { aa: { aaa: 3 } } });

    const obj2 = { a: { aa: { aaa: 2 } } };

    set(obj2, ['a', 'aa'].join(PATH_SEPARATOR), { bbb: 7 });

    expect(obj2).toEqual({ a: { aa: { bbb: 7 } } });
  });

  it('sets non-existant property using dot-notation', () => {
    const obj1 = {};

    set(obj1, ['a', 'aa', 'aaa'].join(PATH_SEPARATOR), 4);

    expect(obj1).toEqual({ a: { aa: { aaa: 4 } } });

    const obj2 = {};

    set(obj2, ['a', 'aa'].join(PATH_SEPARATOR), { bbb: 7 });

    expect(obj2).toEqual({ a: { aa: { bbb: 7 } } });
  });
});
