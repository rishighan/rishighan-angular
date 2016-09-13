const express = require('express');
const router = express.Router();

module.exports = function(passport){
     // Login
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/admin',
        failureRedirect: '/',
        failureFlash : true
    }));

    // GET Registration
    router.get('/signup', function(req, res){
        res.redirect('/signup');
    });

    // POST Registration
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    return router;
};
