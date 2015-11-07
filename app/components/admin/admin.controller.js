import analyticsService from '../analytics/analytics.service';

class AdminController {
    constructor($scope, formlyValidationMessages, analyticsService) {

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
        investments: [
          {
            investmentName:'abc',
            investmentDate:(new Date()).toDateString(),
            stockIdentifier:'',
            investmentValue:'',
            relationshipName:'',
            complianceApprover:'',
            requestorComment:''
          },
          {
            investmentName:'haf',
            investmentDate:(new Date()).toDateString(),
            stockIdentifier:'',
            investmentValue:'',
            relationshipName:'',
            complianceApprover:'',
            requestorComment:''
          }
        ]
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
            }
        }, {
            key: 'multipleOption',
            type: 'ui-select-multiple',
            templateOptions: {
                optionsAttr: 'bs-options',
                ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                label: 'Multiple Select',
                valueProp: 'id',
                labelProp: 'label',
                placeholder: 'Select options',
                overwriteOk: true,
                options: testData
            }
        }, {
            type: 'repeatSection',
            key: 'investments',
            templateOptions: {
                btnText: 'Add another investment',
                fields: [{
                    className: 'row',
                    fieldGroup: [{
                        className: 'col-xs-4',
                        type: 'input',
                        key: 'investmentName',
                        templateOptions: {
                            label: 'Name of Investment:',
                            required: true
                        }
                    }, {
                        type: 'input',
                        key: 'investmentDate',
                        className: 'col-xs-4',
                        templateOptions: {
                            label: 'Date of Investment:',
                            placeholder: 'dd/mm/yyyy such as 20/05/2015',
                            dateFormat: 'DD, d  MM, yy'
                        }
                    }, {
                        type: 'input',
                        key: 'stockIdentifier',
                        className: 'col-xs-4',
                        templateOptions: {
                            label: 'Stock Identifier:'
                        }
                    }]
                }]
            }
        }];
    }
}

export
default AdminController;