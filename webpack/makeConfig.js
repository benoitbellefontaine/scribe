'use strict'

const path = require('path')
const fs  = require('fs');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

function makeWebpackConfig (options) {
  let entry, plugins, devtool

  if (options.prod) {
    entry = [
      path.resolve(__dirname, '../app/index.js')
    ]

    plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      })
    ]
  } else {
    devtool = 'cheap-module-source-map'

    entry = [
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, '../app/index.js')
    ]

    plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
  }

  return {
    devtool: devtool,
    entry: entry,
    output: { // Compile into `js/build.js`
      path: path.resolve(__dirname, '../', 'build'),
      filename: 'js/bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/, // Transform all .js files required somewhere within an entry point...
          loader: 'babel', // ...with the specified loaders...
          exclude: path.join(__dirname, '../', '/node_modules/'), // ...except for the node_modules folder.
          query: {presets: ['es2015']},
          target: 'node'
        }, 
        {
          test: /\.css$/, // Transform all .css files required somewhere within an entry point...
          loaders: ['style-loader', 'css-loader', 'postcss-loader'] // ...with PostCSS
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel', 
          query: {
            plugins: [
              ['import', { libraryName: "antd", style: true }]
            ]
          }
        },
        //{
          //test: /\.less$/,
          //loader: 'style-loader!css-loader!less-loader',
          //options: { javascriptEnabled: true, modifyVars: themeVariables }
          //query: {
          //  modifyVars: themeVariables
          //}
        //},
      ],
    },
    target: 'node',
    plugins: plugins,
    postcss: function () {
      return [
        require('postcss-import')({
          onImport: function (files) {
            files.forEach(this.addDependency)
          }.bind(this)
        }),
        require('postcss-simple-vars')(),
        require('postcss-focus')(),
        require('autoprefixer')({
          browsers: ['last 2 versions', 'IE > 8']
        }),
        require('postcss-reporter')({
          clearMessages: true
        })
      ]
    },
    target: 'web',
    stats: false,
    progress: true,
    node: {
      fs: "empty"
    }
  }
}

module.exports = makeWebpackConfig
