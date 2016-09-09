const LocalStrategy = require('passport-local').Strategy;
const User = require('../../db/user.schema');
const bCrypt = require('bcrypt');

module.exports = function (passport) {
    passport.use('signup', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            findOrCreateUser = function () {
                // find a user in Mongo with provided username
                User.findOne({'username': username}, function (err, user) {
                    // In case of any error return
                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists');
                        return done(null, false,
                            console.log('message', 'User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();
                        // set the user's local credentials
                        newUser.username = req.body.username;
                        newUser.password = createHash(req.body.password);

                        // save the user
                        newUser.save(function (err) {
                            if (err) {
                                console.log('Error in Saving user: ' + err);
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

    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
}