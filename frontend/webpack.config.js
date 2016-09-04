module.exports = (process.env.NODE_ENV === 'production')
    ? require('./webpack.config.production')
    : require('./webpack.config.development');