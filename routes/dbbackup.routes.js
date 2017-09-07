const backup = require('mongodb-backup');
const redis = require('../config/redis.config');
const express = require('express');
const router = express.Router();
const winston = require('winston');
require('winston-loggly-bulk');

router.get('/backup/', (req, res, next) => {
    redis.client.get('mongohost', (err, mongoHost) => {
        backup({
            uri: `mongodb://${ mongoHost }:27017/rishighan`,
            root: './db_backup',
            tar: 'rgbackup.tar',
            callback: function (err) {
                if (err) {
                    winston.log('error', "Error backing up database", {errorDetails: err});
                    res.send(err);
                } else {
                    winston.log('info', `Database on host: ${ mongoHost } backed up successfully`);
                    res.send({
                        message: 'backup successful'
                    });
                }
            }
        });
    });
});

module.exports = router;
