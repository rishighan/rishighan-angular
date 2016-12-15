class AnalyticsService {
    /*@ngInject*/
    constructor($http) {
        this._$http = $http;
    }

    spawnAnalytics(){
        return "This be Analytics.";
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