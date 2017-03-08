"use strict";
describe("Edit Post Controller Tests ", function () {
    var controller, post, deferred, $compile, $scope, PostService;
    post = {
        "attachedFile": [
            {
                "name": "module_installed-1481748625021.jpg",
                "size": 174222,
                "date_created": 1481748625067,
                "date_modified": 1481748625067
            },
            {
                "name": "New Note-1481748633066.png",
                "size": 2353936,
                "date_created": 1481748633125,
                "date_modified": 1481748633125
            }
        ],
        "title": "This is a Test Post For the Poor",
        "tags": [
            {
                "id": "Technical",
                "label": "Technical"
            },
            {
                "id": "General",
                "label": "General"
            }
        ],
        "content": "asdasd",
        "excerpt": "aqsdasd"
    };

    beforeEach(window.module('app.components'));
    beforeEach(function($controller){
        inject(function (_$compile_, $rootScope, $q, $timeout, _PostService_) {
            $compile = _$compile_;
            $scope = $rootScope.$new();
            PostService = _PostService_;
            controller = $controller('EditPostController', {
                $scope: $scope,
                PostService: PostService
            });
        });
    });
    it("Should make a call to update post when edits are made", function () {
        post.title = "This is a test";
        expect(PostService.updatePost(post)).toHaveBeenCalled();
    });


});