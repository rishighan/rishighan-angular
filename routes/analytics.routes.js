const express = require('express');
const router = express.Router();
const Q = require('q');
const google = require('googleapis');
const redis = require('../config/redis.config');
const _ = require('underscore');
const winston = require('winston');
require('winston-loggly-bulk');

let jwtClient;
redis.client.get('googleapi', (err, response) => {
    let key = JSON.parse(response);
    jwtClient = new google.auth.JWT(key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/analytics.readonly'],
        null);
});

function queryData(analytics, query) {
    let deferred = Q.defer();
    let queryConfig = _.extend({'auth': jwtClient}, query);
    analytics.data.ga.get(queryConfig, (err, response) => {
        if (err) {
            winston.log('error', 'Error fetching analytics data', {errorObj: err});
            deferred.reject(new Error(err));
        } else {
            winston.log('info', 'Fetched analytics response.');
            deferred.resolve(JSON.stringify(response, null, 4));
        }
    });
    return deferred.promise;
}

router.get('/getAnalytics', (req, res, next) => {
    jwtClient.authorize((err, tokens) => {
        if (err) {
            winston.log('error', 'Error: %s', err);
            return;
        }
        let analytics = google.analytics('v3');
        let dataPromise = queryData(analytics, req.query);
        dataPromise.then((data) => {
            res.send(data);
        }, (err) => {
            winston.log('error', 'Error fetching analytics', {errorObj: err});
            res.send(err);
        });
    });
});
module.exports = router;
