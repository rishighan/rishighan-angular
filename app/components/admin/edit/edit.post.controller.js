import PostService from '../../post/post.service';
import NavUtilsService from '../../../shared/utils/navutils.service';
import FormlyDataService from '../../../shared/utils/formlydata.service';
import _ from 'underscore';
import angularTranslate from 'pascalprecht.translate';
import Q from 'Q';

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


        $scope.postDataPromise = PostService.getPost($stateParams.id).then(function(post) {
            $scope.post = post.data;
            // Form Fields
            $scope.postFormFields = $scope.formlyDataService.getFormlyDataModel($scope.post[0].tags);
            // return $scope.post;
            return post.data;
        });

        // dropzone config
        $scope.dropzoneConfig = {
            options: {
                url: "/api/files/upload",
                maxFilesize: 9000000,
                paramName: "attachedFile",
                maxThumbnailFilesize: 5,
                autoProcessQueue: true,
                uploadMultiple: true,
                parallelUploads: 1,
                maxFiles: 5,
                thumbnailWidth: "150",
                addRemoveLinks: true,
                accept: function(file, done) {
                    file.customData = {};
                    return done();
                },
                init: function(file, done) {
                    var _this = this;

                    $scope.postDataPromise.then(function(postData) {
                        // TODO: refactor this to handle multiple files
                        _.each(postData[0].attachment, function(file, index) {
                            var mockFile = {
                                name: postData[0].attachment[index].name,
                                size: postData[0].attachment[index].size
                            };
                            _this.options.addedfile.call(_this, mockFile);
                            _this.createThumbnailFromUrl(mockFile, "/assets/images/" + mockFile.name);
                            // _this.options.thumbnail.call(_this, mockFile, "/assets/images/" + mockFile.name);
                        });

                    });

                }
            },
            eventHandlers: {
                sending: function(file, xhr, formData) {
                    // renaming the file before sending
                    var newFileName = file.name.split('.')[0] + '-' + Date.now() + '.' + file.name.split('.')[file.name.split('.').length - 1];
                    formData.append("newFileName", newFileName);
                },
                success: function(file, response) {
                    // update the form model with the correct filename
                    file.customData.fileName = response.files[0].filename;
                    var fileObj = {
                        name: file.customData.fileName,
                        size: file.size,
                        date_created: Date.now(),
                        date_modified: Date.now()
                    };

                    $scope.post[0].attachment.push(fileObj);
                    $scope.$digest();
                },
                maxfilesexceeded: function(file) {
                    this.removeFile(file);
                },
                addedFile: function(file) {

                },

                removedfile: function(file) {
                    // TODO: refactor this to handle already existing
                    // files, so you don't have to check for the
                    // fileName param
                    // make api call to delete file from fs
                    PostService.deleteFile({
                        file: file.customData.fileName
                    }).then(function(result) {
                        console.log(result);
                    });

                    // update the form model
                    var del = _.where($scope.post[0].attachment, {
                        name: file.customData.fileName
                    });
                    var _ref = '';
                    $scope.post[0].attachment = _.without($scope.post[0].attachment, del[0]);
                    $scope.$digest();
                    return (_ref = file.previewElement) !== null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
                }
            }
        };


    }

}

export
default EditPostController;