const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: [
            path.join(process.cwd(), "src/js/", 'index.jsx')
        ]
    },
    output: {
        path: path.join(process.cwd(), "./build/"),
        publicPath: '/app/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            exclude: /(node_modules|bower_components)/,
            include: [path.join(process.cwd(), "src/js/")],
            loaders: ['babel?presets[]=react,presets[]=es2015']
        }]
    }
};