let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        test: path.join(__dirname, 'webpack.test.bootstrap.js')
    },

    output: {
        path: path.join(__dirname, '../dist/'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.*.spec.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['src', 'node_modules']
    },

    node: {
        fs: 'empty'
    }
};