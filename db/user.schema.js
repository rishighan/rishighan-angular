var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Define our user schema
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('UserSchema', UserSchema);