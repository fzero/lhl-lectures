const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/js/index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, '../build/'),
    filename: 'js/app-generated.js'
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        include: [
          path.resolve(__dirname, 'js')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'scss')
        ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: './client/index.html'
    }),
    new CopyWebpackPlugin([{
      from: './client/images/**/*',
      to: 'images/',
      flatten: true
    }])
  ]
}
