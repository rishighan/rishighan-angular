// Renuka Devi Prasanna
// Webpack config

var webpack = require('webpack');
var path = require('path');

var APP = __dirname + '/app';
var BUILD = __dirname + '/build';

module.exports = {

    context: APP,
    entry: {
        app: ['./core/bootstrap.js',
            'webpack-dev-server/app?http://0.0.0.0:3001',
            'webpack/hot/only-dev-server'
        ]
    },
    output: {
        path: BUILD,
        filename: 'bundle.js'
    },

    module: {
        // devtool
        devtool: 'eval',

        // preloaders
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
        }],

        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader'
            }, {
                test: /\.js$/,
                loader: 'ng-annotate!babel!jshint',
                exclude: /node_modules|bower_components/
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            }

        ]
    },

    resolve: {
        extensions: ["", ".js", ".jsx", ".node"]
    }

}