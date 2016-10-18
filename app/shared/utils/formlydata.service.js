class FormlyDataService {
    /*@ngInject*/
    constructor($http, $location) {
        this._$http = $http;
        this._$location = $location;
    }

    tagTransform(newTag) {
        var item = {
            id: newTag,
            label: newTag
        };
        return item;
    }

    getFormlyDataModel(tagsModel) {
        return [{
            key: 'title',
            type: 'input',
            className: 'clearfix',
            templateOptions: {
                label: 'Title',
                required: true,
                className: 'col-md-6 col-xs-6'
            }
        }, {
            key: 'slug',
            type: 'readonly',
            className: 'clearfix margin20',
            templateOptions:{
                label: 'Slug',
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
                labelProp: 'id',
                placeholder: 'Select tags for your content',
                options: tagsModel, // Model containing tags
                tagTransform: this.tagTransform // the tag transform function needs to be a part of templateOptions
            }
        }, {
            key: 'content',
            type: 'textareaTabs',
            className: 'clearfix',
            templateOptions: {
                rows: "12",
                label: 'Content',
                required: true,
                className: 'col-md-10 col-xs-12'
            }
        }, {
            key: 'excerpt',
            type: 'textarea',
            className: 'clearfix margin20',
            templateOptions: {
                rows: "3",
                label: 'Excerpt',
                required: true,
                className: 'col-md-10 col-xs-12'
            }
        }, {
            key: 'citation',
            type: 'repeatSection',
            className: 'margin20',
            templateOptions: {
                btnText: 'Add another citation',
                fields: [{
                    fieldGroup: [{
                        key: 'name',
                        type: 'input',
                        className: 'formly-repeatSection',
                        templateOptions: {
                            className: 'col-md-10 col-xs-6',
                            label: 'Citation:',
                            required: false
                        }
                    }, {
                        key: 'source',
                        type: 'input',
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

    static formlyDataFactory() {
        return new FormlyDataService();
    }

}

export
default FormlyDataService;