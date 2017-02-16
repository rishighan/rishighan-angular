import PostService from '../post/post.service';

class WorkController {
    constructor($scope,
                NavbarService,
                PostService) {

        this.navItems = NavbarService.getNavItems('home');
        PostService.getPostsByTagName('Work')
            .then(function (result){
                $scope.posts = result.data.docs;
            });
    }
}

export default WorkController;
