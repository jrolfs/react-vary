import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace';
import typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript'

const pkg = require('./package.json');

const { NODE_ENV } = process.env;
console.log('ROLLUP ENV', NODE_ENV);

const isDev = NODE_ENV === 'development';

let entry = './src/index.tsx';
const plugins = [
  typescriptPlugin({
    typescript,
    importHelpers: true
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  resolve(),
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: 'node_modules/**',
    namedExports: {
        // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
        // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
        // Just add the mentioned file / export here
        'node_modules/react-dom/index.js': [
            'render',
        ],
        'node_modules/react/react.js': [
            'Component',
            'PropTypes',
            'createElement',
        ],
    },
  })
];

let external = [
  'react',
  'react-dom',
  'prop-types'
];

if (isDev) {
  entry = './example/index.tsx';
  plugins.push(serve('dist'));
  external = [];
}

export default {
  entry,
  external,
  plugins,
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'reactVariants',
      name: 'reactVariants',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
}