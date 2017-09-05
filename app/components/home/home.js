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
            templateUrl: './components/home/main.layout.html'
        })
        .state('/', {
            url: '/',
            parent: 'main',
            template: '<home></home>',
            access: {restricted: false}
        })
        .state('main.single',{
            url: '/post/:slug',
            params: {id: undefined},
            template: '<single></single>',
            access: {restricted: false}
        })
        .state('main.work', {
            url: '/work',
            template: '<work></work>',
            access: {restricted: false}
        })
        .state('main.trampoline', {
            url: '/trampoline',
            template: '<trampoline></trampoline>',
            access: {restricted: false}
        })
        .state('main.illustrations', {
            url: '/illustrations',
            template: '<illustrations></illustrations>',
            access: {restricted: false}
        })
        .state('main.illustration', {
            url: '/illustration/:slug',
            template: '<single></single>',
            access: {restricted: false}
        })
        .state('main.colophon', {
            url: '/colophon',
            template: '<div></div>',
            access: {restricted: false}
        });
})

.directive('home', homeComponent)
.directive('single', singleComponent)
.directive('trampoline', trampolineComponent)
.directive('illustrations', illustrationsComponent);

export default homeModule;