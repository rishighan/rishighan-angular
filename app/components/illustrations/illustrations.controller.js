import PostService from '../post/post.service';

class IllustrationController {
    constructor($scope,
                NavbarService,
                PostService) {
        this.navItems = NavbarService.getNavItems('home');
        $scope.posts = {};
        $scope.illustration = {};
        $scope.illustrationsPromise = PostService.getPostsByTagName('Illustrations')
            .then(function (result) {
                $scope.posts = result.data.docs;
                _.each($scope.posts, function (post) {
                    $scope.illustration = _.where(post.attachment, {isHero: true});
                });
            }, function (error) {
                console.log(error);
            });
    }
}

export default IllustrationController;