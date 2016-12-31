class PostService {
    /*@ngInject*/
    constructor($http) {
        this._$http = $http;
    }

    createPost(data) {
        return this._$http.post('/db/createpost', data)
            .then(function (result) {
                return result;
            }, function (error) {
                //todo: chill, winston
            });
    }

    getPosts(pageOffset, pageLimit) {
        return this._$http.get('/db/getallposts', {
            params: {
                pageOffset: pageOffset,
                pageSize: pageLimit
            }
        }).then(function (result) {
            return result;
        });
    }

    getPost(id) {
        return this._$http.get('/db/getpost/' + id, {
            params: {
                id: id
            }
        }).then(function (post) {
            return post;
        });
    }

    updatePost(id, data, upsertToggle) {
        return this._$http.post('/db/updatepost/' + id, data, {
            params: {
                id: id,
                upsertToggle: upsertToggle
            }
        }).then(function (result) {
            return result;
        });
    }

    deletePost(id) {
        return this._$http.post('/db/deletepost', {
            params: {
                post_id: id
            }
        }).then(function (result) {
            return result;
        });
    }

    deleteFile(file) {
        return this._$http.post('/api/files/delete', file)
            .then(function (result) {
                return result;
            });
    }
}

export
default PostService;