class LoginController {
    constructor($scope, $state, AuthenticationService) {
        const ADMIN_PAGE = 'admin';
        $scope._disabled = false;
        $scope.error = false;

        $scope.login = function () {
            AuthenticationService.login($scope.loginForm.username, $scope.loginForm.password)
                .then(function () {
                    $state.go(ADMIN_PAGE);
                    $scope._disabled = false;
                    $scope.loginForm = {};

                },function () {
                    //todo: flash message
                    $scope.error = true;
                    $scope._disabled = true;
                });
        };
    }
}
export default LoginController;