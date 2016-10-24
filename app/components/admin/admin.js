import adminComponent from "./admin.component";
import allPostsComponent from "./posts/allposts.component";
import editPostComponent from "./edit/edit.post.component";
import repeatSectionController from "./repeat.section.controller";
import ngSanitize from "angular-sanitize";
import formlyBootstrap from "angular-formly-templates-bootstrap";
import ngMessages from "angular-messages";
import formly from "angular-formly";
const uiselect = require('ui-select');
const Dropzone = require('dropzone');
const ngNotify = require("ng-notify");

require('bootstrap.css');
require('bootstrap');
require('select.css');
require('ngNotify.css');

let adminModule = angular.module('admin', [
    'ui.router',
    formly,
    formlyBootstrap,
    ngMessages,
    ngSanitize,
    uiselect,
    ngNotify,
])

    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('admin', {
                url: '/admin',
                template: '<admin></admin>',
                access: {restricted: true}
            })
            .state('posts', {
                url: '/admin/posts',
                template: '<allposts></allposts>',
                access: {restricted: true}
            })
            .state('edit', {
                url: '/admin/post/edit/:id',
                template: '<editpost></editpost>',
                access: {restricted: true}
            });
    })

    .directive('admin', adminComponent)
    .directive('allposts', allPostsComponent)
    .directive('editpost', editPostComponent)

    .directive('dropzone', function () {
        return function (scope, element, attrs) {
            var config, dropzone;
            config = scope[attrs.dropzone];
            // create a Dropzone for the element with the given options
            dropzone = new Dropzone(element[0], config.options);

            // bind the given event handlers
            angular.forEach(config.eventHandlers, function (handler, event) {
                dropzone.on(event, handler);
            });
        };
    })
    // formly config
    .run(function (formlyConfig, ngNotify) {
        ngNotify.config({
            theme: 'pastel',
            position: 'top',
            target: "#notification",
            duration: 1500,
            sticky: false,
            html: false
        });
        // NOTE: This next line is highly recommended. Otherwise Chrome's autocomplete will appear over your options!
        formlyConfig.extras.removeChromeAutoComplete = true;
        formlyConfig.setType({
            name: 'input',
            template: '<label>{{options.templateOptions.label}}</label><input class="{{options.templateOptions.className}}" ng-model="model[options.key]" />',
            overwriteOk: true
        });

        formlyConfig.setType({
            name: 'readonly',
            template: '<label>{{options.templateOptions.label}}</label><input class="{{options.templateOptions.className}}" ng-model="model[options.key]" disabled />',
            overwriteOk: true
        });

        formlyConfig.setType({
            name: 'textareaTabs',
            templateUrl: 'textarea.tpl.html',
            overwriteOk: true
        });

        formlyConfig.setType({
            name: 'textarea',
            template: '<label>{{options.templateOptions.label}}</label>' +
            '<textarea class="{{options.templateOptions.className}}" rows="{{options.templateOptions.rows}}" ng-model="model[options.key]"> </textarea>',
            overwriteOk: true
        });

        formlyConfig.setType({
            name: 'customInput',
            extends: 'input',
            controller: ['$scope',
                function ($scope) {
                    $scope.options.data.getValidationMessage = getValidationMessage;

                    function getValidationMessage(key) {
                        var message = $scope.options.validation.messages[key];
                        if (message) {
                            return message($scope.fc.$viewValue, $scope.fc.$modelValue, $scope);
                        }
                    }
                }
            ]
        });

        formlyConfig.setType({
            name: 'ui-select-multiple',
            extends: 'select',
            templateUrl: 'ui-select-multiple.html'
        });


        formlyConfig.setWrapper({
            name: 'validation',
            types: ['input', 'textarea', 'customInput', 'ui-select-multiple'],
            templateUrl: 'error-messages.html'
        });


        formlyConfig.setType({
            name: 'repeatSection',
            templateUrl: 'repeatSection.html',
            controller: repeatSectionController
        });

    });

export
default adminModule;