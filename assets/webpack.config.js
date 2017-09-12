const path = require('path')

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './js/app.js'),
  ],
  output: {
    path: path.resolve(__dirname, '../priv/static/js'),
    filename: 'app.js',
    publicPath: 'http://localhost:8080/js'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: 'babel-loader'
      },
    ],
  },
}
