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


router.get('/getAnalytics', (req, res, next) => {
    jwtClient.authorize((err, tokens) => {
        if (err) {
            // todo: winston
            console.log(err);
            return;
        }
        let analytics = google.analytics('v3');
        let dataPromise = queryData(analytics, req.query.slug);
        dataPromise.then((data) => {
            res.send(data);
        }, (err) => {
            res.send(err);
        });
    });
});

// todo: parameterize this method
// todo: refactor this to pull in top content
// todo: make this sustainable
function queryData(analytics, options) {
    let deferred = Q.defer();
    // pass in 'filters': `ga:pagePath=~/post/${ pattern}`,
    analytics.data.ga.get({
        'auth': jwtClient,
        'ids': 'ga:17894417',
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        'metrics': 'ga:pageviews',
        'dimensions': 'ga:date, ga:pageTitle',
        'filter': 'ga:pagePath=~/post/*'
    }, (err, response) => {
        if (err) {
            // todo: winston logging
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(JSON.stringify(response, null, 4));
        }
    });
    return deferred.promise;
}

module.exports = router;
