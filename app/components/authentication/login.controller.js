import UserService from '../../shared/utils/user.service';
class loginController {
    constructor($scope, UserService){
        $scope.loginDetails = {};
        console.log(UserService);
        $scope.processLogin = function(){
            UserService.login($scope.loginDetails).then(function(data){
                console.log("done")
            })
        }
    }
}

export default loginController;