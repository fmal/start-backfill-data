import pipeline from '../../src/utils/pipeline';

describe('pipeline', () => {
  it('returns function', () => {
    expect(typeof pipeline(uppercase)).toBe('function');
  });

  it('pipes a value through two or more functions', () => {
    expect(pipeline(mirror, uppercase)('abc')).toBe('ABCCBA');

    const sqrtstr = pipeline(Math.sqrt, Math.round, String);
    expect(sqrtstr(10)).toBe('3');
  });

  it('given only one function, returns that function', () => {
    expect(pipeline(Math.sqrt)(19)).toBe(Math.sqrt(19));
  });
});

function mirror(value) {
  return value + value.split('').reverse().join('');
}

function uppercase(value) {
  return value.toUpperCase();
}
