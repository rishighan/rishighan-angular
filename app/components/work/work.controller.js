import PostService from '../post/post.service';

class WorkController {
    constructor($scope,
                PostService) {
        PostService.getPostsByTagName('Work')
            .then(function (result) {
                $scope.posts = result.data.docs;
            });
    }
}

export default WorkController;
