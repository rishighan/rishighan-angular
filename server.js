// Server config
var path = require('path');
const express = require('express');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var webpack = require('webpack');
var config = require('./webpack.config.js');
const passport = require('passport');

// db 
var mongoose = require('mongoose');
var db = require('./config/database.connection.js');

// authentication
const initPassport = require('./config/authentication/init');
initPassport(passport);

// routes
var authRoutes = require('./routes/authentication.routes')(passport);
var postRoutes = require('./routes/post.routes');
var fileRoutes = require('./routes/file.routes');
var app = express();

// Google API
var googleApi = require('googleapis');
var OAuth2 = googleApi.auth.OAuth2;
console.log("Google API:" + OAuth2)

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
};
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


// mount routes
app.use('/', fileRoutes);
app.use('/', authRoutes);
app.use('/db', postRoutes);

var publicPath = path.resolve(__dirname, 'public');
app.use('/bower', express.static(path.resolve(__dirname, 'bower_components')));
app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('/', express.static(path.resolve(__dirname, 'app')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Start Server on 3000
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});

// catch-all
app.all('/', function (req, res) {
    res.sendFile('index.html', {
        root: path.join(__dirname, './app')
    });
});

module.exports = app;