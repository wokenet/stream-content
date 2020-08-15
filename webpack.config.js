const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const OverlayManifestPlugin = require('./src/OverlayManifestPlugin')

module.exports = (env, argv) => ({
  entry: {
    background: './src/background.js',
    overlay: './src/overlay.js',
    play: './src/play.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'https://stay.woke.net/overlays/',
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
    new OverlayManifestPlugin(),
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
    new HtmlWebpackPlugin({
      title: 'Woke Play Overlay',
      chunks: ['play'],
      filename: 'play.html',
    }),
    argv.mode === 'production'
      ? new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/])
      : null,
  ].filter(Boolean),
  performance: {
    hints: false,
  },
})
