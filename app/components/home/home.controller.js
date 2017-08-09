let littlefoot = require('littlefoot').default;
require('littlefoot.css');

class HomeController {
    constructor($scope, $document, PostService) {
        $document.ready(() => {
            littlefoot({
                allowDuplicates: false,
                activateOnHover: true,

            }).activate();
        });
        let pagerDefaults = {
            page: 1,
            pageSize: 20
        };
        $scope.blogPosts = {};
        $scope.featuredPosts = {};
        $scope.heroPost = {};
        $scope.mastheadImage = {};

        PostService.getPostsByTagName('Featured')
            .then(function (posts) {
                $scope.featuredPosts = posts.data.docs;
            });

        PostService.getPostsByTagName('Hero', 1, 1)
            .then(function (post) {
                $scope.heroPost = post.data.docs;
                $scope.mastheadImage = _.where($scope.heroPost[0].attachment, {isHero: true});
            });

        $scope.postPromise = PostService.getPostsByTagName('Blog', pagerDefaults.page, pagerDefaults.pageSize)
            .then(function(posts){
                $scope.blogPosts = posts.data.docs;
            });

        $scope.isTag = function (tags, tagname) {
            return _.contains(_.map(tags, function (tag) {
                return tag.id.toLowerCase() === tagname ? true : false;
            }), true);
        };

        this.jsonLd = {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "Rishi Ghan",
            "jobTitle": "Javascript Engineer",
            "alternateName": "Ninth Muse",
            "url": "http://rishighan.com"
        };

    }
}

export
default HomeController;