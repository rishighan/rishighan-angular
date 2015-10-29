import angular from 'angular';
import uiRouter from 'ui-router';
import formly from 'angular-formly';
import apiCheck from 'api-check';
import ngMessages from 'angular-messages';
import adminComponent from './admin.component';
var dropzone = require('dropzone');
console.log(dropzone);

let adminModule = angular.module('admin', [
    uiRouter,
    formly,
    ngMessages
])

.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('admin', {
            url: '/admin',
            template: '<admin></admin>'
        });
})

// formly config
.run(function(formlyConfig) {
    formlyConfig.setType({
        name: 'input',
        template: '<label>{{options.templateOptions.label}}</label><input ng-model="model[options.key]" />'
    });
    formlyConfig.setType({
        name: 'textarea',
        template: '<label>{{options.templateOptions.label}}</label><textarea ng-model="model[options.key]" rows="10" cols="40"/></label>'
    });
    formlyConfig.setType({
        name: 'customInput',
        extends: 'input',
        controller: ['$scope',
            function($scope) {
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
        name: 'maskedInput',
        extends: 'customInput',
        defaultOptions: {
            ngModelAttrs: { // this is part of the magic... It's a little complex, but super powerful
                mask: { // the key "ngMask" must match templateOptions.ngMask
                    attribute: 'mask' // this the name of the attribute to be applied to the ng-model in the template
                },
                // applies the 'clean' attribute with the value of "true"
                'true': {
                    value: 'clean'
                }
            },
            // this is how you hook into formly's messages API
            // however angular-formly doesn't ship with ng-messages.
            // You have to display these messages yourself.
            validation: {
                messages: {
                    mask: '"Invalid input"'
                }
            }
        }
    });
})


.directive('admin', adminComponent);

export
default adminModule;