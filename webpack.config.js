const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('./config/setup')

module.exports = {
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: [
              ['@babel/plugin-proposal-class-properties'],
              ['transform-define', env],
              ['@babel/plugin-transform-runtime'],
              ['module-resolver', {
                alias: {
                  initialState: './src/state/store/initialState',
                  config: './config/client'
                }
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  node: {
    fs: 'empty'
  }
}
