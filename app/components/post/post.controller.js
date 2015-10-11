import PostService from './post.service';

// TODO: hook up the post create/edit form here
// Call service methods to insert/update
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