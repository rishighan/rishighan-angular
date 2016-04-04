class UserService {

    constructor($http, $stateParams) {
        this._$http = $http;

    }

    isAuthenticated() {
        this._$http('/login');
    }

    login(loginDetails) {
        return this._$http.post('/login', {
                username: loginDetails.username,
                password: loginDetails.password
            })
            .then(function(data, status) {
                console.log(data);
            })
    }

}

export
default UserService;