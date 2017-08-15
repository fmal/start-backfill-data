import flattenObject from '../../src/utils/flattenObject';
import { PATH_SEPARATOR } from '../../src/constants.js';

function joinPath(path) {
  return path.join(PATH_SEPARATOR);
}

describe('flattenObject', () => {
  it('flattens nested structure into a single-depth object', () => {
    const flattenedObject = flattenObject({
      propA: 'foo',
      propB: 'bar',
      propC: {
        propA: 'foo',
        propB: 'bar',
        propC: {
          propA: 'foo'
        }
      }
    });
    const expected = {
      propA: 'foo',
      propB: 'bar',
      [joinPath(['propC', 'propA'])]: 'foo',
      [joinPath(['propC', 'propB'])]: 'bar',
      [joinPath(['propC', 'propC', 'propA'])]: 'foo'
    };

    expect(flattenedObject).toEqual(expected);
  });

  it('properly handles arrays', () => {
    const flattenedObject = flattenObject([
      'foo',
      {
        propA: 'foo',
        propB: 'bar',
        propC: [
          'foo',
          'bar',
          'baz',
          {
            propD: 'qux'
          }
        ]
      },
      {
        propA: 'foo'
      }
    ]);
    const expected = {
      '0': 'foo',
      [joinPath(['1', 'propA'])]: 'foo',
      [joinPath(['1', 'propB'])]: 'bar',
      [joinPath(['1', 'propC', '0'])]: 'foo',
      [joinPath(['1', 'propC', '1'])]: 'bar',
      [joinPath(['1', 'propC', '2'])]: 'baz',
      [joinPath(['1', 'propC', '3', 'propD'])]: 'qux',
      [joinPath(['2', 'propA'])]: 'foo'
    };

    expect(flattenedObject).toEqual(expected);
  });
});
