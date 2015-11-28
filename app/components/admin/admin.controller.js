import analyticsService from '../analytics/analytics.service';

class AdminController {
    constructor($scope, formlyValidationMessages, analyticsService) {
        analyticsService.spawnAnalytics();
        $scope.postFormModel = {
            flag: [],
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

        this.model = {
            citations: [{
                citationName: 'abc',
                citationSource: '',
            }, {
                citationName: 'cdfred',
                citationSource: '',
            }]
        };

        // dropzone config
        $scope.dropzoneConfig = {
            'options': {
                url: '/api/files',
                maxFileSize: 100,
                paramName: 'uploadedFile',
                maxThumbnailFilesize: 5,
                autoProcessQueue: false,
                maxFiles: 5,
                uploadMultiple: true,
                parallelUploads: 5
            },
            'eventHandlers': {
                'sending': function(file, xhr, formData) {
                    console.log("Sending" + file);
                },
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
        },  {
            key: 'multipleOption',
            type: 'ui-select-multiple',
            templateOptions: {
                className: 'col-md-6',
                optionsAttr: 'bs-options',
                ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                label: 'Multiple Select',
                valueProp: 'id',
                labelProp: 'label',
                placeholder: 'Select options',
                overwriteOk: true,
                options: testData,
                required: true
            }
        }, {
            type: 'repeatSection',
            key: 'citations',
            templateOptions: {
                btnText: 'Add another citation',
                fields: [{
                    className: 'row',
                    fieldGroup: [{
                        className: 'col c4',
                        type: 'input',
                        key: 'citationName',
                        templateOptions: {
                            label: 'Citation:',
                            required: true
                        }
                    }, {
                        className: 'col c8',
                        type: 'input',
                        key: 'citationSource',
                        templateOptions: {
                            label: 'Source or hyperlink:',
                            placeholder: 'http://thisthatortheother.com/docs/papersonhysteria',
                            required: true
                        }
                    }]
                }]
            }
        }];
    }
}

export
default AdminController;