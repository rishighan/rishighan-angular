// import angular from 'angular';
// import uiRouter from 'ui-router';
import postComponent from './post.component';
import postService from './post.service';

let postModule = angular.module('post', [
    'ui.router'
])

.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('post', {
            url: '/post',
            template: '<post></post>'
        });
})

.directive('post', postComponent)
.service('PostService', postService);

export default postModule;