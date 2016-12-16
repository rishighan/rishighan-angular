var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var Q = require('q');

var PostSchema = new Schema({
    title: String,
    slug: String,
    tags: [{
        id: String,
        name: String
    }],
    date_created: Date,
    date_updated: Date,
    attachment: [{
        name: String,
        size: Number,
        date_created: Date,
        date_updated: Date

    }],
    is_draft: Boolean,
    content: String,
    excerpt: String,
});

PostSchema.plugin(mongoosePaginate);
//indices
PostSchema.index({date_created: -1, date_updated: -1});
PostSchema.set('autoIndex', false);

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
        is_draft: false,
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
    var deferred = Q.defer();
    this.find({
        $or: [{_id: id}, {slug: slug}]
    }, function (error, data) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// retrieve all posts
// todo: paginate requests, sorting them in descending order
PostSchema.statics.getAllPosts = function () {
    var deferred = Q.defer();
    var options = {
        sort: {date_updated: -1},
        offset: 0, // \ __ passed in from frontend
        limit: 5   // /
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

// update or
// Todo: upsert a post
PostSchema.statics.updatePost = function (id, data, upsertValue) {
    var deferred = Q.defer();
    var updates = data;
    this.update({
            _id: id
        }, {
            $set: {
                title: updates.title,
                slug: updates.slug,
                tags: updates.tags,
                date_created: updates.date_created,
                date_modified: new Date(),
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

PostSchema.statics.deletePost = function (id) {
    var deferred = Q.defer();
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