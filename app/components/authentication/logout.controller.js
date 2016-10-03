class LogoutController {
    constructor($scope, $state, AuthenticationService) {
        const LOGIN_PAGE = 'login';
        $scope._disabled = false;
        $scope.error = false;

        $scope.logout = function () {
            AuthenticationService.logout()
                .then(function () {
                    $state.go(LOGIN_PAGE);
                });
        };
    }
}
export default LogoutController;