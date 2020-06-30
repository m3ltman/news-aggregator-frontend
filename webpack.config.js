const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssNano = require('cssnano');

module.exports = {
  entry: {
    main: './src/index.js',
    news: './src/pages/news/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Всё JS файлы
        use: { loader: 'babel-loader' }, // Обрабатываются пакетом babel-loader
        exclude: /node_modules/, // кроме папки node_modules
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              svgo: {
                enabled: true,
              },
              pngquant: {
                quality: [0.85, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 85,
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'vendor/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles/[name].[contenthash].css' }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: CssNano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false, // стили НЕ нужно прописывать внутри HTML тегов
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/news/index.html',
      filename: './news/index.html',
    }),
    new WebpackMd5Hash(),
  ],
};
