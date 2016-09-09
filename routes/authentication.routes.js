module.exports = function(passport){
     // Login
    app.post('/login', passportModule.authenticate('login', {
        successRedirect: '/admin',
        failureRedirect: '/',
        failureFlash : true
    }));

    // GET Registration
    app.get('/signup', function(req, res){
        res.redirect('/signup');
    });

    // POST Registration
    app.post('/signup', passportModule.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
    }));
}
