function SingleController($scope,
                          $stateParams,
                          PostService) {
    $scope.post = {};
    $scope.jsonLd = {};
    $scope.heroImage = '';
    $scope.postPromise = PostService.getPost($stateParams.id, $stateParams.slug)
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
            $scope.heroImage = _.where($scope.post.data[0].attachment, {isHero: true});

        }, function (error) {
            $scope.heroImage = {};
        });

}


export
default SingleController;