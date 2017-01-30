class HomeController {
    constructor($scope, PostService) {
        $scope.pagerDefaults = {
            page: 1,
            pageSize: 10
        };
        $scope.posts = {};
        $scope.filteredPosts = {};
        $scope.heroPost = {};
        $scope.mastheadImage = {};
        //filter out hero, work tags
        let tagsToFilter = ['Hero', 'Work', 'colophon'];
        // todo: streamline this ghetto shit.
        $scope.postPromise = PostService.getPosts($scope.pagerDefaults.page, $scope.pagerDefaults.pageSize)
            .then(function (result) {
                $scope.posts = result.data;
                $scope.filteredPosts = _.reject($scope.posts.docs, function (post) {
                    let rejectedTags = _.filter(post.tags, function (tag) {
                        return _.contains(tagsToFilter, tag.id);
                    });
                    return rejectedTags.length === 1;
                });
                $scope.heroPost = _.pick($scope.posts.docs, function (val, key) {
                    if (!_.isEmpty(_.where(val.tags, {id: "Hero"}))) {
                        return _.where(val.tags, {id: "Hero"});
                    }
                    return false;
                });
                $scope.mastheadImage = _.where($scope.heroPost[0].attachment, {isHero: true});
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
                displayName: "Thesis",
                stateReference: "thesis"
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