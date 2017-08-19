class AnalyticsService {
    /*@ngInject*/
    constructor($http) {
        this._$http = $http;
    }

    spawnAnalytics() {
        return "This be Analytics.";
    }

    getAnalytics(query) {
        return this._$http.get('/getAnalytics')
            .then(function (data) {
                return data;
            }, function (error) {
                // todo: winston
            });
    }

    formatData(analyticsData) {
        // Todo: refactor this garbage fire
        // In a nutshell, it gets data from GA in this form:
        // ["20170719", "Foo Bar", "1"], ["20170720", "Foo Bar", "3"] and so on.
        // We de-dupe on page title in the following manner:

        let temp = [];
        _.chain(analyticsData)
            .groupBy((row) => {
                /* outputs:
                   array of arrays grouped by the post title
                   0: [...
                         ["20170718", "Foo Bar", "4"]
                         ["20170720", "Foo Bar", "3"]
                         ["20170722", "Foo Bar", "1"]
                      ...] */
                return row[1]
            })
            .map((group) => {
                /* outputs rows:
                   Note: The Highcharts sparkline config identifies pageviews as 'y'
                  ...[
                       pageTitle: "Foo Bar",
                       analytics: {
                          date: "20170718",
                          y: 4
                       }
                     ]... */
                return _.map(group, (record) => {
                    return {
                        pageTitle: record[1],
                        analytics: {
                            date: record[0],
                            y: parseInt(record[2], 10)
                        }
                    }
                })
            })
            .map((record) => {
                /* creates a temp object:
                   Foo Bar:
                      title: "Foo Bar",
                      data: [],
                      totalPageViews: 23
                   and passes the result of the operation along to the next
                   operation in the _.chain */
                let analyticsObj = [];
                let pageViewSumArray = _.map(record, (row) => {
                    let sum = 0;
                    return sum += row.analytics.y;
                });
                let totalPageViews = _.reduce(pageViewSumArray, (memo, pageView) => {
                    return memo + pageView;
                }, 0);
                let partialResult = _.each(record, (item) => {
                    let title = _.pick(item, 'pageTitle');
                    analyticsObj[title.pageTitle] = {title: title.pageTitle, data: [], totalPageViews: totalPageViews};
                });
                temp.push(analyticsObj);
                return partialResult;
            })
            .each((row) => {
                /* Takes all the pageviews from the partial result and pushes them into the
                   data key of the temp object
                   Foo Bar:
                     title: "Foo Bar"
                     data:
                         [...
                             { date: "20170718", y: 4},
                             { date: "20170720", y: 3},
                             { date: "20170722", y: 1}
                         ...]  */
                return row.map((record) => {
                    let idx = _.findIndex(temp, record.pageTitle);
                    temp[idx][record.pageTitle].data.push(record.analytics);
                });
            });

        return temp;
    }
}

export default AnalyticsService;