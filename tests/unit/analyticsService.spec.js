"use strict";
describe('Hello', function() {
    var analyticsService;
    beforeEach(window.module('analytics'));

    beforeEach(inject(function(_analyticsService_) {
        analyticsService = _analyticsService_;
        spyOn(analyticsService, 'spawnAnalytics').andReturn('hello');
    }));


    it('Should say analytics welcome message', function() {
        // debugger
        expect(analyticsService.spawnAnalytics()).toBe('this be analytics');
    });
});