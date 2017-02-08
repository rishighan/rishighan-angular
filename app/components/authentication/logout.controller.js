class LogoutController {
    constructor($scope, $state, $stateParams, AuthenticationService) {
        const redirectTo = $stateParams.redirectTo;
        $scope._disabled = false;
        $scope.error = false;

        $scope.logout = function () {
            AuthenticationService.logout()
                .then(function () {
                    $state.go(redirectTo);
                });
        };
    }
}
export default LogoutController;