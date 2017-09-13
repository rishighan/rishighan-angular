let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema({
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
        url: String,
        isHero: Boolean,
        date_created: Date,
        date_updated: Date

    }],
    is_sticky: Boolean,
    is_archived: Boolean,
    is_draft: Boolean,
    content: String,
    excerpt: String,
});

//indices
PostSchema.index({
    date_created: -1,
    date_updated: -1,
    title: "text",
    content: "text",
    excerpt: "text"
}, {
    collation: {locale: "en", strength: 2}
});
PostSchema.set('autoIndex', false);

module.exports = PostSchema;