class AdminController {
    constructor($scope, formlyValidationMessages) {
        this.gatirodhak = 'Jagannath, Bakwaas kam kar.';

        $scope.postFormModel = {
            flag: "Update Yoself.",
            singleOption: null
        };
        var testData = [{
            "id": 1,
            "label": "Option 1"
        }, {
            "id": 2,
            "label": "Option 2"
        }, {
            "id": 3,
            "label": "Option 3"
        }];

        $scope.itemArray = [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
        {id: 4, name: 'fourth'},
        {id: 5, name: 'fifth'},
    ];

    $scope.selectedItem= $scope.itemArray[0];

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
                    this.removeFile(file);
                },
                'addedfile': function(file) {
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

        // Form Fields
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
        // }, {
        //     key: 'singleOption',
        //     type: 'ui-select-single',
        //     templateOptions: {
        //         optionsAttr: 'bs-options',
        //         ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
        //         label: 'Single Select',
        //         valueProp: 'id',
        //         labelProp: 'label',
        //         placeholder: 'Select option',
        //         description: 'Template includes the allow-clear option on the ui-select-match element',
        //         options: testData
        //     }
        }];
    }
}

export
default AdminController;