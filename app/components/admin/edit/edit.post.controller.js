import PostService from '../../post/post.service';
import NavUtilsService from '../../../shared/utils/navutils.service';
import _ from 'underscore';
import angularTranslate from 'pascalprecht.translate';

class EditPostController {
    constructor($scope,
        $location,
        $http,
        $stateParams,
        NavUtilsService,
        PostService) {

    // form model
    $scope.post = {};

    PostService.getPost($stateParams.id).then(function(post){
        $scope.post = post.data;
        console.log(post)
    });

    }

}

export
default EditPostController;