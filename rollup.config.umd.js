import babel from 'rollup-plugin-babel'
import merge from 'deepmerge'
import base, { babelrc } from './rollup.config.base'

export default merge(base, {
  output: {
    file: 'lib/share.umd.js',
    format: 'umd',
  },
  plugins: [
    babel({
      babelrc: false,
      presets: babelrc.presets,
      plugins: babelrc.plugins,
    }),
  ],
})
