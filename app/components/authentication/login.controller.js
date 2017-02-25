class LoginController {
    constructor($scope,
                $stateParams,
                $state,
                $translate,
                AuthenticationService,
                ngNotify) {
        let redirectTo = $stateParams.redirectTo;
        $scope._disabled = false;
        $scope.error = false;

        $scope.login = function () {
            AuthenticationService.login($scope.loginForm.username, $scope.loginForm.password)
                .then(function () {
                    $state.go(redirectTo).then(function () {
                        ngNotify.set($translate.instant('admin.login_success.message'), {
                            type: "success",
                        });
                    });
                    $scope._disabled = false;
                    $scope.loginForm = {};
                }, function () {
                    //todo: flash message
                    $scope.error = true;
                    $scope._disabled = true;
                });
        };
    }
}
export default LoginController;