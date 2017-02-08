import PostService from '../post/post.service';

// TODO: hook up the post create/edit form here
// Call service methods to insert/update
function SingleController ($scope, $stateParams, PostService){
    $scope.post = {};
    PostService.getPost($stateParams.id, $stateParams.slug).then(function(data){
        $scope.post = data;
    });
}



export
default SingleController;