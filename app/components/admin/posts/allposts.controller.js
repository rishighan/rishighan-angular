class AllPostsController {
    constructor($scope,
                NavUtilsService,
                AnalyticsService,
                PostService) {

        $scope.posts = {};
        $scope.navItems = NavUtilsService.getAdminNavItems();
        PostService.getPosts().then(function (posts) {
            $scope.posts = posts.data;
        });
        $scope.analytics = AnalyticsService;
        console.log($scope.analytics)


    }
}
export default AllPostsController;