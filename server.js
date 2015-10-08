var path = require('path');
var express = require('express');
var fs = require('fs');

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var dbConfig = require('./config/development.config.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    title: String,
    tags: [{
        name: String,
        description: String
    }],
    date_created: Date,
    date_updated: Date,
    attachment: [{
        url: String,
        size: Number,
        date_created: Date,
        date_updated: Date
    }],
    is_draft: Boolean,
    content: String,
    excerpt: String,
    citation: [{
        url: String,
        description: String
    }]
});



var app = express();

// connect to the database
var connect = function() {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    // var shoo = mongoose.createConnection(dbConfig.db);
    mongoose.connect('mongodb://localhost/rishighan');
    var db = mongoose.connection;
    db.on('error', function(err) {
        console.log('connection error', err);
    });
    db.once('open', function() {
        console.log('connected.');
    });
}
connect();

// create a model using this Schema
var postModel = mongoose.model('Post', PostSchema);

// The path to static assets
var publicPath = path.resolve(__dirname, 'public');
//app.use(express.static(publicPath));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Start Server on 3000
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});

app.get('/db/getposts', function(req, res, next) {
    res.send("jagdish");
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