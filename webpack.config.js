const path = require('path')

const webConfig = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: 'source-map',
  performance: { hints: false },

  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].js',
    library: 'isPasswordCompromised',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}

module.exports = webConfig
