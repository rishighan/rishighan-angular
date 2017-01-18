import FormlyDataService from "../../shared/utils/formlydata.service";
import _ from "underscore";
import dropzonePreviewTemplate from './dropzone/dropzone-preview.html';

class AdminController {
    constructor($scope,
                $state,
                $compile,
                $translate,
                formlyValidationMessages,
                PostService,
                NavUtilsService,
                FriendlyUrlService,
                DomHelperService,
                ngNotify) {

        $scope.formlyDataService = FormlyDataService.formlyDataFactory();
        $scope.postFormModel = {
            attachedFile: []
        };

        // admin nav
        this.navItems = NavUtilsService.getAdminNavItems();
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
                maxFilesize: 9000000,
                paramName: "attachedFile",
                maxThumbnailFilesize: 5,
                autoProcessQueue: true,
                uploadMultiple: true,
                parallelUploads: 1,
                maxFiles: 5,
                previewTemplate: dropzonePreviewTemplate,
                addRemoveLinks: true,
                accept: function (file, done) {
                    file.customData = {};
                    return done();
                }
            },
            eventHandlers: {
                sending: function (file, xhr, formData) {
                    // renaming the file before sending
                    var newFileName = file.name.split('.')[0] + '-' + Date.now() + '.' + file.name.split('.')[file.name.split('.').length - 1];
                    formData.append("newFileName", newFileName);
                },
                success: function (file, response) {
                    $compile($(file.previewTemplate))($scope);
                    // update the form model with the correct filename
                    file.customData.fileName = response.files[0].filename;
                    var fileNameElement = document.createElement('div');
                    fileNameElement.className = 'dz-metadata';
                    fileNameElement.appendChild(document.createTextNode(file.customData.fileName));
                    file.previewTemplate.appendChild(fileNameElement);
                    var fileObj = {
                        name: file.customData.fileName,
                        size: file.size,
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
                    PostService.deleteFile({
                        file: file.customData.fileName
                    }).then((result) => {
                        ngNotify.set($translate.instant('admin.file_deleted_success.message'), {
                            type: "success"
                        });
                    }, (error) => {
                        // todo: flash alert
                    });

                    // update the form model
                    var del = _.where($scope.postFormModel.attachedFile, {
                        name: file.customData.fileName
                    });
                    $scope.postFormModel.attachedFile = _.without($scope.postFormModel.attachedFile, del[0]);
                    $scope.$digest();
                    var _ref = file.previewElement;
                    return _.isNull(_ref) ? _ref.parentNode.removeChild(file.previewElement) : void 0;
                }
            }
        };
        $scope.makeHero = function (event) {
            // todo: find a reliable way to get .dz-filename
            var anchorElement = DomHelperService.findParentBySelector(event.target, '#preview-container');
            var fileName = anchorElement.querySelector('div.dz-metadata').innerText;
            if (event.target.checked) {
                _.each($scope.postFormModel.attachedFile, function (fileObject, index) {
                    if (fileObject.name === fileName) {
                        $scope.postFormModel.attachedFile[index].isHero = true;
                    }
                });
            } else {
                _.each($scope.postFormModel.attachedFile, function (fileObject, index) {
                    if (fileObject.name === fileName) {
                        $scope.postFormModel.attachedFile[index].isHero = false;
                    }
                });
            }
        };

        $scope.createPost = function (isDraft) {
            if (isDraft) {
                $scope.postFormModel.isDraft = isDraft;
            }
            $scope.postFormModel.slug = FriendlyUrlService.createSlug($scope.postFormModel.title);
            PostService.createPost($scope.postFormModel).then(function () {
                $state.go('posts').then(function () {
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
        $scope.postFormFields = $scope.formlyDataService.getFormlyDataModel(testData);

    }
}

export
default AdminController;