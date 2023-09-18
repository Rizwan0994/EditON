const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        
        unique: true
    },
    // phone: {
    //     type: Number,
    //     required: true,
    // },
    country: {
        type: String,
        
    },
    state: {
        type: String,
        
    },
    city:{
        type: String,
        
    },
    language: {
        type: String,
        
    },
    terms_conditions: {
        type: Boolean,
        
      },
      userType: {
        type: String,
    
      },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
        
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        default: null,
      },
    myVideos: {
        type: [String],
        default: []
    }
})

const UserModel = mongoose.model('Users', UserSchema)
module.exports = UserModel