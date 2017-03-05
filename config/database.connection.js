var mongoose = require('mongoose');

// connect to the database
module.exports = {
    connect: function () {
        var options = {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        };
        console.log(process.env);
        let MONGO_DB;
        let DOCKER_DB = process.env.RISHIGHANANGULAR_DB_1_PORT;
        if (DOCKER_DB) {
            MONGO_DB = DOCKER_DB.replace('tcp', 'mongodb') + '/rishighan';
        } else {
            MONGO_DB = 'mongodb://localhost/rishighan';
        }

        mongoose.connect(MONGO_DB);
        var db = mongoose.connection;
        db.on('error', function (err) {
            console.log('Connection Error', err);
        });
        db.once('open', function () {
            console.log('Connected to Mongo');
        });
    }
}