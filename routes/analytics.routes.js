const express = require('express');
const router = express.Router();
const Q = require('q');
const google = require('googleapis');
const key = require('../config/key.json');

let jwtClient = new google.auth.JWT(key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'],
    null);


router.get('/getAnalytics', function (req, res, next) {
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            // todo: winston
            console.log(err);
            return;
        }
        let analytics = google.analytics('v3');
        var dataPromise = queryData(analytics);
        dataPromise.then(function (data) {
            res.send(data);
        }, function (err) {
            res.send(err);
        })
    });
});

// todo: parameterize this method
function queryData(analytics) {
    var deferred = Q.defer();
    analytics.data.ga.get({
        'auth': jwtClient,
        'ids': 'ga:17894417',
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        'metrics': 'ga:pageviews',
        'dimensions': 'ga:date, ga:pagePath',
        'filters': 'ga:pagePath=~/post/*',
        'max-results': 30
    }, function (err, response) {
        if (err) {
            //todo: winston logging
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(JSON.stringify(response, null, 4));
        }
    });
    return deferred.promise;
}

module.exports = router;