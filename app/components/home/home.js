require('angular-busy');
import homeComponent from './home.component';
import singleComponent from '../single/single.component';
import trampolineComponent from '../trampoline/trampoline.component';

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
        })
        .state('trampoline', {
            url: '/trampoline',
            template: '<trampoline></trampoline>',
            access: {restricted: false}
        });
})

.directive('home', homeComponent)
.directive('single', singleComponent)
.directive('trampoline', trampolineComponent);

export default homeModule;