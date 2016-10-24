class AnalyticsService {
    /*@ngInject*/
    constructor($http) {
        this._$http = $http;
    }

    getAnalytics(query) {
        return this._$http.get('/getAnalytics', {
            params: {slug: query.slug || ''}
        })
            .then(function (data) {
                return data;
            }, function (error) {
                // todo: winston
            });
    }
}

export
default AnalyticsService;