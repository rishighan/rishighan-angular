// redis connection config
let redis = require('redis');
const PORT = '6379';
const REDIS_HOST = process.env.REDIS_HOST ? process.env.REDIS_HOST : 'localhost';
let client = redis.createClient(PORT, REDIS_HOST);

module.exports = {
    connect: function () {
        client.on('connect', () => {
           //todo: winston
            console.log("Redis server found on", REDIS_HOST);
        });
    },
    client: client
};
