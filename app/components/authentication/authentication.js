import AuthenticationService from './authentication.service';
import LoginController from './login.controller';
import RegistrationController from './registration.controller';

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
                access: {restricted: true}
            });
    })
.service('AuthenticationService', AuthenticationService);

export default authenticationModule;