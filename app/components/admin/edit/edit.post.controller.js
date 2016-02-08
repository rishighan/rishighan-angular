import PostService from '../../post/post.service';
import NavUtilsService from '../../../shared/utils/navutils.service';
import _ from 'underscore';
import angularTranslate from 'pascalprecht.translate';

class EditPostController {
    constructor($scope,
        $location,
        $http,
        NavUtilsService,
        PostService) {

    $scope.post = {};

    PostService.getPosts($location.search(id)).then(function(post){
        $scope.post = post.data;
    });

    }

}

export
default EditPostController;