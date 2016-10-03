var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Define our user schema
var UserSchema = new Schema({
    username: String,
    password: String
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('UserSchema', UserSchema);