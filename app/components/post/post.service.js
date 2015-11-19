class PostService {
    /*@ngInject*/
    constructor($http) {
        this._$http = $http;
    }

    // TODO: make actual calls to API
    read() {
        return this._$http.get('http://localhost:3000/db/getposts').then(function(result) {
            return result.data;
        });
    }

    create() {
        return this._$http.get('http://localhost:3000/db/createtestpost').then(function(result) {
            return result.data;
        });
    }
}

export
default PostService;