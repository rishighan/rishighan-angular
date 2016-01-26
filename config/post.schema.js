var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.PostSchema = new Schema({
    title: String,
    tags: [{
        id: String,
        name: String
    }],
    date_created: Date,
    date_updated: Date,
    attachment: String,
        // size: Number,
        // date_created: Date,
        // date_updated: Date

    is_draft: Boolean,
    content: String,
    excerpt: String,
    citation: [{
        url: String,
        description: String
    }]
});

