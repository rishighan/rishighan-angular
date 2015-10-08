import PostService from './post.service';

class PostController {
    constructor(PostService, $scope) {
        $scope.shoo = '';
        PostService.read().then(function(test2) {
            $scope.shoo = test2;
        });

        $scope.writeResult = '';
        PostService.create().then(function(test3) {
            $scope.writeResult = test3;
        })
    }
}

export
default PostController;