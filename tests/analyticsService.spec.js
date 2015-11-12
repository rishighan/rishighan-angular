"use strict";
describe('Hello', function() {
    var analyticsService;
    beforeEach(angular.mock.module('home'));

    beforeEach(inject(function(_myService_) {
        analyticsService = _myService_;
    }));


    it('Should say analytics welcome message', function() {
        // spyOn(analyticsService, 'spawnAnalytics').andReturn('hello');
        expect(analyticsService.spawnAnalytics).toBe("Booyah. Spawning Analytics...");
    });
});