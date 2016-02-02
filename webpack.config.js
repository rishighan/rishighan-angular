// Renuka Devi Prasanna
// Webpack config

var webpack = require('webpack');
var path = require('path');

var APP = path.resolve(__dirname + '/app/');
var BUILD = path.resolve(__dirname + '/dist/');
var NODE_MODULES_PATH = path.resolve(__dirname + '/node_modules/');
var BOWER_COMPONENTS_PATH = path.resolve(__dirname + '/bower_components/');
var ASSETS_PATH = path.resolve(__dirname + '/assets')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    context: APP,
    entry: {
        rgapp: './core/bootstrap.js'
        // test:'../tests/specs.js'
    },
    output: {
        path: BUILD,
        filename: '[name].js'
    },


// process.NODE.ENV === 'production';

    module: {
        // devtool
        // devtool: 'eval',

        // preloaders
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules|tests|bower_components/,
            loader: 'jshint-loader'
        }],

        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.(png|woff|ttf|eot|woff2|svg)$/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /\.scss$/,
            loaders: ["style",
                "css",
                "resolve-url",
                "sass?includePaths[]=" + BUILD + '/assets/css/'
            ]
        }, {
            test: /\.js$/,
            loader: 'ng-annotate!babel!jshint',
            exclude: /node_modules|tests|bower_components/
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules|bower_components/
        }, {
            test: /ui-select/,
            loader: 'exports?"ui.select"'
        }]
    },
    resolveLoader: {
        fallback: __dirname + "/node_modules"
    },
    resolve: {
        root: [],
        extensions: ["", ".js", ".jsx", ".node"],
        alias: {
            "jquery": BOWER_COMPONENTS_PATH + '/jquery/dist/jquery.js',
            "bootstrap.css": BOWER_COMPONENTS_PATH + "/bootstrap/dist/css/bootstrap.css",
            "bootstrap-theme.css": BOWER_COMPONENTS_PATH + "/bootstrap/dist/css/bootstrap-theme.css",
            "select.css": BOWER_COMPONENTS_PATH + '/ui-select/dist/select.css',
            "ui-select": BOWER_COMPONENTS_PATH + "/ui-select/dist/select.js",
            "dropzone": BOWER_COMPONENTS_PATH + "/dropzone/dist/dropzone.js",
            "underscore": BOWER_COMPONENTS_PATH + "underscore/underscore-min.js"
        },
        modulesDirectories: ['assets', 'node_modules', 'bower_components']

    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: "underscore"
        })
    ]

}