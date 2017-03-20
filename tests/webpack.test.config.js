let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        test: [path.join(__dirname, 'webpack.test.bootstrap.js')]
    },

    output: {
        path: path.join(__dirname, '../dist/'),
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['src', 'node_modules']
    },

    node: {
        fs: 'empty'
    }
};