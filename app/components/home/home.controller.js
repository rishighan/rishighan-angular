let littlefoot = require('littlefoot').default;
require('littlefoot.css');
import HelperService from '../../shared/utils/helper.service';

class HomeController {
    constructor($scope, $document, PostService) {
        let pagerDefaults = {
            page: 1,
            pageSize: 20
        };
        $scope.helperUtils = HelperService.helperFactory();
        $scope.blogPosts = {};
        $scope.featuredPosts = {};
        $scope.heroPost = {};
        $scope.mastheadImage = {};
        PostService.getPostsByTagName('Featured')
            .then((posts) => {
                $scope.featuredPosts = posts.data.docs;
            });

        PostService.getPostsByTagName('Hero', 1, 1)
            .then((post) => {
                $scope.heroPost = post.data.docs;
                $scope.mastheadImage = _.where($scope.heroPost[0].attachment, {isHero: true});
            });
        $scope.postPromise = PostService.getPostsByTagName('Blog', pagerDefaults.page, pagerDefaults.pageSize)
            .then((posts) => {
                //init littlefoot footnotes
                $document.ready(() => {
                    littlefoot({
                        allowDuplicates: false,
                        activateOnHover: true,
                        hoverDelay: 10
                    }).activate();
                });
                $scope.blogPosts = posts.data.docs;
            });

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