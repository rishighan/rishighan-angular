describe('app demo', function () {
    it('should open the borwser', function () {
        browser.get('http://localhost:3000');
        expect(browser.getTitle()).toBe('Rishi Ghan');
        // browser.sleep(5000);
    });
});