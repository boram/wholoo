const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const APP_DIR = path.resolve(__dirname)

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './css/app.css'),
    path.resolve(__dirname, './js/app.js')
  ],
  output: {
    path: path.resolve(__dirname, '../priv/static'),
    filename: 'js/app.js',
    publicPath: 'http://localhost:8080/'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/app.css')
  ],
  resolve: {
    alias: {
      components: path.join(APP_DIR, '/js/components'),
      theme: path.join(APP_DIR, '/js/theme')
    }
  }
}
