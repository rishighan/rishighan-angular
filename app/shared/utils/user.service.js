class UserService {

    constructor($http, $stateParams){
        this._$http = $http;

    }

    isAuthenticated(){
        this._$http('/login');
    }

}

export default UserService;