import PostService from './post.service';

class PostController {
    constructor(PostService, $scope) {
        $scope.shoo = '';
        PostService.read().then(function(test2) {
            $scope.shoo = test2;
        })
    }
}

export
default PostController;