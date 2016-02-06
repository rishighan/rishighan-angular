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

    createPost(data) {
        return this._$http.post('/db/createpost', data).then(function(result) {
            return result;
        });
    }

    deleteFile(file){
        return this._$http.post('/api/files/delete', file).then(function(result){
            return result;
        });
    }
}

export
default PostService;