const webpack = require('webpack');
const config = require('./webpack.config.base');

config.entry.app = ['webpack/hot/dev-server', 'webpack-hot-middleware/client'].concat(config.entry.app);

config.output.filename = '[name].js';

config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
];

config.devtool = 'cheap-module-inline-source-map';

config.debug = true;

config.module.loaders[0].loaders = config.module.loaders[0].loaders.concat(['webpack-module-hot-accept']);

module.exports = config;
// module.exports = {
//     entry: {
//         app: [
//             'webpack/hot/dev-server',
//             'webpack-hot-middleware/client',
//             path.join(process.cwd(), "src/js/", 'app.jsx')
//         ]
//     },
//     output: {
//         path: path.join(process.cwd(), paths.build),
//         publicPath: '/js/',
//         filename: '[name].js'
//     },
//     plugins: [
//         new webpack.optimize.OccurenceOrderPlugin(),
//         new webpack.NoErrorsPlugin(),
//         new webpack.HotModuleReplacementPlugin()
//     ],
//     resolve: {
//         extensions: ['', '.js', '.jsx']
//     },
//     watch: true,
//     devtool: 'cheap-module-inline-source-map',
//     debug: true,
//     module: {
//         loaders: [{
//             test: /\.jsx?/,
//             exclude: /(node_modules|bower_components)/,
//             include: [path.join(process.cwd(), "src/js/")],
//             loaders: ['babel?presets[]=react,presets[]=es2015', 'webpack-module-hot-accept']
//         }]
//     }
// };