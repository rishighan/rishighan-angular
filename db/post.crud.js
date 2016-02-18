var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var PostSchema = new Schema({
    title: String,
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
    citation: [{
        name: String,
        source: String
    }]
});

// create
PostSchema.statics.createPost = function(data) {
    var deferred = Q.defer();
    this.create({
        title: data.title,
        tags: data.tags,
        date_created: new Date(),
        date_updated: new Date(),
        attachment: data.attachedFile,
        is_draft: false,
        content: data.content,
        excerpt: data.excerpt,
        citation: data.citations,
    }, function(error, data) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}


// retrieve by id
PostSchema.statics.getPost = function(id) {
    var deferred = Q.defer();
    this.find({
        _id: id
    }, function(error, data) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

// retrieve all posts
PostSchema.statics.getAllPosts = function() {
    var deferred = Q.defer();
    this.find({}, function(error, data) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

// update or upsert a post
PostSchema.statics.updatePost = function(id, data){
    var deferred = Q.defer();
    this.update({
        _id: id
    })

}

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;