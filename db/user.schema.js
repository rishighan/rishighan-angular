var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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



module.exports = mongoose.model('UserSchema', UserSchema);