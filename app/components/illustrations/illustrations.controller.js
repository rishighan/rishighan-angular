class IllustrationController {
    constructor($scope,
                PostService) {
        $scope.posts = {};
        $scope.illustrationsPromise = PostService.getPostsByTagName('Illustrations')
            .then(function (result) {
                $scope.posts = result.data.docs;
            }, function (error) {
                console.log(error);
            });
    }
}

export default IllustrationController;