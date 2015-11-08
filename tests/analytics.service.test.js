"use strict";
describe('Hello', function() {

    beforeEach(module('rgApp'));
    beforeEach(inject(function (_analyticsService_, $httpBackend) {
        analyticsService = _analyticsService_;
        httpBackend = $httpBackend;
  }));



    it('Should say analytics welcome message', function() {
        // spyOn(analyticsService, 'spawnAnalytics').andReturn('hello');
        expect(_analyticsService_.spawnAnalytics).toBe("Booyah. Spawning Analytics...");
    });
});