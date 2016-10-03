import $q from "Q";

class AuthenticationService {
    constructor($http) {
        this.$http = $http;
        this._appUser = null;
    }


    get user() {
        return this._appUser;
    }

    set user(value) {
        this._appUser = value;
    }

    isLoggedIn() {
        if (this.user) {
            return true;
        } else {
            return false;
        }
    }

    getUserStatus() {
        return this.$http.get('/user/status')
            .then((data) => {
                if (data.status) {
                    this.user = true;
                } else {
                    this.user = false;
                }
            }, function (data) {
                this.user = false;
                return data;
            });
    }

    login(username, password) {
        return this.$http.post('/user/login',
            {
                username: username,
                password: password
            })
            .then(function (data) {
                if (data.status && data.status === 200) {
                    this.user = true;
                } else {
                    this.user = false;
                }
            }, function (data) {
                //todo: winston logging
                this.user = false;
            });
    }

    logout() {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a get request to the server
        this.$http.get('/user/logout')
            .success(function (data) {
                this.user = false;
                deferred.resolve();
            })
            .error(function (data) {
                this.user = false;
                deferred.reject();
            });
        // return promise object
        return deferred.promise;
    }

    register(username, password) {
        // create a new instance of deferred
        return this.$http.post('/user/register',
            {
                username: username,
                password: password
            })
            .then(function (data, status) {
                if (status === 200 && data.status) {
                    //todo: winston log
                    return data;
                }
            }, function (data) {
                //todo: winston log
                return data;
            });
    }
}

export default AuthenticationService;