import authenticationComponent from './authentication.component';
import loginComponent from './login.component';

let authenticationModule = angular.module('authentication', [
    'ui.router'
])

.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('register', {
            url: '/register',
            template: '<register></register>'
        })
        .state('login', {
            url: '/login',
            template: '<login></login>'
        });
})

// This directive name is the same that you specify in the state definition
.directive('register', authenticationComponent)
.directive('login', loginComponent);

export default authenticationModule;