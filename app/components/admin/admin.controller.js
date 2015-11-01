class AdminController {
    constructor($scope, formlyValidationMessages) {
        this.gatirodhak = 'Jagannath, Bakwaas kam kar.';

        $scope.postFormModel = {
            flag: "Update Yoself."
        };

        // dropzone config
        $scope.dropzoneConfig = {
            'options': {
                url: '/api/files',
                maxFileSize: 100,
                paramName: 'uploadedFile',
                maxThumbnailFilesize: 5,
                autoProcessQueue: false,
                maxFiles: 5
            },
            'eventHandlers': {
                'sending': function(file, xhr, formData) {},
                'success': function(file, response) {},
                'maxfilesexceeded': function(file) {
                    //alert("No more files please!");
                    this.removeFile(file);
                },
                'addedfile': function(file) {
                    //THIS IS WHERE THE MAGIC HAPPENS! we change the model and
                    // tell angular to re-render the form and stuff. NOICE!
                    $scope.postFormModel.flag = file.name;
                    $scope.$digest();
                }
            }
        };
        // validation
        this.options = {};

        formlyValidationMessages.addTemplateOptionValueMessage('maxlength', 'maxlength', '', 'is the maximum length', 'Too long');
        formlyValidationMessages.addTemplateOptionValueMessage('minlength', 'minlength', '', 'is the minimum length', 'Too short');
        formlyValidationMessages.messages.required = 'to.label + " is required"';
        formlyValidationMessages.messages.email = '$viewValue + " is not a valid email address"';

        // form model
        $scope.postFormFields = [{
            type: 'input',
            key: 'postTitle',
            templateOptions: {
                label: 'Title',
                required: true
            }
        }, {
            type: 'textarea',
            key: 'content',
            templateOptions: {
                label: 'Content',
                required: true
            }
        }, {
            key: 'flag',
            type: 'customInput',
            templateOptions: {
                label: 'Flag',
                type: 'input',
                placeholder: 'Flag image',
                required: true
            },
        }];
    }
}

export
default AdminController;