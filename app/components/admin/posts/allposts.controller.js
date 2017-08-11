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
            .then((posts) => {
                $scope.posts = posts.data;
                // Analytics for trending posts
                // get data for each slug
                // {x: 12, y: 2016-11-2, slug: 'sinking-in-the-quicksand'}
                console.log($scope.posts)
                _.each($scope.posts.docs, (post)  => {
                    AnalyticsService.getAnalytics({slug: post.slug})
                        .then((data) => {
                            console.log(post);
                            post.pageviews = $scope.calculatePageViews(data)
                        })
                });
            })


        $scope.analyticsData = [];


        $scope.calculatePageViews = function (result) {
            return _.map(result.data.rows, function (item) {
                // data -> [{x: 1, y: 123},  {x: 123, y: 132}]
                return {
                    x: moment(item[0]).format("MMM Do YY"),
                    y: parseInt(item[2], 10)
                };
            });
        };

        $scope.getMore = function (page, pageOffset) {
            PostService.getPosts(page, pageOffset)
                .then(function (posts) {
                    $scope.posts = posts.data;
                });
        };

        $scope.searchPost = function (pageOffset, pageSize) {
            let searchTerm = $scope.searchTerm;
            // if search box is empty and no change is detected
            // populate with all posts
            if ($scope.searchTerm === '') {
                $scope.getMore($scope.pagerDefaults.page, $scope.pagerDefaults.pageSize);
            } else {
                PostService.searchPost(searchTerm, pageOffset, pageSize)
                    .then((result) => {
                        $scope.posts = result.data;
                    });
            }
        };
        $scope.search = _.debounce($scope.searchPost, 500);


    }
}
export default AllPostsController;