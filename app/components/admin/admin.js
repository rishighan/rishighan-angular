import angular from 'angular';
import uiRouter from 'ui-router';
import formly from 'angular-formly';
import apiCheck from 'api-check';
import ngMessages from 'angular-messages';
import adminComponent from './admin.component';
import ngSanitize from 'angular-sanitize';
import formlyBootstrap from 'angular-formly-templates-bootstrap';

var Dropzone = require('dropzone');
var uiselect = require('ui-select');

let adminModule = angular.module('admin', [
    uiRouter,
    formly,
    formlyBootstrap,
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
// NOTE: This next line is highly recommended. Otherwise Chrome's autocomplete will appear over your options!
formlyConfig.extras.removeChromeAutoComplete = true;

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
    controller: function($scope) {
        $scope.formOptions = {
            formState: $scope.formState
        };
        $scope.addNew = addNew;

        $scope.copyFields = copyFields;


        function copyFields(fields) {
            fields = angular.copy(fields);
            addRandomIds(fields);
            return fields;
        }

        function addNew() {
            $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
            var repeatsection = $scope.model[$scope.options.key];
            var lastSection = repeatsection[repeatsection.length - 1];
            var newsection = {};
            if (lastSection) {
                newsection = angular.copy(lastSection);
            }
            repeatsection.push(newsection);
        }

        function addRandomIds(fields) {
            unique++;
            angular.forEach(fields, function(field, index) {
                if (field.fieldGroup) {
                    addRandomIds(field.fieldGroup);
                    return; // fieldGroups don't need an ID
                }

                if (field.templateOptions && field.templateOptions.fields) {
                    addRandomIds(field.templateOptions.fields);
                }

                field.id = field.id || (field.key + '_' + index + '_' + unique + getRandomInt(0, 9999));
            });
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
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