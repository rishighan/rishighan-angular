class AllPostsController {
    constructor($scope,
                NavbarService,
                AnalyticsService,
                PostService) {
        $scope.posts = {};
        $scope.trendingPosts = [];
        $scope.temp = [];
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

        // Todo: refactor this garbage fire
        // In a nutshell, it gets data from GA in
        // this form: ["20170719", "Clover, Handoff And Continuity In Yosemite", "1"]
        // There is a row for pageviews per day, per post, which leads to duplicates
        // We de-dupe that in the following manner:
        AnalyticsService.getAnalytics()
            .then((data) => {
                _.chain(data.data.rows)
                    .groupBy((row) => {
                     /* outputs:
                        array of arrays grouped by the post title
                        [...
                            ["20170718", "Rishi Ghan", "4"]
                            ["20170720", "Rishi Ghan", "3"]
                            ["20170722", "Rishi Ghan", "1"]
                        ...] */
                        return row[1]
                    })
                    .map((group) => {
                     /* outputs rows:
                       ...[
                            pageTitle: "Rishi Ghan",
                            analytics: {
                               date: "20170718",
                               pageviews: 4
                            }
                          ]... */
                        return _.map(group, (record) => {
                            return {
                                pageTitle: record[1],
                                analytics: {
                                    date: record[0],
                                    pageviews: parseInt(record[2], 10)
                                }
                            }
                        })
                    })
                    .map((record) => {
                        /* creates a temp object:
                           Rishi Ghan:
                              title:"Rishi Ghan",
                              data: []
                           and passes the result of the operation along to the next
                           operation in the _.chain */
                        let analyticsObj = [];
                        let partialResult = _.each(record, (item) => {
                            let title = _.pick(item, 'pageTitle');
                            analyticsObj[title.pageTitle] = {title: title.pageTitle, data: []};
                        });
                        $scope.temp.push(analyticsObj);
                        return partialResult;
                    })
                    .each((row) => {
                        /* Takes all the pageviews from the partial result and pushes them into the
                           data key of the temp object
                           Rishi Ghan:
                             title: "Rishi Ghan"
                             data:
                                 [...
                                     { date: "20170718", pageviews: 4},
                                     { date: "20170720", pageviews: 3},
                                     { date: "20170722", pageviews: 1}
                                 ...]  */
                        row.map((record) => {
                            let idx = _.findIndex($scope.temp, record.pageTitle);
                            $scope.temp[idx][record.pageTitle].data.push(record.analytics);
                        });
                    });

                $scope.temp.map((post) => {
                    /*Finally the de-duped output, after removal of the redundant title key:
                      title: "Rishi Ghan"
                      data: [...
                              {date: "20170718", pageviews: 4},
                              {date: "20170720", pageviews: 3},
                              {date: "20170722", pageviews: 1}
                            ...] */
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