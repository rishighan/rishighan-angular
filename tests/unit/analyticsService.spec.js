"use strict";
describe('Hello', function() {
    var analyticsService;
    beforeEach(window.module('analytics'));

    beforeEach(inject(function(_analyticsService_) {
        analyticsService = _analyticsService_;
    }));


    it('Should say analytics welcome message', function() {
        // spyOn(analyticsService, 'spawnAnalytics').andReturn('hello');

        // debugger
        expect(analyticsService.spawnAnalytics()).toBe('hello3');
    });
});