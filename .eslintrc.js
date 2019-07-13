module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'mocha': true,
    'es6': true
  },
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'no-new': 0,
    'indent': ['error', 4, {'SwitchCase': 1}],
  }
}
