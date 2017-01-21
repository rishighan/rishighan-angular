// Renuka Devi Prasanna
// Webpack config

var webpack = require('webpack');
var path = require('path');

var APP = path.resolve(__dirname + '/app/');
var BUILD = path.resolve(__dirname + '/dist/');
var NODE_MODULES_PATH = path.resolve(__dirname + '/node_modules/');
var BOWER_COMPONENTS_PATH = path.resolve(__dirname + '/bower_components/');

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
        }, {
            include: require.resolve(BOWER_COMPONENTS_PATH + '/ng-notify/dist/ng-notify.min.js'),
            loader: 'exports?"ngNotify"'
        }, {
            include: require.resolve(BOWER_COMPONENTS_PATH + '/angulartics/dist/angulartics.min.js'),
            loader: 'exports?angulartics'
        }, {
            include: require.resolve(BOWER_COMPONENTS_PATH + '/angulartics-google-analytics/dist/angulartics-ga.min.js'),
            loader: 'exports?"angulartics.google.analytics"'
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
            "jquery": BOWER_COMPONENTS_PATH + '/jquery/dist/jquery.min.js',
            "bootstrap.css": BOWER_COMPONENTS_PATH + "/bootstrap/dist/css/bootstrap.css",
            "bootstrap-theme.css": BOWER_COMPONENTS_PATH + "/bootstrap/dist/css/bootstrap-theme.css",
            "select.css": BOWER_COMPONENTS_PATH + '/ui-select/dist/select.css',
            "ui-select": BOWER_COMPONENTS_PATH + "/ui-select/dist/select.js",
            "dropzone": BOWER_COMPONENTS_PATH + "/dropzone/dist/dropzone.js",
            "underscore": BOWER_COMPONENTS_PATH + "/underscore/underscore-min.js",
            "pascalprecht.translate": BOWER_COMPONENTS_PATH + "/angular-translate/angular-translate.js",
            "translate.static.file.loader": BOWER_COMPONENTS_PATH + '/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
            "ngMessages": BOWER_COMPONENTS_PATH + '/angular-messages/angular-messages.min.js',
            "ngSanitize": BOWER_COMPONENTS_PATH + '/angular-sanitize/angular-sanitize.min.js',
            "angular-formly-templates-bootstrap": BOWER_COMPONENTS_PATH + '/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js',
            "angular-formly": BOWER_COMPONENTS_PATH + '/angular-formly/dist/formly.min.js',
            "ng-notify": BOWER_COMPONENTS_PATH + '/ng-notify/dist/ng-notify.min.js',
            "ngNotify.css": BOWER_COMPONENTS_PATH + '/ng-notify/dist/ng-notify.min.css',
            "nvd3": BOWER_COMPONENTS_PATH + '/nvd3/build/nv.d3.min.js',
            "nvd3.css": BOWER_COMPONENTS_PATH + '/nvd3/build/nv.d3.min.css',
            "d3": BOWER_COMPONENTS_PATH + '/d3/d3.min.js',
            "angular-busy": BOWER_COMPONENTS_PATH + '/angular-busy/dist/angular-busy.min.js',
            "angulartics": BOWER_COMPONENTS_PATH + '/angulartics/dist/angulartics.min.js',
            "angulartics.google.analytics": BOWER_COMPONENTS_PATH + '/angulartics-google-analytics/dist/angulartics-ga.min.js',
            "remarkable": BOWER_COMPONENTS_PATH + '/remarkable/dist/remarkable.js',
            "highlightjs": BOWER_COMPONENTS_PATH + '/highlightjs/highlight.pack.min.js',
            "github.css": BOWER_COMPONENTS_PATH + '/highlightjs/styles/github.css',
            "ng-paging": BOWER_COMPONENTS_PATH + '/angular-paging/dist/paging.min.js'

        },
        modulesDirectories: ['assets', 'node_modules', BOWER_COMPONENTS_PATH]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: "underscore",
            nvd3: "nvd3"
        })
    ]
};