import PostService from './post.service';

class PostController {
    constructor(PostService, $scope) {
        $scope.readResult = '';
        PostService.read().then(function(test2) {
            $scope.readResult = test2;
        });

        $scope.writeResult = '';
        PostService.create().then(function(test3) {
            $scope.writeResult = test3;
        });
    }
}

export
default PostController;