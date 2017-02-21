import AuthenticationService from './authentication.service';
import LoginController from './login.controller';
import RegistrationController from './registration.controller';
import LogoutController from './logout.controller';

let authenticationModule = angular.module('authentication', [])
    .config(($stateProvider) => {
        $stateProvider
            .state('login',{
                url: '/login',
                templateUrl: 'components/authentication/partials/login.html',
                controller: LoginController,
                access: {restricted: false}
            })
            .state('register', {
                url: '/register',
                templateUrl: 'components/authentication/partials/register.html',
                controller: RegistrationController,
                controllerAs: 'regCtrl',
                params: {redirectTo: 'login'},
                access: {restricted: true}
            })
            .state('logout', {
                url: '/logout',
                controller: LogoutController,
                params: {redirectTo: 'home'},
                access: {restricted: true}
            });
    })
.service('AuthenticationService', AuthenticationService);

export default authenticationModule;