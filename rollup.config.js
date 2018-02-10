import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH

var pages = [
  'admin',
  'oauth-grant',
  'sign-in',
]

var plugins = [
  resolve(), // tells Rollup how to find in node_modules
  commonjs(), // converts to ES modules
  production && uglify() // minify, but only in production
]

export default pages.map( page => ({
  input: `client/pages/${page}.js`,
  output: {
    file: `client/pages/${page}.bundle.js`,
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: plugins,
}))
