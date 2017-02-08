import homeComponent from './home.component';
import singleComponent from '../single/single.component';

require('angular-busy');

let homeModule = angular.module('home', [
    'cgBusy',
    'ui.router'
])

.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            template: '<home></home>',
            access: {restricted: false}
        })
        .state('single',{
            url: '/post/:slug',
            params: {id: undefined},
            template: '<single></single>',
            access: {restricted: false}
        })
        .state('work', {
            url: '/work',
            template: '<work></work>',
            access: {restricted: false}
        });
})

.directive('home', homeComponent)
.directive('single', singleComponent);

export default homeModule;