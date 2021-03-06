// new relic monitoring
require('newrelic');

const express = require('express');
let app = express();
app.use(require('prerender-node').set('prerenderToken', 'qYb7OMfuxI6i8pQTqJQy'));

// Server config
let path = require('path');
let compression = require('compression');
let session = require('express-session');
let redisStore = require('connect-redis')(session);
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./db/user.schema');

// redis
let redis = require('./config/redis.config');
redis.connect();

// logging
let winston = require('winston');
require('winston-loggly-bulk');

redis.client.get('logglyconfig', (err, response) => {
    winston.add(winston.transports.Loggly, JSON.parse(response));
});

// db
let db = require('./config/database.connection.js');

// routes
const postRoutes = require('./routes/post.routes');
const fileRoutes = require('./routes/file.routes');
const authenticationRoutes = require('./routes/authentication.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const mongoBackupRoutes = require('./routes/dbbackup.routes');

// connect to db
db.connect();

// compress all requests
app.use(compression());

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

// session manangement
app.use(session({
    secret: 'mungidhekunbhaat',
    store: new redisStore({client: redis.client, logErrors: true, ttl: 900}),
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch-all
app.all('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './app')
    });
});

// mount routes
app.use('/', fileRoutes);
app.use('/db', postRoutes);
app.use('/user', authenticationRoutes);
app.use('/', analyticsRoutes);
app.use('/', mongoBackupRoutes);

app.use('/bower', express.static(path.resolve(__dirname, 'bower_components')));
app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('/', express.static(path.resolve(__dirname, 'app')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Start Server (default 8080)
let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Express server listening on port', port);
});

module.exports = app;