const moment = require('moment');
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