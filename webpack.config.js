// Renuka Devi Prasanna
// Webpack config

var webpack = require('webpack');
var path = require('path');

var APP = path.resolve(__dirname + '/app/');
var BUILD = path.resolve(__dirname + '/dist/');
var NODE_MODULES_PATH = path.resolve(__dirname + '/node_modules/');
var BOWER_COMPONENTS_PATH = path.resolve(__dirname + '/bower_components/');
var ASSETS_PATH = path.resolve(__dirname + '/assets');
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
        devtool: 'eval',

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
            include: require.resolve(BOWER_COMPONENTS_PATH + "/ui-select/dist/select.js"),
            loader: 'exports?"ui.select"'
        },{
            include: require.resolve(BOWER_COMPONENTS_PATH + '/ng-notify/dist/ng-notify.min.js'),
            loader: 'exports?"ngNotify"'
        }]
    },
    resolveLoader: {
        fallback: NODE_MODULES_PATH
    },
    resolve: {
        root: [],
        extensions: ["", ".js", ".jsx", ".node"],
        alias: {
            "angular": BOWER_COMPONENTS_PATH + '/angular/angular.min.js',
            "angular-ui-router": BOWER_COMPONENTS_PATH + '/angular-ui-router/release/angular-ui-router.min.js',
            "jquery": BOWER_COMPONENTS_PATH + '/jquery/dist/jquery.js',
            "bootstrap.css": BOWER_COMPONENTS_PATH + "/bootstrap/dist/css/bootstrap.css",
            "bootstrap-theme.css": BOWER_COMPONENTS_PATH + "/bootstrap/dist/css/bootstrap-theme.css",
            "select.css": BOWER_COMPONENTS_PATH + '/ui-select/dist/select.css',
            "ui-select": BOWER_COMPONENTS_PATH + "/ui-select/dist/select.js",
            "dropzone": BOWER_COMPONENTS_PATH + "/dropzone/dist/dropzone.js",
            "underscore": BOWER_COMPONENTS_PATH + "/underscore/underscore-min.js",
            "pascalprecht.translate": BOWER_COMPONENTS_PATH + "/angular-translate/angular-translate.js",
            "translate.static.file.loader": BOWER_COMPONENTS_PATH + '/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
            "ngMessages": BOWER_COMPONENTS_PATH + '/angular-messages/angular-messages.min.js',
            "showdown-prettify": BOWER_COMPONENTS_PATH + '/showdown-prettify/dist/showdown-prettify.min.js',
            "showdown": BOWER_COMPONENTS_PATH + '/showdown/dist/showdown.min.js',
            "ngSanitize": BOWER_COMPONENTS_PATH + '/angular-sanitize/angular-sanitize.min.js',
            "angular-formly-templates-bootstrap": BOWER_COMPONENTS_PATH + '/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js',
            "angular-formly": BOWER_COMPONENTS_PATH + '/angular-formly/dist/formly.min.js',
            "ng-notify": BOWER_COMPONENTS_PATH + '/ng-notify/dist/ng-notify.min.js',
            "ngNotify.css": BOWER_COMPONENTS_PATH + '/ng-notify/dist/ng-notify.min.css'
        },
        modulesDirectories: ['assets', 'node_modules', BOWER_COMPONENTS_PATH]
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