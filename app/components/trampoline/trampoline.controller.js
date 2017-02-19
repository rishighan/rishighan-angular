import PostService from '../post/post.service';
class TrampolineController {
    constructor($scope,
                PostService) {
        $scope.posts = {};
        $scope.postsPromise = PostService.getPostsByTagName('Trampoline', 1, 20)
            .then(function (result) {
                $scope.posts = result.data.docs;
            });
    }
}

export default TrampolineController;