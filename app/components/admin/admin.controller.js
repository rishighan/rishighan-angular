import analyticsService from '../analytics/analytics.service';

class AdminController {
    constructor($scope,
        formlyValidationMessages,
        analyticsService,
        $location,
        $http) {


        analyticsService.spawnAnalytics();
        $scope.postFormModel = {
            attachedFile: []
        };

        // should come from a service
        var testData = [{
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
            "id": "Archive",
            "label": "Archive"
        }];


        $scope.createPost = function() {
            $http({
                method: 'POST',
                url: '/db/createpost',
                data: $scope.postFormModel,
            }).then(function successCallback(data) {
                console.log(data);
            }, function errorCallback(data) {
                console.log(data);
            });
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
                    $scope.postFormModel.attachedFile.push({"filename":file.name, "filesize": file.size});
                    $scope.$digest();
                }
            }
        };
        // validation
        this.options = {};
        $scope.tagTransform = function(tag){
            var item = {
                id: tag,
                label: tag
            };
            return item;
        }

        formlyValidationMessages.addTemplateOptionValueMessage('maxlength', 'maxlength', '', 'is the maximum length', 'Too long');
        formlyValidationMessages.addTemplateOptionValueMessage('minlength', 'minlength', '', 'is the minimum length', 'Too short');
        formlyValidationMessages.messages.required = 'to.label + " is required"';
        formlyValidationMessages.messages.email = '$viewValue + " is not a valid email address"';

        // Form Fields
        $scope.postFormFields = [{
            type: 'input',
            key: 'postTitle',
            className: 'clearfix',
            templateOptions: {
                label: 'Title',
                required: true,
                className: 'col-md-6 col-xs-6'
            }
        }, {
            key: 'tags',
            type: 'ui-select-multiple',
            className: 'row margin20',
            templateOptions: {
                className: 'col-md-8 col-xs-6',
                optionsAttr: 'bs-options',
                ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                label: 'Select tags',
                valueProp: 'id',
                labelProp: 'label',
                placeholder: 'Select tags for your content',
                overwriteOk: true,
                options: testData,
                required: true
            }
        }, {
            type: 'textarea',
            key: 'content',
            className: 'clearfix',
            templateOptions: {
                rows: "12",
                label: 'Content',
                required: true,
                className: 'col-md-10 col-xs-12'
            }
        }, {
            type: 'textarea',
            key: 'excerpt',
            className: 'clearfix margin20',
            templateOptions: {
                rows: "3",
                label: 'Excerpt',
                required: true,
                className: 'col-md-10 col-xs-12'
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
                        className: 'formly-repeatSection',
                        templateOptions: {
                            className: 'col-md-10 col-xs-6',
                            label: 'Citation:',
                            required: true
                        }
                    }, {
                        type: 'input',
                        key: 'citationSource',
                        className: 'formly-repeatSection',
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