class PostService {
    /*@ngInject*/
    constructor($http) {
        this._$http = $http;
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

    getPost(id) {
        return this._$http.get('/db/getpost/' + id, {
                params: {
                    id: id
                }
            })
            .then(function(post) {
                return post;
            });
    }

    updatePost(id) {
        return this._$http.post('/db/updatepost/' + id, data, {
            params: {
                id: id
            }
        })
        .then(function(result){
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