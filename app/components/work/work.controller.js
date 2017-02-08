import PostService from '../post/post.service';

class WorkController {
    constructor($scope,
                NavbarService,
                PostService) {

        this.navItems = NavbarService.getNavItems('home');
        PostService.getPostsByTagName('Work')
            .then(function (data) {
                $scope.posts = data;
            });
    }
}

export default WorkController;
