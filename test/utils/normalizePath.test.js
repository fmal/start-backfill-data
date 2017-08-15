import normalizePath from '../../src/utils/normalizePath';

describe('normalizePath', () => {
  it('normalizes "foo\\bar\\baz"', () => {
    expect(normalizePath('foo\\bar\\baz')).toBe('foo/bar/baz');
  });

  it('normalizes "C:\\foo/bar\\baz\\"', () => {
    expect(normalizePath('C:\\foo/bar\\baz\\')).toBe('C:/foo/bar/baz/');
  });
});
