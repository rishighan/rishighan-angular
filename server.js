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

// Google API
var googleApi = require('googleapis');
var OAuth2 = googleApi.auth.OAuth2;

// multer config
var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, __dirname + '/assets/images');
    },
    filename: function(req, file, cb) {
        console.log(req.body);
        cb(null, req.body.newFileName);
    }
});

var upload = multer({
    storage: storage
}).any();

console.log("Google API:" + OAuth2)
// connect to db
db.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


// The path to static assets
var publicPath = path.resolve(__dirname, 'public');
app.use('/bower', express.static(path.resolve(__dirname, 'bower_components')));
app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('/', express.static(path.resolve(__dirname, 'app')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Start Server on 3000
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});

app.all('/', function(req, res) {
    res.sendFile('index.html', {
        root: path.join(__dirname, './app')
    });
})


// Upload file(s)
app.post('/api/files/upload', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
        }
        res.json({
            error_code: 0,
            err_desc: null,
            files: req.files
        })
    })
});

// Delete File
app.post('/api/files/delete', function(req, res, next) {
    fs.unlink(__dirname + '/assets/images/' + req.body.file, function(error) {
        res.json({
            error_details: error
        });
    });

});

// Create a new post
app.post('/db/createpost', function(req, res, next) {
    var promise = Post.createPost(req.body);
    promise.then(function(data) {
        res.send(data);
    })
        .catch(console.log)
        .done();
});

// get all posts
app.get('/db/getallposts', function(req, res, next) {
    var promise = Post.getAllPosts();
    promise.then(function(data) {
        res.send(data);
    })
        .catch(console.log)
        .done();
});

app.get('/db/getpost/:id', function(req, res, next){ß
    var promise = Post.getPost(req.params.id);
    promise.then(function(post){
        res.send(post);
    })
    .catch(console.log)
    .done();
})

app.post('/db/updatepost/:id', function(req, res, next){
    console.log(req.body);
    var promise = Post.updatePost(req.params.id, req.body, req.params.upsertToggle);
    promise.then(function(result){
        res.send(result);
    })
    .catch(console.log)
    .done();
})



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