import angular from 'angular';
import uiRouter from 'ui-router';
import adminComponent from './admin.component';

let adminModule = angular.module('admin', [uiRouter])

.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('/admin', {
        url: '/admin',
        template: '<admin></admin>'
    });
})

.directive('admin', adminComponent);

export default adminModule;