import AuthenticationService from './authentication.service';

class LoginController{
    constructor($http, $location, $scope){
        const ADMIN_PAGE = '/admin';
        this._$http = $http;
        this._$location = $location;
        $scope._disabled = true;
        $scope.error = false;

        $scope.login = function(){
            AuthenticationService.login($scope.loginForm.username, $scope.loginForm.password)
                .then(function(){
                    this._$location.path(ADMIN_PAGE);
                    $scope._disabled = false;
                    $scope.loginForm = {};
                })
                .catch(function(){
                    //flash message
                    $scope.error = true;
                    $scope.disabled = true;
                })
        }
    }

}

export default LoginController;