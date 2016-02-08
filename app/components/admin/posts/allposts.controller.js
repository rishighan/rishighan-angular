import analyticsService from '../../analytics/analytics.service';
import PostService from '../../post/post.service';
import NavUtilsService from '../../../shared/utils/navutils.service';
import _ from 'underscore';
import elasticui from 'elasticui';
import angularTranslate from 'pascalprecht.translate';

class AllPostsController {
    constructor($scope,
        $location,
        $http,
        analyticsService,
        NavUtilsService,
        PostService) {

    $scope.posts = {};

    PostService.getPosts().then(function(posts){
        $scope.posts = posts.data;
    });

    }

}

export
default AllPostsController;