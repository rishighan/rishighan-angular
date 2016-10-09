import FormlyDataService from "../../shared/utils/formlydata.service";
import _ from "underscore";

class AdminController {
    constructor($scope,
                $state,
                $translate,
                formlyValidationMessages,
                analyticsService,
                PostService,
                NavUtilsService,
                ngNotify) {

        analyticsService.spawnAnalytics();
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
                    // update the form model with the correct filename
                    file.customData.fileName = response.files[0].filename;
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
                addedfile: function (file) {

                },
                removedfile: function (file) {
                    // make api call to delete file from fs
                    PostService.deleteFile({
                        file: file.customData.fileName
                        // todo : flash alert
                    }).then((result) => {
                    }, (error) => {
                        // todo: flash alert
                    });

                    // update the form model
                    var del = _.where($scope.postFormModel.attachedFile, {
                        name: file.customData.fileName
                    });
                    var _ref = '';
                    $scope.postFormModel.attachedFile = _.without($scope.postFormModel.attachedFile, del[0]);
                    $scope.$digest();
                    return (_ref = file.previewElement) !== null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
                }
            }
        };

        $scope.createPost = function () {
            PostService.createPost($scope.postFormModel).then(function (data) {
                $state.go('posts').then(function () {
                    ngNotify.set($translate.instant('admin.success_create_post.message'), {
                        position: "top",
                        type: "success",
                        target: "#notification",
                        sticky: false
                    });
                });
            }, function (error) {
                ngNotify.set($translate.instant('admin.error_create_post.message'), {
                    type: "error",
                    position: "top",
                    target: "#notification"
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