import ngMessages from 'angular-messages';
import authenticationComponent from './authentication.component';

let authenticationModule = angular.module('authentication', [
    'ui.router'
])

.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('fooya', {
            url: '/register',
            template: '<register></register>'
        })
        .state('login', {
            url: '/login',
            template: '<login></login>'
        });
})

.directive('authentication', authenticationComponent);

export default authenticationModule;