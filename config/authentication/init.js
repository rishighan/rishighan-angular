const login = require('./login');
const signup = require('./signup');
const User = require('../../db/user.schema');

module.exports = function(passport){

    // Authentication bits
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    login(passport);
    signup(passport);
};