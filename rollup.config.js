import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

import { terser } from 'rollup-plugin-terser'

const extensions = ['.js']

export default [
  {
    input: {
      index: 'src/index.js',
      crypto: 'src/crypto.js',
      decoder: 'src/decoder.js',
      error: 'src/error.js',
      signer: 'src/signer.js',
      utils: 'src/utils.js',
      verifier: 'src/verifier.js'
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        babelHelpers: 'runtime',
        include: ['src/**/*']
      }),
      terser({
        module: true,
        compress: true
      })
    ],
    output: [
      {
        dir: 'dist/esm/',
        format: 'esm'
      },
      {
        dir: 'dist/cjs/',
        format: 'cjs'
      }
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules // eslint-disable-line global-require
    )
  }
]
