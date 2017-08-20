const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../db/user.schema');
const winston = require('winston');
require('winston-loggly-bulk');

router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}),
        req.body.password, (err, account) => {
            if (err) {
                winston.log('error', 'Failed to register user', {errorObj: err});
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, () => {
                winston.log('info', 'User registered successfully');
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            winston.log('error', 'Passport login strategy failure', {errorObj: err});
            return next(err);
        }
        if (!user) {
            winston.log('info', 'Invalid credentials', {errorObj: user.username});
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, err, () => {
            if (err) {
                winston.log('error', 'User login failure', {errorObj: err});
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            winston.log('info', 'User login successful', {username: user.username});
            res.status(200).json({
                status: 'Login successful!'
            });
        });
    })(req, res, next);
});

router.get('/status', (req, res) => {
    if (!req.isAuthenticated()) {
        winston.log('info', 'Authentication failed');
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true,
        user: req.user.username
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
    winston.log('info', 'User logged out');
});

module.exports = router;
