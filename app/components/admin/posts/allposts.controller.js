class AllPostsController {
    constructor($scope,
                NavUtilsService,
                PostService) {

        $scope.posts = {};
        $scope.navItems = NavUtilsService.getAdminNavItems();
        PostService.getPosts().then(function (posts) {
            $scope.posts = posts.data;
        });

    }
}
export default AllPostsController;