// Server config
// TODO:  remove all db-related stuff
var path = require('path');
const express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
var Q = require('q');

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var passport = require('passport');
var User = require('./db/user.schema');
var LocalStrategy = require('passport-local').Strategy;

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

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// session manangement
app.use(session({
    secret: 'signal',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

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
});


// Authentication bits
passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

// Strategies
// passport/login.js
passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        // check in mongo if a user with username exists or not
        User.findOne({ 'username' :  username },
            function(err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                if (!user){
                    console.log('User Not Found with username '+username);
                    return done(null, false,
                        console.log('message', 'User Not found.'));
                }
                // User exists but wrong password, log the error
                if (!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false,
                        console.log('message', 'Invalid Password'));
                }
                // User and password both match, return user from
                // done method which will be treated like success
                return done(null, user);
            }
        );
    }));

passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        findOrCreateUser = function(){
            // find a user in Mongo with provided username
            User.findOne({'username':username},function(err, user) {
                // In case of any error return
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        console.log('message','User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.param('email');
                    newUser.firstName = req.param('firstName');
                    newUser.lastName = req.param('lastName');

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);

/* Handle Login POST */
app.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
}));

/* GET Registration Page */
app.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
});

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

app.get('/db/getpost/:id', function(req, res, next) {
    var promise = Post.getPost(req.params.id);
    promise.then(function(post) {
        res.send(post);
    })
        .catch(console.log)
        .done();
});

app.post('/db/updatepost/:id', function(req, res, next) {
    console.log(req.body);
    var promise = Post.updatePost(req.params.id, req.body, req.params.upsertToggle);
    promise.then(function(result) {
        res.send(result);
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