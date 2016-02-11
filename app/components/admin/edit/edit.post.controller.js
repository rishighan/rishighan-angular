import PostService from '../../post/post.service';
import NavUtilsService from '../../../shared/utils/navutils.service';
import FormlyDataService from '../../../shared/utils/formlydata.service';
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
        $scope.formlyDataService = FormlyDataService.formlyDataFactory();

        PostService.getPost($stateParams.id).then(function(post) {
            $scope.post = post.data;
            // Form Fields
            $scope.postFormFields = $scope.formlyDataService.getFormlyDataModel($scope.post[0].tags);
        });
    }

}

export
default EditPostController;