// todo: create a node microservice
let mongoose = require('mongoose');
let Q = require('q');
let PostSchema = require('./post.schema');
let mongoosePaginate = require('mongoose-paginate');

PostSchema.plugin(mongoosePaginate);

// create
PostSchema.statics.createPost = function (data) {
    let deferred = Q.defer();
    this.create({
        title: data.title,
        slug: data.slug,
        tags: data.tags,
        date_created: new Date(),
        date_updated: new Date(),
        attachment: data.attachedFile,
        is_draft: data.isDraft,
        is_sticky: data.isSticky, // <- TODO
        is_archived: data.isArchived,
        content: data.content,
        excerpt: data.excerpt,
    }, (error, data) => {
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
    } else if (slug) {
        queryObject = {slug: slug};
    }
    let deferred = Q.defer();
    this.find(queryObject, (error, data) => {
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
        sort: {date_updated: -1},
        page: parseInt(pageOffset, 10) || 1,
        limit: parseInt(pageLimit, 10) || 5
    };
    let query = {tags: {$elemMatch: {id: tagName}}, is_draft: false, is_archived: false};
    this.paginate(query, options,
        (error, data) => {
            if (error) {
                deferred.reject(new Error(error));
            } else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
};

// filter on tag(s)
PostSchema.statics.filterOnTags = function (tagNames) {
    let deferred = Q.defer();
    let options = {
        sort: {date_updated: -1}
    };
    let query = {'tags.id': {$nin: tagNames}};
    this.find(query, (error, data) => {
        if (error) {
            deferred.reject(new Error(error));
        } else {
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
    this.paginate({}, options, (error, data) => {
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
    this.paginate({$text: {$search: searchText}}, options, (error, data) => {
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
                is_archived: updates.is_archived,
                content: updates.content,
                excerpt: updates.excerpt
            }
        }, {
            upsert: upsertValue
        },
        (error, data) => {
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
    this.findByIdAndRemove(id, (error, data) => {
        if (error) {
            return deferred.reject(new Error(data));
        }
        return deferred.resolve(data);
    });
    return deferred.promise;
};

// stats
PostSchema.statics.getStats = function () {
    let drafts = this.find({'is_draft': true}).count().exec();
    let total = this.find({}).count().exec();
    let blogPosts = this.find({'tags': {$elemMatch: {id: 'Blog'}}}).count().exec();
    return Q.all([total, drafts, blogPosts])
        .then((data) => {
            return {
                total: data[0],
                drafts: data[1],
                blogPosts: data[2]
            };
        })
        .catch((err) => {
            return err;
        })
        .finally((res) => {
            return res;
        });
};

// get archived posts
PostSchema.statics.getArchivedPosts = function () {
    let deferred = Q.defer();
    this.aggregate(
        {$match: {'is_archived': true}},
        {$project: {day: {$substr: ['$date_created', 0, 10]}}},
        {$group: {_id: "$day", number: {$sum: 1}}},
        {$sort: {_id: 1}},
        (err, data) => {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve(data);
        });
    return deferred.promise;
};
let Post = mongoose.model('Post', PostSchema);

module.exports = Post;
