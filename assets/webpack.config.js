const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const APP_DIR = path.resolve(__dirname)

module.exports = {
  context: path.resolve(__dirname),
  entry: ['babel-polyfill', './js/app.js', './css/stylesheet.css'],
  output: {
    path: path.resolve(__dirname, '../priv/static'),
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
          use: 'css-loader',
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/stylesheet.css',
      allChunks: true,
    }),
  ],
  resolve: {
    alias: {
      components: path.join(APP_DIR, '/js/components'),
      theme: path.join(APP_DIR, '/js/theme'),
    }
  }
}
