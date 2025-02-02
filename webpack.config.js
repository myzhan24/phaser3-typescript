var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/games/kerfuffle/game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/dist/',
    host: '127.0.0.1',
    port: 8080,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  },
  watch: true,
  plugins: [
    // new webpack.DefinePlugin({
    //   CANVAS_RENDERER: JSON.stringify(true),
    //   WEBGL_RENDERER: JSON.stringify(true)
    // }),
    new BrowserSyncPlugin({
      host: '127.0.0.1' || 'localhost',
      port: 8080 || 3000,
      server: {
        baseDir: ['./', './build']
      }
    })
  ],
};
