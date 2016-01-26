import analyticsService from '../analytics/analytics.service';

class AdminController {
    constructor($scope,
        formlyValidationMessages,
        analyticsService,
        $location,
        $http) {


        analyticsService.spawnAnalytics();
        $scope.postFormModel = {
            flag: []
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
            "id": "General",
            "label": "General"
        }];

        // dropzone config
        $scope.dropzoneConfig = {
            'options': {
                url: "/db/createpost",
                maxFilesize: 6000,
                paramName: "uploadfile",
                maxThumbnailFilesize: 5,
                autoProcessQueue: false,
                maxFiles: 5

            },
            'eventHandlers': {
                'sending': function (file, xhr, formData) {
                    $scope.postFormModel.file = file;
                },
                'success': function (file, response) {

                },
                'maxfilesexceeded': function(file){
                    this.removeFile(file);
                },
                'addedfile' : function(file){
                    $scope.postFormModel.flag = file.name;
                    $scope.$digest();
                }
            }
        };
        $scope.createPost = function() {
            $http({
                method: 'POST',
                url: '/db/createpost',
                data: $scope.postFormModel,
                headers: {'Content-Type': undefined},
            }).then(function successCallback(data) {
                console.log(data);
            }, function errorCallback(data) {
                console.log(data);
            });
        };

        $scope.tagTransform = function(newTag){
          var item = {
             id: newTag,
             label: newTag
            };
          return item;
        };

        $scope.handleUpload = function(){
            console.log("asdasd");
        }


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
                ngOptions: 'option in to.options | filter: $select.search',
                label: 'Select tags',
                valueProp: 'id',
                labelProp: 'label',
                placeholder: 'Select tags for your content',
                options: testData, // Model containing tags
                tagTransform: $scope.tagTransform // the tag transform function needs to be a part of templateOptions
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
        },
        {
            type: 'file',
            key: 'flag',
            templateOptions: {
                label: 'File',
                required: true,
                className: 'col-md-10 col-xs-12',
                changeHandler: $scope.handleUpload
            }
        },
        // {
        //     key: 'flag',
        //     type: 'customInput',
        //     templateOptions: {
        //         label: 'flag',
        //         type: 'input',
        //         placeholder: 'Upload that image',
        //         required: true
        //     },
        // },
        {
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
                            required: false
                        }
                    }, {
                        type: 'input',
                        key: 'citationSource',
                        className: 'formly-repeatSection',
                        templateOptions: {
                            className: 'col-md-12 col-xs-6',
                            label: 'Source or hyperlink:',
                            placeholder: 'http://thisthatortheother.com/docs/papersonhysteria',
                            required: false
                        }
                    }]
                }]
            }
        }];
    }
}

export
default AdminController;