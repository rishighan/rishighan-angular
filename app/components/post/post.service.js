class PostService {
    /*@ngInject*/
    constructor($http) {
        this._$http = $http;
    }

    read() {
        return this._$http.get('http://localhost:3001/db/getposts').then(function(result) {
            return result.data;
        });
    }

    create() {
        return this._$http.get('http://localhost:3001/db/createtestpost').then(function(result) {
            console.log(result);
            return result.data;
        });
    }
}

export
default PostService;