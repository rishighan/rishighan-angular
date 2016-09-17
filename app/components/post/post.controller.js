import PostService from './post.service';

// TODO: hook up the post create/edit form here
// Call service methods to insert/update
class PostController {
    constructor(PostService, $scope) {
        $scope.readResult = '';
        PostService.read().then(function(data) {
            $scope.readResult = data;

        });

        $scope.writeResult = '';
        PostService.create().then(function(data) {
            $scope.writeResult = data;
        });
    }
}

export
default PostController;