"use strict";
describe('Hello', function() {

    beforeEach(module('analytics'));
    var _analyticsService;
beforeEach(inject(['analyticsService', function (gaService) {
    _analyticsService = gaService;
}]));


    it('Should say analytics welcome message', function() {
        // spyOn(analyticsService, 'spawnAnalytics').andReturn('hello');
        expect(_analyticsService.spawnAnalytics).toBe("Booyah. Spawning Analytics...");
    });
});