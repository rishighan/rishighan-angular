class AllPostsController {
    constructor($scope,
                $location,
                $http,
                analyticsService,
                NavUtilsService,
                MessageUtilsService,
                PostService) {

        $scope.posts = {};
        $scope.navItems = NavUtilsService.getAdminNavItems();

        // display status
        $scope.messages = {
            data: MessageUtilsService.notification,
            type: MessageUtilsService.status
        };

        PostService.getPosts().then(function (posts) {
            $scope.posts = posts.data;
        });

    }

}

export
default AllPostsController;