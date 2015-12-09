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
            "label": "Technical"
        }, {
            "id": 2,
            "label": "Hero"
        }, {
            "id": 3,
            "label": "Hackintosh"
        }, {
            "id": 4,
            "label": "Highlight"
        }, {
            "id": 5,
            "label": "Archive"
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
            className:'clearfix',
            templateOptions: {
                label: 'Title',
                required: true,
                className: 'col-md-6 col-xs-6'
            }
        }, {
            key: 'multipleOption',
            type: 'ui-select-multiple',
            className: 'row margin20',
            templateOptions: {
                className: 'col-md-8 col-xs-6',
                optionsAttr: 'bs-options',
                ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                label: 'Select tags',
                valueProp: 'id',
                labelProp: 'label',
                placeholder: 'Select options',
                overwriteOk: true,
                options: testData,
                required: true
            }
        }, {
            type: 'textarea',
            key: 'content',
            className: 'clearfix',
            templateOptions: {
                label: 'Content',
                required: true,
                className: 'col-md-10 col-xs-8'
            }
        }, {
            type: 'repeatSection',
            key: 'citations',
            className: 'margin20',
            templateOptions: {
                btnText: 'Add another citation',
                fields: [{
                    fieldGroup: [{
                        type: 'input',
                        key: 'citationName',

                        templateOptions: {
                            className: 'col-md-10 col-xs-6',
                            label: 'Citation:',
                            required: true
                        }
                    }, {
                        type: 'input',
                        key: 'citationSource',
                        className: 'margin20',
                        templateOptions: {
                            className: 'col-md-12 col-xs-6',
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