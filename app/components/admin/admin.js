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

.directive('admin', adminComponent);

export
default adminModule;