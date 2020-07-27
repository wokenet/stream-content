const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')

module.exports = (env, argv) => ({
  entry: {
    background: './src/background.js',
    overlay: './src/overlay.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/overlays.json', to: '[name].json' }],
    }),
    new HtmlWebpackPlugin({
      title: 'Woke Background',
      chunks: ['background'],
      filename: 'background.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Woke Overlay',
      chunks: ['overlay'],
      filename: 'overlay.html',
    }),
    argv.mode === 'production'
      ? new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/])
      : null,
  ].filter(Boolean),
  performance: {
    hints: false,
  },
})
