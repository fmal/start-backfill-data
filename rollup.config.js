import { readFileSync } from 'fs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-post-replace';

const babelRC = JSON.parse(readFileSync('.babelrc', 'utf-8'));
const babelOptions = Object.assign(
  {
    exclude: 'node_modules/**',
    babelrc: false
  },
  babelRC,
  {
    presets: (babelRC.presets || []).map(preset => {
      if (Array.isArray(preset) && preset[0] === 'env') {
        return ['env', Object.assign({}, preset[1], { modules: false })];
      }

      return preset;
    })
  }
);

export default {
  entry: 'src/index.js',
  format: 'cjs',
  external: ['fs', 'path'],
  interop: false,
  plugins: [
    babel(babelOptions),
    replace({
      'module.exports = index;': '',
      'var index =': 'module.exports ='
    })
  ]
};
