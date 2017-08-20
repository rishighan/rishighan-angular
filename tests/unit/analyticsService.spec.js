describe('AnalyticsService Tests', function () {
    let analyticsService;
    let analyticsQueryConfig = {
        'ids': 'ga:17894417',
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        'metrics': 'ga:pageviews',
        'dimensions': 'ga:date, ga:pageTitle',
        'filter': 'ga:pagePath=~/post/*',
    };
    beforeEach(module('app.shared'));

    beforeEach(inject(function (_AnalyticsService_) {
        analyticsService = _AnalyticsService_;
    }));


    it('Should say analytics welcome message', function () {
        // debugger
        expect(analyticsService.spawnAnalytics()).toBe('This be Analytics.');
    });


});