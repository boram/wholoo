const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

const APP_DIR = path.resolve(__dirname)
const nodeEnv = process.env.MIX_ENV || 'dev'

const config = {
  context: __dirname,
  entry: ['babel-polyfill', './js/app.js', './css/stylesheet.css'],
  output: {
    path: path.resolve(__dirname, '../priv/bundles'),
    filename: 'js/app.js',
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/stylesheet.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: path.resolve(__dirname, '../priv/bundles')
    }])
  ],
  resolve: {
    alias: {
      components: path.join(APP_DIR, '/js/components'),
      theme: path.join(APP_DIR, '/js/theme'),
    }
  }
}

if (nodeEnv == 'prod') {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ])
}

module.exports = config
