// Renuka Devi Prasanna
// Webpack config

var webpack = require('webpack');
var path = require('path');

var APP = path.resolve(__dirname + '/app/');
var BUILD = path.resolve(__dirname + '/public/');
var NODE_MODULES_PATH = path.resolve(__dirname + '/node_modules/');

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
        devtool: 'source-map',

        // preloaders
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
        }],

        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.s[ac]ss$/,
            loaders: ["style",
                "css",
                "resolve-url",
                "sass?includePaths[]=" + BUILD + '/assets/css/typeplate-sk'
            ]
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
            exclude: /node_modules|bower_components/
        }, {
            test: /\.(png|woff|ttf)$/,
            loader: 'url-loader?limit=100000'
        }]
    },
    resolveLoader: {
        fallback: __dirname + "/node_modules"
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".node"],
        alias: {
            "flexboxgrid.css": NODE_MODULES_PATH + "/flexboxgrid/dist/flexboxgrid.css"
        },
        modulesDirectories: ['assets', 'node_modules']

    }

}