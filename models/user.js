const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Field name is required']
    },
    email: {
        type: String,
        required: [true, 'Field email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Field password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'Field role is required']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;

}

module.exports = model('User', userSchema);