class LoginController {
    constructor($scope,
                $state,
                $translate,
                AuthenticationService,
                ngNotify) {
        const ADMIN_PAGE = 'posts';
        $scope._disabled = false;
        $scope.error = false;

        $scope.login = function () {
            AuthenticationService.login($scope.loginForm.username, $scope.loginForm.password)
                .then(function () {
                    $state.go(ADMIN_PAGE).then(function () {
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