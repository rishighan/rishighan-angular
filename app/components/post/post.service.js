class PostService {
    /*@ngInject*/
    constructor($http) {
        this._$http = $http;
    }

    read() {
        return this._$http.get('http://localhost:3001/db/jugaad').then(result => result.data);

    }
}

export
default PostService;