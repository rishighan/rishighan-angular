"use strict";
describe('AnalyticsService Tests', function() {
    var analyticsService;
    beforeEach(module('app.shared'));

    beforeEach(inject(function(_AnalyticsService_) {
        analyticsService = _AnalyticsService_;
    }));


    it('Should say analytics welcome message', function() {
        // debugger
        expect(analyticsService.spawnAnalytics()).toBe('This be Analytics.');
    });
});