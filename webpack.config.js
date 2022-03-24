const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "index.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, '/node_modules')
        ],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: [
          path.resolve(__dirname, '/node_modules')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  devServer: {
    static: path.resolve(__dirname, './src'),
    port: 3010,
  },
  plugins: [new MiniCssExtractPlugin({
    filename: "style.bundle.css"
  })],
};