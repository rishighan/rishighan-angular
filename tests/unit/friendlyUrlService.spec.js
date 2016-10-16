"use strict";
describe('FriendlyUrlService Service Tests', function() {
    var testTitle, underTest, singleWordTitle, preHyphenatedTitle, crazyTitle;
    testTitle = 'The Day The Earth Stood Still';
    singleWordTitle = 'Fargo';
    preHyphenatedTitle = 'rumble-in-the-bronx';
    crazyTitle = '*!@#!@#!@$_A-Series*} -&% {+_!@#of&unfortunate#events_!@@#!@#';

    beforeEach(window.module('app.shared'));
    beforeEach(inject(function(_FriendlyUrlService_) {
        underTest = _FriendlyUrlService_;
    }));

    it('Given a space delimited string then it should return a hyphenated slug', function() {
        var expected = 'the-day-the-earth-stood-still';
        expect(underTest.createSlug(testTitle)).toEqual(expected);
    });

    it('Given a single word then it should return the word lowercased', function(){
        var expected = 'fargo';
        expect(underTest.createSlug(singleWordTitle)).toEqual(expected);
    });

    it('Given a sentence that is already hyphenated then it returns the sentence hyphenated and lowercased', function(){
        var expected = 'rumble-in-the-bronx';
        expect(underTest.createSlug(preHyphenatedTitle)).toEqual(expected);
    });

    it('Given a sentence with a combination of special characters then it returns a correctly formatted slug', function(){
        var expected = 'a-series-of-unfortunate-events';
        expect(underTest.createSlug(crazyTitle)).toEqual(expected);
    })
});
