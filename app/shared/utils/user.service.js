class UserService {

    constructor($http, $stateParams){
        this._$http = $http;

    }

    isAuthenticated(){
        this._$http('/login');
    }

    login(){
        this._$http.post('/login', {username: username, password: password})
        .then(function(data, status){
            console.log(data)
        })
    }

}

export default UserService;