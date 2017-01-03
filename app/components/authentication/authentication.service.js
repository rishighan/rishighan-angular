class AuthenticationService {
    constructor($http) {
        this.$http = $http;
        this._isAuthenticated = null;
    }

    get loggedIn() {
        return this._isAuthenticated;
    }

    set loggedIn(value) {
        this._isAuthenticated = value;
    }

    isLoggedIn() {
        if (this.loggedIn) {
            return true;
        } else {
            return false;
        }
    }

    getUserStatus() {
        return this.$http.get('/user/status')
            .success((data) => {
                if (data.status) {
                    this.loggedIn = true;
                } else {
                    this.loggedIn = false;
                }
            })
            .error((data) => {
                this.loggedIn = false;
            });
    }

    login(username, password) {
        return this.$http.post('/user/login',
            {
                username: username,
                password: password
            })
            .then((data) => {
                if (data.status && data.status === 200) {
                    this.loggedIn = true;
                } else {
                    this.loggedIn = false;
                }
            }, (data) => {
                //todo: winston logging
                this.loggedIn = false;
            });
    }

    logout() {
        return this.$http.get('/user/logout')
            .then(() => {
                this.loggedIn = false;
            });
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