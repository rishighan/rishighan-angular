const express = require('express');
const router = express.Router();
const Q = require('q');
const google = require('googleapis');
const key = require('../config/key.json');
const _ = require('underscore');

let jwtClient = new google.auth.JWT(key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'],
    null);

// todo: make this sustainable
function queryData(analytics, query) {
    let deferred = Q.defer();
    let queryConfig = _.extend({'auth': jwtClient}, query);
    analytics.data.ga.get(queryConfig, (err, response) => {
        if (err) {
            // todo: winston logging
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(JSON.stringify(response, null, 4));
        }
    });
    return deferred.promise;
}

router.get('/getAnalytics', (req, res, next) => {
    jwtClient.authorize((err, tokens) => {
        if (err) {
            // todo: winston
            console.log(err);
            return;
        }
        let analytics = google.analytics('v3');
        let dataPromise = queryData(analytics, req.query);
        dataPromise.then((data) => {
            res.send(data);
        }, (err) => {
            res.send(err);
        });
    });
});
module.exports = router;
