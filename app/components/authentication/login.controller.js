class loginController {
    constructor($scope, UserService) {
        $scope.loginDetails = {};
        $scope.processLogin = function () {
            UserService.login($scope.loginDetails).then(function (data) {
                console.log("done")
            })
        }
    }
}

export default loginController;