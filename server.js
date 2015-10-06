var path = require('path');
var express = require('express');
var fs = require('fs');

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var mongoose = require('mongoose');

var app = express();

// connect to the database
var connect = function() {
    var options = { server: {socketOptions : {keepAlive: 1}}};
    mongoose.connect(config.db, options);
}
connect();


// The path to static assets
var publicPath = path.resolve(__dirname, 'app');
app.use(express.static(publicPath));

// Start Server on 3000
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});

new webpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    proxy: {
        "*": "http://localhost:3000"
    }
}).listen(3001, 'localhost', function(err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3001');
});