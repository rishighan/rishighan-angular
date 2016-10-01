import AuthenticationService from './authentication.service';
import LoginController from './login.controller';

let authenticationModule = angular.module('authentication', [])
    .config(($stateProvider) => {
        $stateProvider
            .state('login',{
                url: '/login',
                templateUrl: 'components/authentication/partials/login.html',
                controller: LoginController,
                access: {restricted: false}
            });
    })
.service('AuthenticationService', AuthenticationService);

export default authenticationModule;