class PostService {
    /*@ngInject*/
    constructor($http) {
        this._$http = $http;
    }

    read() {
        return this._$http.get('http://localhost:3000/db/getposts')
            .then(function(result) {
                return result.data;
            });
    }

    createPost(data) {
        return this._$http.post('/db/createpost', data)
            .then(function(result) {
                return result;
            });
    }

    getPosts() {
        return this._$http.get('/db/getallposts')
            .then(function(result) {
                return result;
            });
    }

    deleteFile(file) {
        return this._$http.post('/api/files/delete', file)
            .then(function(result) {
                return result;
            });
    }


}

export
default PostService;