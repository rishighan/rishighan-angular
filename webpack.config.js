// Renuka Devi Prasanna
// Webpack config

let webpack = require('webpack');
let CompressionPlugin = require('compression-webpack-plugin');
let path = require('path');

let APP = path.resolve(`${__dirname }/app/`);
let BUILD = path.resolve(`${__dirname }/dist/`);
let BOWER_COMPONENTS_PATH = path.resolve(`${__dirname }/bower_components/`);
let NODE_MODULES_PATH = path.resolve(`${__dirname}/node_modules`);

module.exports = {
    context: APP,
    entry: {
        rgapp: './core/bootstrap.js'
    },
    output: {
        path: BUILD,
        filename: '[name].js'
    },
    module: {
        // devtool
        // devtool: 'source-map',
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules|tests|bower_components/,
                use: 'jshint-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }, {
                test: /\.(png|woff|ttf|eot|woff2|svg)$/,
                use: 'url-loader?limit=100000'
            }, {
                test: /\.scss$/,
                use: [ 'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    `sass-loader?includePaths[]=${ BUILD }/assets/css/`
                ]
            }, {
                test: /\.js$/,
                use: [
                    'ng-annotate-loader',
                    'jshint-loader',
                    'babel-loader' ],
                exclude: /(node_modules|test|bower_components|\.spec\.js)/
            }, {
                test: /\.html$/,
                use: 'html-loader'
            }, {
                include: require.resolve(`${BOWER_COMPONENTS_PATH }/ui-select/dist/select.min.js`),
                use: 'exports-loader?"ui.select"'
            }, {
                include: require.resolve(`${BOWER_COMPONENTS_PATH }/ng-notify/dist/ng-notify.min.js`),
                use: 'exports-loader?"ngNotify"'
            }, {
                include: require.resolve(`${BOWER_COMPONENTS_PATH }/angulartics/dist/angulartics.min.js`),
                use: 'exports-loader?angulartics'
            }, {
                include: require.resolve(`${BOWER_COMPONENTS_PATH }/angulartics-google-analytics/dist/angulartics-ga.min.js`),
                use: 'exports-loader?"angulartics.google.analytics"'
            } ]
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.node' ],
        alias: {
            'angular': `${BOWER_COMPONENTS_PATH }/angular/angular.min.js`,
            'angular-ui-router': `${BOWER_COMPONENTS_PATH }/angular-ui-router/release/angular-ui-router.min.js`,
            'jquery': `${BOWER_COMPONENTS_PATH }/jquery/dist/jquery.min.js`,
            'bootstrap.css': `${BOWER_COMPONENTS_PATH }/bootstrap/dist/css/bootstrap.min.css`,
            'bootstrap-theme.css': `${BOWER_COMPONENTS_PATH }/bootstrap/dist/css/bootstrap-theme.min.css`,
            'select.css': `${BOWER_COMPONENTS_PATH }/ui-select/dist/select.min.css`,
            'ui-select': `${BOWER_COMPONENTS_PATH }/ui-select/dist/select.min.js`,
            'dropzone': `${BOWER_COMPONENTS_PATH }/dropzone/dist/min/dropzone.min.js`,
            'underscore': `${BOWER_COMPONENTS_PATH }/underscore/underscore-min.js`,
            'pascalprecht.translate': `${BOWER_COMPONENTS_PATH }/angular-translate/angular-translate.min.js`,
            'translate.static.file.loader': `${BOWER_COMPONENTS_PATH }/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js`,
            'ngMessages': `${BOWER_COMPONENTS_PATH }/angular-messages/angular-messages.min.js`,
            'angular-formly-templates-bootstrap': `${BOWER_COMPONENTS_PATH }/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js`,
            'angular-formly': `${BOWER_COMPONENTS_PATH }/angular-formly/dist/formly.min.js`,
            'ng-notify': `${BOWER_COMPONENTS_PATH }/ng-notify/dist/ng-notify.min.js`,
            'ngNotify.css': `${BOWER_COMPONENTS_PATH }/ng-notify/dist/ng-notify.min.css`,
            'angular-busy': `${BOWER_COMPONENTS_PATH }/angular-busy/dist/angular-busy.min.js`,
            'angulartics': `${BOWER_COMPONENTS_PATH }/angulartics/dist/angulartics.min.js`,
            'angulartics.google.analytics': `${BOWER_COMPONENTS_PATH }/angulartics-google-analytics/dist/angulartics-ga.min.js`,
            'remarkable': `${BOWER_COMPONENTS_PATH }/remarkable/dist/remarkable.min.js`,
            'littlefoot': `${NODE_MODULES_PATH}/littlefoot/dist/littlefoot.min.js`,
            'littlefoot.css': `${NODE_MODULES_PATH}/littlefoot/dist/littlefoot.css`,
            'highlightjs': `${BOWER_COMPONENTS_PATH }/highlightjs/highlight.pack.min.js`,
            'github.css': `${BOWER_COMPONENTS_PATH }/highlightjs/styles/atelier-sulphurpool-light.css`,
            'ng-paging': `${BOWER_COMPONENTS_PATH }/angular-paging/dist/paging.min.js`,
            'd3':`${BOWER_COMPONENTS_PATH}/d3/d3.min.js`
        },
        modules: [ 'assets', 'node_modules', BOWER_COMPONENTS_PATH ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: { warnings: true }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            '_': 'underscore',
            'nvd3': 'nvd3'
        })
    ]
};
