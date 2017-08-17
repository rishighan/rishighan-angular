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
        AnalyticsService.getAnalytics()
            .then((data) => {
                let foo = _.chain(data.data.rows)
                    .groupBy((row) => {
                        return row[1]
                    })
                    .map((group) => {
                         return _.map(group, (record) => {
                            return {
                                pageTitle: record[1],
                                analytics: {
                                    date: record[0],
                                    pageviews: parseInt(record[2], 10)
                                }
                            }
                        })
                    });

                    let final = foo._wrapped.map((record) => {
                        let analyticsObj = {};
                        _.each(record, (item) => {
                            let title = _.pick(item, 'pageTitle');
                            analyticsObj[title.pageTitle] = [];
                        });
                        return analyticsObj;
                    });

                    let shoo = foo._wrapped.map((record) => {
                        _.each(record, (item) => {
                           final[item.pageTitle].push(item.analytics);
                        })
                    });
                    console.log(shoo);

                return data.data.rows;

            });

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