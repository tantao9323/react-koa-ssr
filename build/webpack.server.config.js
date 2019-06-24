const merge = require('webpack-merge');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');
const config = require('./config')[process.env.NODE_ENV];
const { resolve } = require('./utils');

module.exports = merge(baseConfig(config), {
  target: 'node',
  devtool: config.devtool,
  entry: resolve('app/server-entry.js'),
  output: {
    filename: 'js/server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env),
      'process.env.REACT_ENV': '"server"',
    }),
  ],
});
