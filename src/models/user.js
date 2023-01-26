const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');

const Token = require('../models/token');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: 'Your email is required',
        trim: true
    },

    userName: {
        type: String,
        unique: true,
        required: 'Your username is required',
    },
    gender: {
        type: String,
    },

    DOB: {
        type: Date,
        max: [Date.now() - 365*18*24*60*60*1000, 'Too young to register'],//16 years
        required: 'date of birth is required',
       
    },

    password: {
        type: String,
        required: 'Your password is required',
        min:8,
        max: 100
    },
   

    location: {
        type: String,
        required: false,
        max: 255
    },
    language: {
        type: String,
        required: false,
        max: 255
    },

    profileImage: {
        type: String,
        required: false,
        max: 255
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },
    KYC: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
        required: false
    },

    resetPasswordExpires: {
        type: Date,
        required: false
    },
    barterwayCoins:{
        type:Number,
        required: false
    }
}, {timestamps: true},);


UserSchema.pre('save',  function(next) {
    const user = this;

    // if(user.confirmPassword===user.password) return next()

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
       
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

UserSchema.methods.generatePasswordReset = function() {
    // this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = Math.floor(Math.random()*90000) + 10000;
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

UserSchema.methods.generateVerificationToken = function() {
    let payload = {
        userId: this._id,
        // token: crypto.randomBytes(20).toString('hex')
        token: Math.floor(Math.random()*900000) + 100000
    
    };

    return new Token(payload);
};

module.exports = mongoose.model('Users', UserSchema);