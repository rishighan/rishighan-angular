const moment = require('moment');
const Q = require('q');
class AllPostsController {
    constructor($scope,
                NavbarService,
                AnalyticsService,
                PostService) {
        $scope.posts = {};
        $scope.unpaginatedPosts = {};
        $scope.navItems = NavbarService.getNavItems('admin');
        $scope.pagerDefaults = {
            page: 1,
            pageSize: 5
        };
        $scope.options = {
            chart: {
                type: 'sparklinePlus',
                height: 150,
                showValues: false
            }
        };

        $scope.xFunction = function(){
            return function(d){
                return d[0];
            };
        }

        $scope.yFunction = function(){
            return function(d){
                return d[1];
            };
        }
        $scope.searchTerm = '';
        PostService.getPosts($scope.pagerDefaults.page, $scope.pagerDefaults.pageSize)
            .then((posts) => {
                $scope.posts = posts.data;
            });

        PostService.getPosts()
            .then((posts) => {
                return posts;
            }).then((posts) => {
            $scope.unpaginatedPosts = posts;
            // Analytics for trending posts
            // get data for each slug
            // {x: 12, y: 2016-11-2, slug: 'sinking-in-the-quicksand'}
            _.each($scope.unpaginatedPosts.data, (post) => {
                AnalyticsService.getAnalytics({slug: post.slug})
                    .then((data) => {
                        post.pageviews = $scope.calculatePageViews(data)
                    })
            });

        });
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