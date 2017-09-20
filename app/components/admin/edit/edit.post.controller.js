import FormlyDataService from "../../../shared/utils/formlydata.service";
import HelperService from "../../../shared/utils/helper.service";
import previewTemplate from "../dropzone/dropzone-preview.html";
import _ from "underscore";

class EditPostController {
    constructor($scope,
                $compile,
                $state,
                $timeout,
                $stateParams,
                PostService,
                $translate,
                ngNotify) {

        // form model
        $scope.post = {};
        let formlyDataService = FormlyDataService.formlyDataFactory();
        let helperService = HelperService.helperFactory();
        $scope.postDataPromise = PostService.getPost($stateParams.id).then((post) => {
            $scope.post = post.data;
            // Form Fields, pass in the tags model
            $scope.postFormFields = formlyDataService.getFormlyDataModel($scope.post[0].tags);
            return post.data;
        });
        
        // dropzone config
        $scope.dropzoneConfig = {
            options: {
                url: "/api/files/upload",
                previewTemplate: previewTemplate,
                maxFilesize: 9000000,
                paramName: () => {
                    return "attachedFile";
                },
                maxThumbnailFilesize: 5,
                autoProcessQueue: true,
                uploadMultiple: true,
                parallelUploads: 1,
                maxFiles: 5,
                thumbnailWidth: "150",
                addRemoveLinks: true,
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
                                _dropzoneInstance.createThumbnailFromUrl(mockFile, postData[0].attachment[index].url, null, 'anonymous');
                                // this is required when you mark/un-mark an image as hero
                                let checkBoxElement = mockFile.previewTemplate.querySelector('.hero-checkbox');
                                checkBoxElement.setAttribute('data-filename', mockFile.name);
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
                success: (file, response) => {
                    $compile($(file.previewTemplate))($scope);
                    // update the form model with the correct filename
                    let fileNameElement = file.previewTemplate.querySelector('.dz-filename');
                    fileNameElement.innerHTML = response.file.originalname;
                    // mark an image as a hero
                    let checkBoxElement = file.previewTemplate.querySelector('.hero-checkbox');
                    checkBoxElement.setAttribute('data-filename', response.file.originalname);
                    let fileObj = {
                        name: response.file.originalname,
                        url: response.file.location,
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
                    // api call to delete from s3
                    let params = [{'Key': file.name}];
                    PostService.deleteFile(params).then(function (result) {
                        if (result.status === 200) {
                            ngNotify.set($translate.instant('admin.file_deleted_success.message'), {
                                type: "success"
                            });
                        } else {
                            ngNotify.set($translate.instant('admin.file_deleted_error.message'), {
                                type: "error"
                            });
                        }
                    });
                    // update the form model
                    let del = _.where($scope.post[0].attachment, {
                        name: file.name
                    });
                    $scope.post[0].attachment = _.without($scope.post[0].attachment, del[0]);
                    $scope.$digest();
                    let _ref = file.previewElement;
                    return _.isNull(_ref) ? _ref.parentNode.removeChild(file.previewElement) : void 0;
                }
            }
        };
        $scope.makeHero = event => {
            let markedPost = _.where($scope.post[0].attachment, {name: event.target.dataset.filename})[0];
            markedPost.isHero = !!event.target.checked;
        };

        // update post
        $scope.updatePost = (data, statusData) => {
            if (timeout) {
                $timeout.cancel(timeout);
            }
            $scope.post[0].slug = helperService.createSlug($scope.post[0].title);
            $scope.post[0].is_draft = statusData.isDraft || false;
            $scope.post[0].is_archived = statusData.isArchived || false;
            PostService.updatePost($scope.post[0]._id, $scope.post[0], true)
                .then((result) => {
                    //todo flash alert
                    $state.go('admin.posts')
                        .then(function () {
                            ngNotify.set($translate.instant('admin.success_edit.message'), {
                                type: "success"
                            });
                        });
                });
        };

        $scope.deletePost = post => {
            if (timeout) {
                $timeout.cancel(timeout);
            }
            // delete files
            // todo: refactor this to be synchronous
            if (post[0].attachment.length !== 0) {
                let fileNames = _.pluck(post[0].attachment, 'name');
                let params = [];
                // pass an array of filenames to aws sdk to delete
                fileNames.map((filename) => {
                    params.push({
                        'Key': filename
                    });
                });
                PostService.deleteFile(params)
                    .then((result) => {
                        console.log("deletion", result);
                    });
            }
            // delete post
            PostService.deletePost(post[0]._id)
                .then(() => {
                    $state.go('admin.posts')
                        .then(function () {
                            ngNotify.set($translate.instant('admin.post_deleted_success.message'), {
                                type: "success"
                            });
                        });
                }, error => {
                    console.log(error);
                });
        };
        // autosave
        let timeout = null;
        let saveUpdates = function () {
            // call to save/upsert as draft
            $scope.post[0].slug = helperService.createSlug($scope.post[0].title);
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

export default EditPostController;