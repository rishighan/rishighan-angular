import angular from 'angular';
import uiRouter from 'ui-router';
import postComponent from './post.component';


let postModule = angular.module('post', [
    uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('post', {
            url: '/post',
            template: '<post></post>'
        });
})

.directive('post', postComponent);

export default postModule;