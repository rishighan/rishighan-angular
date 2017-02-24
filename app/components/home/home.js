require('angular-busy');
import homeComponent from './home.component';
import singleComponent from '../single/single.component';
import trampolineComponent from '../trampoline/trampoline.component';
import illustrationsComponent from '../illustrations/illustrations.component';

let homeModule = angular.module('home', [
    'cgBusy',
    'ui.router'
])

.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            abstract: true,
            templateUrl: './components/home/main.html'
            // template: '<ui-view/>'
        })
        .state('main.home', {
            url: '/home',
            // templateUrl: './components/home/main.home.html',
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
        })
        .state('illustrations', {
            url: '/illustrations',
            template: '<illustrations></illustrations>',
            access: {restricted: false}
        });
})

.directive('home', homeComponent)
.directive('single', singleComponent)
.directive('trampoline', trampolineComponent)
.directive('illustrations', illustrationsComponent);

export default homeModule;