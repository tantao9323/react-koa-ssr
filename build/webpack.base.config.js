const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { resolve } = require('./utils');

module.exports = (config) => {
  const baseConfig = {
    entry: resolve('app/main.js'),
    output: {
      path: resolve('dist'),
      publicPath: config.publicPath,
      filename: config.noHash ? 'js/[name].js' : 'js/[name].[chunkhash].js',
      chunkFilename: config.noHash ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [resolve('node_modules')],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-transform-runtime',
                ['@babel/plugin-proposal-class-properties', { loose: false }],
              ],
            },
          },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.css/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][local]-[hash:base64:5]',
              },
            },
          ],
        },
        {
          test: /\.less/,
          include: [resolve('app')],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][local]-[hash:base64:5]',
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: `url-loader?limit=1000&name=${config.imagePath}${
            config.noHash ? '[name].[ext]' : '[name].[hash:8]'
          }.[ext]`,
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: `file-loader?name=${config.publicPath}fonts/${
            config.noHash ? '[name].[ext]' : '[name].[hash:8]'
          }.[ext]`,
        },
      ],
    },
    resolve: {
      alias: {
        '@': resolve('app'),
      },
      extensions: ['.js', '.jsx'],
    },
    externals: {},
    plugins: [
      new MiniCssExtractPlugin({
        filename: config.noHash ? 'css/[name].css' : 'css/[name].[chunkhash].css',
      }),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  };

  return baseConfig;
};
