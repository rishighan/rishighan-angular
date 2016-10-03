import homeComponent from './home.component';

let homeModule = angular.module('home', [
    'ui.router'
])

.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: '<home></home>',
            access: {restricted: false}
        });
})

.directive('home', homeComponent);

export
default homeModule;