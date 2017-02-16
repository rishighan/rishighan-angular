import PostService from '../post/post.service';

class IllustrationController{
    constructor($scope, NavbarService, PostService){
        this.navItems = NavbarService.getNavItems('home');
        $scope.illustrations = {};
        $scope.illustrationsPromise = PostService.getPostsByTagName('illustrations')
            .then(function(data){
                $scope.illustrations = data;
                console.log(data);
            }, function(error){
                console.log(error);
            });
    }
}

export default IllustrationController;