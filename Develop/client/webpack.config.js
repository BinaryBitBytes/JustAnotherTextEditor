const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js', //added database to module exports
      header: './src/js/header.js', //added header to module exports
      editor:'./src/js/editor.js' //added editor to module exports
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new InjectManifest({
        swDest: 'src-sw.js',
        swSrc: './src-sw.js',
      }),
      new HtmlWebpackPlugin({
        title:'Contact Cards',
        templates:'./index.html',
      }),
      new WebpackPwaManifest({
        inject: true,
        name: 'Just Another Text Editor',
        description: 'A JavaScript text editor in a progressive web application format',
        theme_color: '#223ea3',
        fingerprints: false,
        background_color: '#5a22a3',
        publicPath:'./',
        start_url: './',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          destination: path.join('assets','icons'),
          sizes: [64,96,128,160,192,256,288,384,512],
        },
      ],
      }),
    ],

    module: {
      rules: [
        {
          use:['style-loader','css-loader'],
          test: /\.css$/i,
        },
        {
          exclude: /node_modules/,
          test: /\.m?js$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
              presets:['@babel/preset-env'],
            }
          }
        }
        
      ],
    },
  };
};
