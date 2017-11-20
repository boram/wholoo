const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

const APP_DIR = path.resolve(__dirname)
const STATIC_ASSETS_DIR = path.resolve(__dirname, 'static')
const PUBLIC_ASSETS_DIR = path.resolve(__dirname, '../priv/static')

const config = {
  context: __dirname,
  entry: ['babel-polyfill', './js/app.js', './css/stylesheet.css'],
  output: {
    path: PUBLIC_ASSETS_DIR,
    filename: 'js/app.js',
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
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/images/',
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/fonts/',
          }
        }],
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/stylesheet.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{
      from: STATIC_ASSETS_DIR,
      to: PUBLIC_ASSETS_DIR,
    }])
  ],
  resolve: {
    alias: {
      config: path.join(APP_DIR, '/js/config'),
      theme: path.join(APP_DIR, '/js/theme'),
      components: path.join(APP_DIR, '/js/components'),
      common: path.join(APP_DIR, '/js/components/common'),
      pages: path.join(APP_DIR, '/js/components/pages'),
      images: path.join(APP_DIR, '/static/images'),
    }
  }
}

const nodeEnv = process.env.MIX_ENV || 'dev'
if (nodeEnv == 'prod') {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ])
}

module.exports = config
