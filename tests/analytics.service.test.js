
// beforeEach(inject())
import analyticsService from './analytics/analytics.service';
describe('Hello', function() {
    it('Should say hello', function(analyticsService) {
        expect(analyticsService.spawnAnalytics()).toBe("Booyah. Spawning Analytics...");
    });
});