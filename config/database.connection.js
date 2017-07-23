var mongoose = require('mongoose');
const dockerHost = 'rishighanangular_mongodb_1:27017';
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
        let MONGO_DB;
        let DOCKER_DB = process.env.DB_PORT;
        console.log(process.env);
        console.log("mongo db", MONGO_DB);
        console.log("docker db", DOCKER_DB);
        if (DOCKER_DB) {
            MONGO_DB = 'mongodb://' + dockerHost + '/rishighan';
        } else {
            MONGO_DB = 'mongodb://rishighanangular_mongodb_1:27017/rishighan';
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