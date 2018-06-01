import babel from 'rollup-plugin-babel'
import merge from 'deepmerge'
import external from '@yelo/rollup-node-external'
import base, { babelrc } from './rollup.config.base'

// compile some libraries of sindresorhus with babel, because these are using es2015+ syntax but with commonjs.
export default merge(base, {
  output: {
    file: 'lib/share.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      babelrc: false,
      presets: babelrc.presets,
      plugins: merge(babelrc.plugins, [
        'transform-runtime',
      ]),
      runtimeHelpers: true,
    }),
  ],
  external: external({
    whitelist: ['p-timeout'],
  }),
})
