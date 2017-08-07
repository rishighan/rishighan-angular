var mongoose = require('mongoose');
// connect to the database
let DB_PORT = '27017';
let DB_NAME = 'rishighan';
module.exports = {
    connect: function () {
        var options = {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        };
        let MONGO_DB;
        console.log("local mongo db", process.env.MONGO_HOST);
        console.log("docker db", process.env.DOCKER_MONGO_HOST);
        if (process.env.DOCKER_MONGO_HOST) {
            MONGO_DB = 'mongodb://'+ process.env.DOCKER_MONGO_HOST + ':' + DB_PORT + '/' + DB_NAME;
        } else {
            MONGO_DB = 'mongodb://'+ process.env.MONGO_HOST + ':' + DB_PORT + '/' + DB_NAME;
        }

        mongoose.connect(MONGO_DB);
        let db = mongoose.connection;
        db.on('error', function (err) {
            console.log('Connection Error', err);
        });
        db.once('open', function () {
            console.log('Connected to Mongo');
        });
    }
}