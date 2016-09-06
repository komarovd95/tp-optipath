const webpack = require('webpack');
const config = require('./webpack.config.base');

config.output.filename = 'index-[chunkhash:10].js';

config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false,
            screw_ie8: true
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    })
];

config.module.loaders[0].babelrc = false;

module.exports = config;
