//todo: create a node microservice
let mongoose = require('mongoose');
let Q = require('q');
let PostSchema = require('./post.schema');
let mongoosePaginate = require('mongoose-paginate');

PostSchema.plugin(mongoosePaginate);

// create
PostSchema.statics.createPost = function (data) {
    var deferred = Q.defer();
    this.create({
        title: data.title,
        slug: data.slug,
        tags: data.tags,
        date_created: new Date(),
        date_updated: new Date(),
        attachment: data.attachedFile,
        is_draft: data.isDraft,
        is_sticky: data.isSticky, // <- TODO
        content: data.content,
        excerpt: data.excerpt,
    }, function (error, data) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};


// retrieve by id or by slug
PostSchema.statics.getPost = function (id, slug) {
    let queryObject = {};
    if (id) {
        queryObject = {_id: id};
    }
    else if (slug) {
        queryObject = {slug: slug};
    }
    var deferred = Q.defer();
    this.find(queryObject, function (error, data) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// paginated, defaults to page 1, 5 results
PostSchema.statics.getPostsByTagName = function (tagName, pageOffset, pageLimit) {
    let deferred = Q.defer();
    let options = {
        sort: {date_updated : -1},
        page: parseInt(pageOffset, 10) || 1,
        limit: parseInt(pageLimit, 10) || 5
    };
    let query = {tags: {$elemMatch: {id: tagName}}};
    this.paginate(query, options,
        function (error, data) {
            if (error) {
                deferred.reject(new Error(error));
            }
            else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
};

// retrieve all posts, paginated
// todo: parameterize sort criteria
PostSchema.statics.getAllPosts = function (pageOffset, pageLimit) {
    let deferred = Q.defer();
    let options = {
        sort: {date_updated: -1},
        page: parseInt(pageOffset, 10), //  \ __ passed in from frontend
        limit: parseInt(pageLimit, 10)  //  /
    };
    this.paginate({}, options, function (error, data) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};


// search
PostSchema.statics.searchPost = function (searchText, pageOffset, pageLimit) {
    let deferred = Q.defer();
    let options = {
        page: parseInt(pageOffset, 10),
        limit: parseInt(pageLimit, 10)
    };
    this.paginate({$text: {$search: searchText}}, options, function (error, data) {
        if (error) {
            deferred.reject(new Error());
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// update or
// Todo: upsert a post
PostSchema.statics.updatePost = function (id, data, upsertValue) {
    let deferred = Q.defer();
    let updates = data;
    this.update({
            _id: id
        }, {
            $set: {
                title: updates.title,
                slug: updates.slug,
                tags: updates.tags,
                date_created: updates.date_created,
                date_updated: new Date(),
                attachment: updates.attachment,
                is_draft: updates.is_draft,
                content: updates.content,
                excerpt: updates.excerpt
            }
        }, {
            upsert: upsertValue
        },
        function (error, data) {
            if (error) {
                deferred.reject(new Error(error));
            } else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
};

// delete
PostSchema.statics.deletePost = function (id) {
    let deferred = Q.defer();
    this.findByIdAndRemove(id, function (error, data) {
        if (error) {
            return deferred.reject(new Error(data));
        } else {
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};


var Post = mongoose.model('Post', PostSchema);

module.exports = Post;