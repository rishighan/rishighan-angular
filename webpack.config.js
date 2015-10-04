// Webpack config

var webpack = require('webpack');
var path = require('path');

var APP = __dirname + '/app';
var BUILD = __dirname + '/build';

module.exports = {

    context: APP,
    entry: {
        app: ['./core/bootstrap.js', 'webpack/hot/dev-server']
    },
    output: {
        path: BUILD,
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
            test: /\.sass$/,
            loader: 'style!css!sass'
        },
        {
            test: /\.js$/,
            loader: 'ng-annotate!babel!jshint',
            exclude: /node_modules|bower_components/
        }]
    }

}