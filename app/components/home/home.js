require('angular-busy');
require('angular-filter');
import homeComponent from './home.component';
import singleComponent from '../single/single.component';
import trampolineComponent from '../trampoline/trampoline.component';
import illustrationsComponent from '../illustrations/illustrations.component';
import colophonComponent from '../colophon/colophon.component';
import archiveComponent from '../archive/archive.component';
let homeModule = angular.module('home', [
    'cgBusy',
    'ui.router',
    'angular.filter'
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
            .state('main.single', {
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
                template: '<colophon></colophon>',
                access: {restricted: false}
            })
            .state('main.archive', {
                url: '/archive',
                template: '<archive></archive>',
                access: {restricted: false}
            });
    })

    .directive('home', homeComponent)
    .directive('single', singleComponent)
    .directive('trampoline', trampolineComponent)
    .directive('illustrations', illustrationsComponent)
    .directive('colophon', colophonComponent)
    .directive('archive', archiveComponent);

export default homeModule;