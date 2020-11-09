const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除上一次的构建文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到文件单独打包
const TerserJSPlugin = require('terser-webpack-plugin'); //精简JS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //精简CSS
const CopyPlugin = require('copy-webpack-plugin'); //文件复制
const template = require('./webpack.config.template.js');
const merge = require('webpack-merge');

module.exports = merge(template, {
  //mode: 'production',
  mode: 'development',
  entry: {
    'main.min': './src/index.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'docs'),
    // library: 'index',
    // libraryTarget: 'umd'
  },
  externals: {

  },
  devServer: {
    host: '192.168.123.183',
    contentBase: './docs',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin(), //精简JS
      new OptimizeCSSAssetsPlugin() //精简CSS
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 清除上一次的构建文件
    new MiniCssExtractPlugin({ // 将CSS提取到文件单独打包
      filename: 'css/[name].css',
    }),
    new CopyPlugin({ // 复制文件
      patterns: [
        {from: 'public'},
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css|s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // 将CSS提取到文件单独打包
          'css-loader', // CSS构建
          'postcss-loader', // 优化CSS
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 10kb
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // babel核心
              '@babel/preset-react', // React环境
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import' // import()异步加载模块插件
            ],
          },
        },
      },
    ],
  },
});
