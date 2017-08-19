class AllPostsController {
    constructor($scope,
                NavbarService,
                AnalyticsService,
                PostService) {
        $scope.posts = {};
        let analyticsQuery = {
            'ids': 'ga:17894417',
            'start-date': '30daysAgo',
            'end-date': 'yesterday',
            'metrics': 'ga:pageviews',
            'dimensions': 'ga:date, ga:pageTitle',
            'filter': 'ga:pagePath=~/post/*',
        };
        $scope.trendingPosts = [];
        $scope.navItems = NavbarService.getNavItems('admin');
        $scope.pagerDefaults = {
            page: 1,
            pageSize: 5
        };

        $scope.searchTerm = '';
        PostService.getPosts($scope.pagerDefaults.page, $scope.pagerDefaults.pageSize)
            .then((posts) => {
                $scope.posts = posts.data;
            });

        $scope.trendingPostsPromise = AnalyticsService.getAnalytics(analyticsQuery)
            .then((data) => {
                let formattedResult = AnalyticsService.formatData(data.data.rows);
                formattedResult.map((post) => {
                    /* The de-duped output, after removal of the redundant title key:
                        title: "Foo Bar"
                        data: [...
                                {date: "20170718", y: 4},
                                {date: "20170720", y: 3},
                                {date: "20170722", y: 1}
                              ...],
                        totalPageViews: 23 */
                    $scope.trendingPosts.push(post[_.keys(post)]);
                });
            });

        // pagination and searching
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