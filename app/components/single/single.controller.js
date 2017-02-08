import PostService from '../post/post.service';

function SingleController($scope,
                          $stateParams,
                          NavbarService,
                          PostService) {
    $scope.post = {};
    this.navItems = NavbarService.getNavItems('home');
    $scope.jsonLd = {};
    PostService.getPost($stateParams.id, $stateParams.slug)
        .then(function (data) {
            $scope.post = data;
            $scope.jsonLd = {
                "@context": "http://schema.org",
                "@type": "BlogPosting",
                "headline": $scope.post.data[0].title,
                "alternativeHeadline": $scope.post.data[0].excerpt,
                "editor": "Rishi Ghan",
                "datePublished": $scope.post.data[0].date_created,
                "dateCreated": $scope.post.data[0].date_created,
                "dateModified": $scope.post.data[0].date_updated,
                "articleBody": $scope.post.data[0].content,
                "author": {
                    "@type": "Person",
                    "name": "Rishi Ghan"
                }
            };

        });
}


export
default SingleController;