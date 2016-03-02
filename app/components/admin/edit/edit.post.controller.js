import PostService from '../../post/post.service';
import NavUtilsService from '../../../shared/utils/navutils.service';
import MessageUtilsService from '../../../shared/utils/messageutils.service';
import FormlyDataService from '../../../shared/utils/formlydata.service';
import _ from 'underscore';
import $translate from 'pascalprecht.translate';

class EditPostController {
    constructor($scope,
        $location,
        $http,
        $timeout,
        $stateParams,
        NavUtilsService,
        MessageUtilsService,
        PostService,
        $translate) {

        // admin nav
        $scope.navItems = NavUtilsService.getAdminNavItems();

        // form model
        $scope.post = {};
        $scope.formlyDataService = FormlyDataService.formlyDataFactory();

        $scope.postDataPromise = PostService.getPost($stateParams.id).then(function(post) {
            $scope.post = post.data;
            // Form Fields, pass in the tags model
            $scope.postFormFields = $scope.formlyDataService.getFormlyDataModel($scope.post[0].tags);
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
                    var _dropzoneInstance = this;
                    $scope.postDataPromise.then(function(postData) {
                        if (!_.isUndefined(postData[0].attachment)) {
                            _.each(postData[0].attachment, function(file, index) {
                                var mockFile = {
                                    name: postData[0].attachment[index].name,
                                    size: postData[0].attachment[index].size
                                };
                                _dropzoneInstance.options.addedfile.call(_dropzoneInstance, mockFile);
                                _dropzoneInstance.createThumbnailFromUrl(mockFile, "/assets/images/" + mockFile.name);
                                // _this.options.thumbnail.call(_this, mockFile, "/assets/images/" + mockFile.name);
                            });
                        }

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
                removedfile: function(file) {
                    // find what to delete
                    var fileToDelete = '';
                    if (!_.isUndefined(file.customData)) {
                        fileToDelete = file.customData.fileName;
                    } else {
                        fileToDelete = file.name;
                    }
                    // api call to delete from fs
                    PostService.deleteFile({
                        file: fileToDelete
                    }).then(function(result) {
                        console.log(result);
                    });

                    // update the form model
                    var del = _.where($scope.post[0].attachment, {
                        name: fileToDelete
                    });
                    var _ref = '';
                    $scope.post[0].attachment = _.without($scope.post[0].attachment, del[0]);
                    $scope.$digest();
                    return (_ref = file.previewElement) !== null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
                }
            }
        };

        // update post
        $scope.updatePost = function(data) {
            if (timeout) {
                $timeout.cancel(timeout);
            }
            PostService.updatePost($scope.post[0]._id, $scope.post[0], true).then(function(result) {
                NavUtilsService.goToAllPostsPage();
                MessageUtilsService.notify($translate('admin.success_edit.message'), 'success');
            });
        };

        // autosave
        var timeout = null;
        var saveUpdates = function() {
            // call to save/upsert as draft
            PostService.updatePost($scope.post[0]._id, $scope.post[0], true).then(function(result) {
                $scope.autosaveStatus = 'Saved';
                $timeout(function() {
                    $scope.autosaveStatus = '';
                }, 3000);
            });
        };

        var debounceUpdates = function(newValue, oldValue) {
            if (newValue !== oldValue) {
                if (timeout) {
                    $timeout.cancel(timeout);
                }
                timeout = $timeout(saveUpdates, 4000);
            }
        };

        $scope.$watch('post[0].content', debounceUpdates);
        $scope.$watch('post[0].title', debounceUpdates);
        $scope.$watch('post[0].excerpt', debounceUpdates);
        $scope.$watchCollection('post[0].tags', debounceUpdates);
        $scope.$watchCollection('post[0].citation', debounceUpdates);
        $scope.$watchCollection('post[0].attachment', debounceUpdates);
    }

}

export
default EditPostController;