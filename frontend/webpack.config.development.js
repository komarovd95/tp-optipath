const webpack = require('webpack');
const config = require('./webpack.config.base');

config.entry.app = ['webpack/hot/dev-server', 'webpack-hot-middleware/client'].concat(config.entry.app);

config.output.filename = 'index.js';

config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
];

config.devtool = 'cheap-module-inline-source-map';

config.debug = true;

config.module.loaders[0].loaders = config.module.loaders[0].loaders.concat(['webpack-module-hot-accept']);

module.exports = config;