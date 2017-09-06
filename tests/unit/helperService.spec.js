'use strict';
describe('HelperService Tests', function () {
    var testTitle, underTest, singleWordTitle, preHyphenatedTitle, crazyTitle, tagList;
    testTitle = 'The Day The Earth Stood Still';
    singleWordTitle = 'Fargo';
    preHyphenatedTitle = 'rumble-in-the-bronx';
    crazyTitle = '*!@#!@#!@$_A-Series*} -&% {+_!@#of&unfortunate#events_!@@#!@#';
    tagList = [
        {
            "id": "Illustrations",
            "_id": "58a4562635197754286b2ba7"
        },
        {
            "id": "Hero",
            "_id": "59adcd6780976bbb21eed39b"
        }
    ];

    beforeEach(function () {
        module('app.shared');
    });
    beforeEach(inject(function (_HelperService_) {
        underTest = _HelperService_;
    }));

    it('Given a space delimited string then it should return a hyphenated slug', function () {
        console.log(underTest);
        var expected = 'the-day-the-earth-stood-still';
        expect(underTest.createSlug(testTitle)).toEqual(expected);
    });

    it('Given a single word then it should return the word lowercased', function () {
        var expected = 'fargo';
        expect(underTest.createSlug(singleWordTitle)).toEqual(expected);
    });

    it('Given a sentence that is already hyphenated then it returns the sentence hyphenated and lowercased', function () {
        var expected = 'rumble-in-the-bronx';
        expect(underTest.createSlug(preHyphenatedTitle)).toEqual(expected);
    });

    it('Given a sentence with a combination of special characters then it returns a correctly formatted slug', function () {
        var expected = 'a-series-of-unfortunate-events';
        expect(underTest.createSlug(crazyTitle)).toEqual(expected);
    });

    // isTag tests
    it('Given an array of tags, it returns false if the input tag is not found', function () {
        var tag = {
            id: "someathin",
            _id: "123"
        };
        expect(underTest.isTag(tagList, tag.id)).toBe(false);
    });

    it('Given an array of tags, it returns true if input tag is found', function () {
        var tag = {
            id: "hero",
            _id: "123"
        };
        expect(underTest.isTag(tagList, tag.id)).toBe(true);
    });
});
