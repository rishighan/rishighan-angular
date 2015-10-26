var mongoose = require('mongoose');

// connect to the database
module.exports = {
    connect: function() {
        var options = {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        };
        // var shoo = mongoose.createConnection(dbConfig.db);
        mongoose.connect('mongodb://localhost/rishighan');
        var db = mongoose.connection;
        db.on('error', function(err) {
            console.log('Connection Error', err);
        });
        db.once('open', function() {
            console.log('Connected to Mongo');
        });
    }
}