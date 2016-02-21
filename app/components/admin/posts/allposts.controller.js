import analyticsService from '../../analytics/analytics.service';
import PostService from '../../post/post.service';
import NavUtilsService from '../../../shared/utils/navutils.service';
import MessageUtilsService from '../../../shared/utils/messageutils.service';
import _ from 'underscore';
import elasticui from 'elasticui';
import $translate from 'pascalprecht.translate';

class AllPostsController {
    constructor($scope,
        $location,
        $http,
        analyticsService,
        NavUtilsService,
        MessageUtilsService,
        PostService) {

    $scope.posts = {};
    $scope.navItems = NavUtilsService.getAdminNavItems();

    // display status
    $scope.messages = MessageUtilsService.notification;

    PostService.getPosts().then(function(posts){
        $scope.posts = posts.data;
    });

    }

}

export
default AllPostsController;