"use strict";
describe('AnalyticsService Tests', function() {
    var analyticsService;
    beforeEach(window.module('analytics'));

    beforeEach(inject(function(_analyticsService_) {
        analyticsService = _analyticsService_;
    }));


    it('Should say analytics welcome message', function() {
        // debugger
        expect(analyticsService.spawnAnalytics()).toBe('this be analytics');
    });
});