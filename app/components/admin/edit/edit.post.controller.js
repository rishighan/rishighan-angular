import FormlyDataService from "../../../shared/utils/formlydata.service";
import previewTemplate from "../dropzone/dropzone-preview.html";
import _ from "underscore";

class EditPostController {
    constructor($scope,
                $q,
                $compile,
                $state,
                $timeout,
                $stateParams,
                PostService,
                FriendlyUrlService,
                DomHelperService,
                $translate,
                ngNotify) {

        const ASSETS_FOLDER = '/assets/images/';

        // form model
        $scope.post = {};
        $scope.formlyDataService = FormlyDataService.formlyDataFactory();

        $scope.postDataPromise = PostService.getPost($stateParams.id).then((post) => {
            $scope.post = post.data;
            // Form Fields, pass in the tags model
            $scope.postFormFields = $scope.formlyDataService.getFormlyDataModel($scope.post[0].tags);
            return post.data;
        });

        // dropzone config
        $scope.dropzoneConfig = {
            options: {
                url: "/api/files/upload",
                previewTemplate: previewTemplate,
                maxFilesize: 9000000,
                paramName: "attachedFile",
                maxThumbnailFilesize: 5,
                autoProcessQueue: true,
                uploadMultiple: true,
                parallelUploads: 1,
                maxFiles: 5,
                thumbnailWidth: "150",
                addRemoveLinks: true,
                accept: function (file, done) {
                    file.customData = {};
                    return done();
                },
                init: function (file, done) {
                    let _dropzoneInstance = this;
                    $scope.postDataPromise.then((postData) => {
                        if (!_.isUndefined(postData[0].attachment)) {
                            _.each(postData[0].attachment, function (file, index) {
                                let mockFile = {
                                    name: postData[0].attachment[index].name,
                                    size: postData[0].attachment[index].size
                                };
                                _dropzoneInstance.options.addedfile.call(_dropzoneInstance, mockFile);
                                _dropzoneInstance.createThumbnailFromUrl(mockFile, ASSETS_FOLDER + mockFile.name);
                                $compile($(mockFile.previewTemplate))($scope);
                                if (postData[0].attachment[index].isHero) {
                                    let heroCheckbox = mockFile.previewTemplate.querySelector('.hero-checkbox');
                                    heroCheckbox.checked = true;
                                }
                            });
                        }
                    });
                }
            },
            eventHandlers: {
                sending: function (file, xhr, formData) {
                    // renaming the file before sending
                    let newFileName = file.name.split('.')[0] + '-' + Date.now() + '.' + file.name.split('.')[file.name.split('.').length - 1];
                    formData.append("newFileName", newFileName);
                },
                success: function (file, response) {
                    $compile($(file.previewTemplate))($scope);
                    // update the form model with the correct filename
                    file.customData.fileName = response.files[0].filename;
                    let fileNameElement = file.previewTemplate.querySelector('.dz-filename');
                    fileNameElement.innerHTML = file.customData.fileName;
                    let fileObj = {
                        name: file.customData.fileName,
                        size: file.size,
                        date_created: Date.now(),
                        date_modified: Date.now()
                    };

                    $scope.post[0].attachment.push(fileObj);
                    $scope.$digest();
                },
                maxfilesexceeded: function (file) {
                    this.removeFile(file);
                },
                removedfile: function (file) {
                    // find what to delete
                    let fileToDelete = '';
                    if (!_.isUndefined(file.customData)) {
                        fileToDelete = file.customData.fileName;
                    } else {
                        fileToDelete = file.name;
                    }
                    // api call to delete from fs
                    PostService.deleteFile({
                        file: fileToDelete
                    }).then(function (result) {
                        //todo: winston logging
                        console.log(result);
                    });

                    // update the form model
                    let del = _.where($scope.post[0].attachment, {
                        name: fileToDelete
                    });
                    $scope.post[0].attachment = _.without($scope.post[0].attachment, del[0]);
                    $scope.$digest();
                    let _ref = file.previewElement;
                    return _.isNull(_ref) ? _ref.parentNode.removeChild(file.previewElement) : void 0;
                }
            }
        };
        $scope.makeHero = function (event) {
            // todo: find a reliable way to get .dz-filename
            let anchorElement = DomHelperService.findParentBySelector(event.target, '#preview-container');
            let fileName = anchorElement.querySelector('div.dz-filename').innerText;
            if (event.target.checked) {
                _.each($scope.post[0].attachment, function (fileObject, index) {
                    if (fileObject.name === fileName) {
                        $scope.post[0].attachment[index].isHero = true;
                    }
                });
            } else {
                _.each($scope.post[0].attachment, function (fileObject, index) {
                    if (fileObject.name === fileName) {
                        $scope.post[0].attachment[index].isHero = false;
                    }
                });
            }
        };

        // update post
        $scope.updatePost = function (data, isDraft) {
            if (timeout) {
                $timeout.cancel(timeout);
            }
            $scope.post[0].slug = FriendlyUrlService.createSlug($scope.post[0].title);
            $scope.post[0].is_draft = isDraft;
            PostService.updatePost($scope.post[0]._id, $scope.post[0], true)
                .then(function (result) {
                    //todo flash alert
                    $state.go('admin.posts')
                        .then(function () {
                            ngNotify.set($translate.instant('admin.success_edit.message'), {
                                type: "success"
                            });
                        });
                });
        };

        $scope.deletePost = function (post) {
            if (timeout) {
                $timeout.cancel(timeout);
            }
            let promises = [];
            if(!_.isUndefined(post[0].attachment)) {
                _.each(post[0].attachment, function (file) {
                    let promise = PostService.deleteFile({file: file.name});
                    promises.push(promise);
                });
            }

            $q.all(promises).then(function () {
                PostService.deletePost(post[0]._id)
                    .then(function () {
                        $state.go('admin.posts')
                            .then(function () {
                                ngNotify.set($translate.instant('admin.post_deleted_success.message'), {
                                    type: "success"
                                });
                            });
                    }, function (error) {
                        console.log(error);
                    });
            });
        };
        // autosave
        let timeout = null;
        let saveUpdates = function () {
            // call to save/upsert as draft
            $scope.post[0].slug = FriendlyUrlService.createSlug($scope.post[0].title);
            PostService.updatePost($scope.post[0]._id, $scope.post[0], true)
                .then(function (result) {
                    $scope.autosaveStatus = 'Saved';
                    $timeout(function () {
                        $scope.autosaveStatus = '';
                    }, 3000);
                });
        };

        let debounceUpdates = function (newValue, oldValue) {
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
        $scope.$watch('post[0].attachment', debounceUpdates, true);
    }

}

export
default
EditPostController;