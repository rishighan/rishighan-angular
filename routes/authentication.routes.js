const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../db/user.schema');

router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}),
        req.body.password, function (err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, err => {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
        });
    })(req, res, next);
});

router.get('/status', function (req, res) {
    if (!req.isAuthenticated()) {
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
});

module.exports = router;