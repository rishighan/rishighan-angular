class HomeController {
    constructor($scope, PostService) {
        $scope.pagerDefaults = {
            page: 1,
            pageSize: 10
        };
        $scope.posts = {};
        $scope.filteredPosts = {};
        $scope.featuredPosts = {};
        $scope.heroPost = {};
        $scope.mastheadImage = {};

        //filter out hero, work tags
        let tagsToFilter = ['hero', 'work', 'colophon', 'trampoline'];

        PostService.getPostsByTagName('Featured')
            .then(function (posts) {
                $scope.featuredPosts = posts.data;
            });

        PostService.getPostsByTagName('Hero')
            .then(function (post) {
                $scope.heroPost = post.data;
                $scope.mastheadImage = _.where($scope.heroPost[0].attachment, {isHero: true});
            });

        // todo: streamline this ghetto shit.
        $scope.postPromise = PostService.getPosts($scope.pagerDefaults.page, $scope.pagerDefaults.pageSize)
            .then(function (result) {
                $scope.posts = result.data;
                $scope.filteredPosts = _.reject($scope.posts.docs, function (post) {
                    let rejectedTags = _.filter(post.tags, function (tag) {
                        return _.contains(tagsToFilter, tag.id.toLowerCase());
                    });
                    return rejectedTags.length === 1;
                });
            });

        this.navItems = [{
            displayName: "Home",
            stateReference: "home"
        }, {
            displayName: "Work",
            stateReference: "work"
        }, {
            displayName: "Trampoline",
            stateReference: "post"
        },
            {
                displayName: "Illustrations",
                stateReference: "illustrations"
            }];

        this.jsonId = {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "Rishi Ghan",
            "alternateName": "Ninth Muse",
            "url": "http://rishighan.com"
        };

    }
}

export
default HomeController;