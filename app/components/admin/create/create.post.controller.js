import FormlyDataService from "../../../shared/utils/formlydata.service";
import HelperService from "../../../shared/utils/helper.service";
import previewTemplate from '../dropzone/dropzone-preview.html';
import _ from "underscore";

class CreatePostController {
    constructor($scope,
                $state,
                $compile,
                $translate,
                PostService,
                formlyValidationMessages,
                ngNotify) {

        let formlyDataService = FormlyDataService.formlyDataFactory();
        let helperService = HelperService.helperFactory();

        $scope.postFormModel = {
            attachedFile: []
        };

        // admin nav
        const FILE_UPLOAD_URL = "/api/files/upload";
        // todo: should come from a service
        const testData = [{
            "id": "Technical",
            "label": "Technical"
        }, {
            "id": "Hero",
            "label": "Hero"
        }, {
            "id": "Hackintosh",
            "label": "Hackintosh"
        }, {
            "id": "Highlight",
            "label": "Highlight"
        }, {
            "id": "General",
            "label": "General"
        }];


        // dropzone config
        $scope.dropzoneConfig = {
            options: {
                url: FILE_UPLOAD_URL,
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
                addRemoveLinks: true
            },
            eventHandlers: {
                success: function (file, response) {
                    $compile($(file.previewTemplate))($scope);
                    // update the form model with the correct filename
                    let fileNameElement = document.createElement('div');
                    fileNameElement.className = 'dz-metadata';
                    fileNameElement.appendChild(document.createTextNode(response.file.originalname));
                    let checkBoxElement = file.previewTemplate.querySelector('.hero-checkbox');
                    checkBoxElement.setAttribute('data-filename', response.file.originalname);
                    let fileObj = {
                        name: response.file.originalname,
                        size: file.size,
                        url: response.file.location,
                        date_created: Date.now(),
                        date_modified: Date.now()
                    };
                    $scope.postFormModel.attachedFile.push(fileObj);
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
                    let del = _.where($scope.postFormModel.attachedFile, {
                        name: file.name
                    });
                    $scope.postFormModel.attachedFile = _.without($scope.postFormModel.attachedFile, del[0]);
                    $scope.$digest();
                    let _ref = file.previewElement;
                    return _.isNull(_ref) ? _ref.parentNode.removeChild(file.previewElement) : void 0;
                }
            }
        };
        $scope.makeHero = function (event) {
            let markedPost = _.where($scope.postFormModel.attachedFile, {name: event.target.dataset.filename})[0];
            markedPost.isHero = !!event.target.checked;
        };

        $scope.createPost = function (isDraft) {
            if (isDraft) {
                $scope.postFormModel.isDraft = isDraft;
            }
            $scope.postFormModel.slug = helperService.createSlug($scope.postFormModel.title);
            PostService.createPost($scope.postFormModel).then(function () {
                $state.go('admin.posts').then(function () {
                    if ($scope.postFormModel.isDraft) {
                        ngNotify.set($translate.instant('admin.success_create_draft.message'), {
                            type: "success"
                        });
                    } else {
                        ngNotify.set($translate.instant('admin.success_create_post.message'), {
                            type: "success"
                        });
                    }
                });
            }, function (error) {
                ngNotify.set($translate.instant('admin.error_create_post.message'), {
                    type: "error"
                });
            });
        };


        // validation
        this.options = {};
        formlyValidationMessages.addTemplateOptionValueMessage('maxlength', 'maxlength', '', 'is the maximum length', 'Too long');
        formlyValidationMessages.addTemplateOptionValueMessage('minlength', 'minlength', '', 'is the minimum length', 'Too short');
        formlyValidationMessages.messages.required = 'to.label + " is required"';
        formlyValidationMessages.messages.email = '$viewValue + " is not a valid email address"';

        // Form Fields
        $scope.postFormFields = formlyDataService.getFormlyDataModel(testData);

    }
}

export default CreatePostController;