const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (environment) => {
  let OUTPUT_PATH = environment === 'development' ? './public' : './build'

  let config = {
    context: path.resolve(__dirname, './src'),
    entry: './index.ts',
    output: {
      path: path.resolve(__dirname, OUTPUT_PATH),
      filename: '[name].[hash:8].js'
    },
    resolve: {
      alias: {
        config: path.resolve(__dirname, './src', './environments', `${environment}.js`)
      },
      extensions: [ '.js', '.json', '.jsx', '.ts', '.tsx']
    },
    mode: environment,
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
                {
                    loader: 'babel-loader'
                },
                {
                    loader: 'awesome-typescript-loader',
                    options : {
                        useCache: true,
                        forceIsolatedModules: true
                    }
                }
            ]
        },
        {
          exclude: /node_modules/,
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'raw-loader'
            }
          ]
        },
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.css$/,
            /\.json$/,
            /\.svg$/
          ],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(OUTPUT_PATH),
      new HtmlWebpackPlugin({
        inject: true,
        template: './index.html'
      }),
      new CaseSensitivePathsPlugin()
    ],
    devServer: {
      compress: true,
      clientLogLevel: 'none',
      contentBase: './public',
      overlay: true,
      hot: false,
      quiet: true,
      disableHostCheck: true,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      }
    }
  }

  switch (environment) {
    case 'development':
      config.plugins.push(new BundleAnalyzerPlugin({
        openAnalyzer: false // open on :8888
      }))
      break
    case 'production':
      break
    default:
  }

  return config
}
