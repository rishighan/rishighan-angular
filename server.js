var path = require('path');
var express = require('express');
var fs = require('fs');

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var dbConfig = require('./config/development.config.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new Schema ({
  title: String,
  tags: [{
    name: String,
    description: String
  }],
  date_created: Date,
  date_updated: Date,
  attachment:[{
    url: String,
    size: Number,
    date_created: Date,
    date_updated: Date
  }],
  is_draft: Boolean,
  content: String,
  excerpt: String,
  citation:[{
    url: String,
    description: String
  }]
});

// create a model using this Schema
var postModel =  mongoose.model('Post', PostSchema);

var app = express();

// connect to the database
var connect = function() {
    var options = { server: {socketOptions : {keepAlive: 1}}};
    // var shoo = mongoose.createConnection(dbConfig.db);
    var shoo = mongoose.createConnection('mongodb://localhost/rishighan');
}
connect();


// The path to static assets
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Start Server on 3000
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});

app.get('/db/jugaad', function(req,res){
    res.send('Janmashtami ka raajdulara')
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