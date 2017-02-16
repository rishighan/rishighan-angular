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

    getPost(id, slug) {
        return this._$http.get('/db/getpost' , {
            params: {
                id: id,
                slug: slug
            }
        }).then(function (post) {
            return post;
        });
    }

    getPostsByTagName(tag, pageOffset, pageLimit) {
        return this._$http.get('/db/getpostsbytagname', {
            params: {
                tag: tag,
                pageOffset: pageOffset,
                pageLimit: pageLimit
            }
        }).then(function (posts) {
            return posts;
        });
    }

    searchPost(searchText, pageOffset, pageLimit) {
        return this._$http.post('/db/searchpost', {
            params: {
                searchText: searchText,
                pageOffset: pageOffset,
                pageLimit: pageLimit
            }
        }).then(function (data) {
            return data;
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