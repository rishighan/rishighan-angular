import angular from 'angular';
import uiRouter from 'ui-router';
import formly from 'angular-formly';
import apiCheck from 'api-check';
import adminComponent from './admin.component';

let adminModule = angular.module('admin', [
    uiRouter,
    formly
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
})

.directive('admin', adminComponent);

export
default adminModule;