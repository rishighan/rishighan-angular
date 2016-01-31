// Server config
// TODO:  remove all db-related stuff
var path = require('path');
var express = require('express');
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');


var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

// db requires
var mongoose = require('mongoose');
var dbConfig = require('./config/development.config.js');
var db = require('./config/database.connection.js');
var Post = require('./db/post.crud.js');


var app = express();

// Google APi
var googleApi = require('googleapis');
var OAuth2 = googleApi.auth.OAuth2;

var upload = multer({dest: __dirname + '/assets/images'});

console.log("Google API:" + OAuth2)
// connect to db
db.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// create a model using this Schema
// var postModel = mongoose.model('Post', schema.PostSchema);

// The path to static assets
var publicPath = path.resolve(__dirname, 'public');
app.use('/bower', express.static(path.resolve(__dirname, 'bower_components')));
app.use('/dist', express.static(path.resolve(__dirname, 'dist')));

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

app.post('/api/files', upload.single('attachedFile'), function(req, res, next){
    console.log(req.files);
});

// Create a new post
app.post('/db/createpost', function(req, res, next) {
    var promise = Post.createPost(req.body);
    promise.then(function(data){
              res.send(data);
            })
           .catch(console.log)
           .done();

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