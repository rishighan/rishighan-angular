// Renuka Devi Prasanna
// Webpack config

var webpack = require('webpack');
var path = require('path');

var APP = path.resolve(__dirname + '/app/');
var BUILD = path.resolve(__dirname + '/public/');
var NODE_MODULES_PATH = path.resolve(__dirname + '/node_modules/');
var BOWER_COMPONENTS_PATH = path.resolve(__dirname + '/bower_components/');

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
            exclude: /node_modules|bower_components/,
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
                "sass?includePaths[]=" + BUILD + '/assets/css/'
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
        }, {
            // Rewrite the file so that it exports the window global.
            test: BOWER_COMPONENTS_PATH + '/dropzone/dist/min/dropzone.min.js',
            loader: 'exports?window._dropzone'
        }]
    },
    resolveLoader: {
        fallback: __dirname + "/node_modules"
    },
    resolve: {
        root: [BOWER_COMPONENTS_PATH],
        extensions: ["", ".js", ".jsx", ".node"],
        alias: {
            "flexboxgrid.css": NODE_MODULES_PATH + "/flexboxgrid/dist/flexboxgrid.css",
            "dropzone": BOWER_COMPONENTS_PATH + "/dropzone/dist/min/dropzone.min.js"
        },
        modulesDirectories: ['assets', 'node_modules']

    }

}