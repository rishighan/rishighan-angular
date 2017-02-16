import PostService from '../post/post.service';

class IllustrationController{
    constructor($scope, NavbarService, PostService){
        this.navItems = NavbarService.getNavItems('home');
        $scope.illustrations = {};
        $scope.illustrationsPromise = PostService.getPostsByTagName('Illustrations')
            .then(function(result){
                $scope.illustrations = result.data.docs;
            }, function(error){
                console.log(error);
            });
    }
}

export default IllustrationController;