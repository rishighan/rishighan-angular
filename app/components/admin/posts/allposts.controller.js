class AllPostsController {
    constructor($scope,
                NavbarService,
                AnalyticsService,
                PostService) {
        $scope.posts = {};
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

        // Fetches a subset of posts, then fetches Google Analytics pageviews
        // and then sorts the resultset based in descending order of total page views
        // todo: sort by descending order of totalPageViews
        PostService.filterOnTags(["Highlight", "colophon"])
            .then((posts) => {
                return posts;
            })
            .then((posts) => {
                // get data for each slug
                // [1,2,4,1,4,5,6]
                _.each(posts.data, (post) => {
                    AnalyticsService.getAnalytics({slug: post.slug})
                        .then((data) => {
                            if (!_.isUndefined(data) && data.data.totalResults > 0) {
                                post.pageviews = $scope.calculatePageViews(data);
                                post.totalPageViews = data.data.totalResults;
                                $scope.trendingPosts.push(post);
                            }
                        });
                });
            });


        $scope.calculatePageViews = function (result) {
            return _.map(result.data.rows, function (item) {
                // data -> [12,23,14,66,778,232,334]
                return parseInt(item[2], 10);
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