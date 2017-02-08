const moment = require('moment');
class AllPostsController {
    constructor($scope,
                NavbarService,
                AnalyticsService,
                PostService) {
        $scope.posts = {};
        $scope.navItems = NavbarService.getNavItems('admin');
        $scope.pagerDefaults = {
            page: 1,
            pageSize: 5
        };
        $scope.searchTerm = '';
        PostService.getPosts($scope.pagerDefaults.page, $scope.pagerDefaults.pageSize)
            .then(function (posts) {
                $scope.posts = posts.data;
            });

        $scope.getMore = function (page, pageOffset) {
            PostService.getPosts(page, pageOffset)
                .then(function (posts) {
                    $scope.posts = posts.data;
                });
        };

        $scope.searchPost = function (pageOffset, pageSize) {
            var searchTerm = $scope.searchTerm;
            // if search box is empty and no change is detected
            // populate with all posts
            if ($scope.searchTerm === '') {
                $scope.getMore($scope.pagerDefaults.page, $scope.pagerDefaults.pageSize);
            } else {
                PostService.searchPost(searchTerm, pageOffset, pageSize)
                    .then(function (result) {
                        $scope.posts = result.data;
                    });
            }
        };
        $scope.search = _.debounce($scope.searchPost, 500);

        $scope.analyticsData = [];
        // get data for each slug
        // {x: 12, y: 2016-11-2, slug: 'sinking-in-the-quicksand'}
        $scope.query = {
            slug: 'configuring-clover-for-handoff-and-continuity-in-yosemite'
        };
        //get analytics
        $scope.analyticsPromise = AnalyticsService.getAnalytics($scope.query).then(function (result) {
            $scope.analyticsData = _.map(result.data.rows, function (item) {
                // data -> [{x: 1, y: 123},  {x: 123, y: 132}]
                return {
                    x: moment(item[0]).format("MMM Do YY"),
                    y: parseInt(item[2], 10)
                };
            });
        }, function (error) {
            $scope.analyticsData = {};
        });
    }
}
export default AllPostsController;