import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace';
import typescriptPlugin from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const { NODE_ENV, NO_TS } = process.env;

const isDev = NODE_ENV === 'development' || !NODE_ENV;

let input = './src/index.tsx';
let external = [
  'react',
  'react-dom',
  'prop-types'
];

const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM'
};

const plugins = [
  typescriptPlugin(),
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
            'render'
        ],
        'node_modules/react/react.js': [
            'React',
            'Component',
            'PropTypes',
            'ComponentClass',
            'PureComponent',
            'createElement'
        ]
    }
  })
];

if (isDev) {
  input = './example/index.tsx';
  plugins.push(serve({
    contentBase: ['dist', 'example']
  }));
  external = [];
}

export default {
  input,
  external,
  globals,
  plugins,
  watch: {
    clearScreen: true,
    include: [
      'src/**',
      'example/**'
    ]
  },
  output: [
    {
      file: 'dist/ReactVariants.js',
      format: 'umd',
      name: 'ReactVariants',
      sourcemap: true
    }
  ]
};