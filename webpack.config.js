const path = require('path')

const webConfig = {
  mode: 'production',
  performance: { hints: false },

  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].js',
    library: 'password-leak',
    globalObject: 'this',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  }
}

module.exports = webConfig
