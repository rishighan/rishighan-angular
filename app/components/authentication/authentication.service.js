class AuthenticationService {

    constructor($http, $q) {
        this.$http = $http;
        this.user = null;
    }

    isLoggedIn() {
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    getUserStatus() {
        return this.$http.get('/user/status')
            // handle success
            .success(function (data) {
                if (data.status) {
                    user = true;
                } else {
                    user = false;
                }
            })
            // handle error
            .error(function (data) {
                user = false;
            });
    }

    login(username, password) {
        var deferred = $q.defer();
        // send a post request to the server
        this.$http.post('/user/login',
            {
                username: username,
                password: password
            })
            .success(function (data, status) {
                if (status === 200 && data.status) {
                    user = true;
                    deferred.resolve();
                } else {
                    user = false;
                    deferred.reject();
                }
            })
            .error(function (data) {
                user = false;
                deferred.reject();
            });

        return deferred.promise;

    }

    logout() {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a get request to the server
        this.$http.get('/user/logout')
            .success(function (data) {
                user = false;
                deferred.resolve();
            })
            .error(function (data) {
                user = false;
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    }

    register(username, password) {
        // create a new instance of deferred
        var deferred = $q.defer();
        this.$http.post('/user/register',
            {
                username: username,
                password: password
            })
            .success(function (data, status) {
                if (status === 200 && data.status) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            // handle error
            .error(function (data) {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    }
}

export default AuthenticationService;