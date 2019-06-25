const path = require('path')
const webpack = require('webpack')

const webConfig = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : 'none',
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
  },

  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
  ]
}

const cliConfig = {
  target: 'node',
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: 'none',
  performance: { hints: false },

  entry: {
    cli: './src/cli.js'
  },

  output: {
    filename: '[name].js',
    library: 'isPasswordCompromised',
    libraryExport: 'default',
    libraryTarget: 'commonjs',
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
  },

  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      banner: '#!/usr/bin/env node',
      entryOnly: true
    })
  ]
}

module.exports = [webConfig, cliConfig]
