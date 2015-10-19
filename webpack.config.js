// Renuka Devi Prasanna
// Webpack config

var webpack = require('webpack');
var path = require('path');

var APP = path.resolve(__dirname + '/app/');
var BUILD = path.resolve(__dirname + '/build');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    context: APP,
    entry: {
        app: ['./core/bootstrap.js',
            // 'webpack-dev-server/app/home?http://0.0.0.0:3001',
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
                loader: ExtractTextPlugin.extract("css-loader")
            }, {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
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
    resolveLoader: {
        fallback: __dirname + "/node_modules"
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".node"],
        alias: {
            "flexboxgrid.css": BUILD + '/flexboxgrid.css'
        }
    },
    plugins: [
        new ExtractTextPlugin("flexboxgrid.css", {
            allChunks: true
        })
    ]

}