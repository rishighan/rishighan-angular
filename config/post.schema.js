var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.PostSchema = new Schema({
    title: String,
    tags: [{
        name: String,
        description: String
    }],
    date_created: Date,
    date_updated: Date,
    attachment: [{
        url: String,
        size: Number,
        date_created: Date,
        date_updated: Date
    }],
    is_draft: Boolean,
    content: String,
    excerpt: String,
    citation: [{
        url: String,
        description: String
    }]
});
