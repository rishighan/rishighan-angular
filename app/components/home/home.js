import homeComponent from './home.component';
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
        });
})

.directive('home', homeComponent);

export default homeModule;