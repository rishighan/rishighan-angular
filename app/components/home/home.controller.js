class HomeController {
    constructor($scope, PostService) {
        $scope.pagerDefaults = {
            page: 1,
            pageSize: 10
        };
        $scope.posts = {};
        $scope.heroPost = {};
        PostService.getPosts($scope.pagerDefaults.page, $scope.pagerDefaults.pageSize)
            .then(function (result) {
                $scope.posts = result.data;
                $scope.heroPost = _.pick($scope.posts.docs, function(val, key){
                    if(!_.isEmpty(_.where(val.tags, {id: "Hero"}))){
                        return _.where(val.tags, {id: "Hero"});
                    }
                    return false;
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