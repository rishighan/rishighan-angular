import angular from 'angular';
import uiRouter from 'ui-router';
import formly from 'angular-formly';
import apiCheck from 'api-check';
import ngMessages from 'angular-messages';
import adminComponent from './admin.component';
import ngSanitize from 'angular-sanitize';

var Dropzone = require('dropzone');
var uiselect = require('ui-select');


console.log(uiselect);
let adminModule = angular.module('admin', [
    uiRouter,
    formly,
    ngMessages,
    ngSanitize,
    uiselect
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


    formlyConfig.setWrapper({
        name: 'validation',
        types: ['input', 'textarea', 'customInput'],
        templateUrl: 'error-messages.html'
    });

})


.directive('admin', adminComponent)
    .directive('dropzone', function() {
        return function(scope, element, attrs) {
            var config, dropzone;
            //console.log(scope);
            config = scope[attrs.dropzone];

            // create a Dropzone for the element with the given options
            dropzone = new Dropzone(element[0], config.options);

            // bind the given event handlers
            angular.forEach(config.eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });
        };
    });

export
default adminModule;