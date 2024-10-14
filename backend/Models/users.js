const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    confirmPassword: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        unique: false,
        default:""
    },

    Address: {
        type: String,
        unique: false,
        default:""
    },

    state: {
        type: String,
        unique: false,
        default:""
    },

    Country: {
        type: String,
        unique: false,
        default:""
    },

    profileImage: {
        type: String,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

exports.User = mongoose.model('User', userSchema)