//import analyticsService from '../app/components/analytics/analytics.service';

beforeEach(inject())

describe('Hello', function() {
    it('Should say hello', function(analyticsService) {
        expect(analyticsService.spawnAnalytics()).toBe("Booyah. Spawning Analytics...");
    });
});