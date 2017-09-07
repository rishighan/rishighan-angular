let mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
let redis = require('./redis.config');

// connect to the database
let DB_PORT = '27017';
let DB_NAME = 'rishighan';
module.exports = {
    connect: function() {
        let options = {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        };
        let MONGO_DB, MONGO_REMOTE_HOST;
        redis.get('mongohost', (err, response) => {
            MONGO_REMOTE_HOST = response;
            MONGO_DB = `mongodb://${MONGO_REMOTE_HOST}:${DB_PORT}/${DB_NAME}` || `mongodb://localhost:${DB_PORT}/${DB_NAME}`;

            mongoose.connect(MONGO_DB, { useMongoClient: true });

            let db = mongoose.connection;
            db.on('error', (err) => {
                console.log('Connection Error', err);
            });
            db.once('open', () => {
                console.log('Connected to Mongo on host', MONGO_DB);
            });
        });
    }
};
