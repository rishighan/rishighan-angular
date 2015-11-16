// Server config
// TODO:  remove all db-related stuff
var path = require('path');
var express = require('express');
var fs = require('fs');

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var mongoose = require('mongoose');
var dbConfig = require('./config/development.config.js');
var db = require('./config/database.connection.js');
var schema = require('./config/post.schema.js');

var app = express();
var googleApi = require('googleapis');
var OAuth2 = googleApi.auth.OAuth2;

console.log("Google API:" + OAuth2)
// connect to db
db.connect();

// create a model using this Schema
var postModel = mongoose.model('Post', schema.PostSchema);

// The path to static assets
var publicPath = path.resolve(__dirname, 'public');
app.use('/bower', express.static(path.resolve(__dirname, 'bower_components')));
app.use('/dist/', express.static(path.resolve(__dirname, 'dist')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Start Server on 3000
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});

app.all('/', function (req, res) {
    res.sendFile('index.html', { root:  path.join(__dirname, './app')  });
})

app.get('/db/getposts', function(req, res, next) {
    postModel.findOne({
        title: "This shit right here"
    }, function(error, post) {
        if (error) {
            res.send(error);
        } else {
            res.send(post);
        }
    });

});

app.get('/db/createtestpost', function(req, res, next) {

    var rishi = new postModel({
        title: "This shit right here",
        tags: [{
            name: "general",
            description: "All things go"
        }, {
            name: "rants",
            description: "sometimes you have to let go"
        }],
        date_created: new Date(),
        date_updated: new Date(),
        attachment: [{
            url: "http://giphy.com/gifs/smile-movie-Kxx2XWn8F4oa4?utm_source=iframe&utm_medium=embed&utm_campaign=tag_click",
            size: 123,
            date_created: new Date(),
            date_updated: new Date()
        }],
        is_draft: false,
        content: "This shit right here is cray cray my boo",
        excerpt: "Nah boo",
        citation: [{
            url: "http://giphy.com/gifs/bachelor-in-paradise-the-bachelorette-Z34IiLkiwSbKw",
            description: "giffy giffy giffy"
        }]
    });

    rishi.save(function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });

});


// new webpackDevServer(webpack(config), {
//     hot: true,
//     historyApiFallback: true,
//     proxy: {
//         "*": "http://localhost:3000"
//     }
// }).listen(3001, 'localhost', function(err, result) {
//     if (err) {
//         console.log(err);
//     }

//     console.log('Listening at localhost:3001');
// });