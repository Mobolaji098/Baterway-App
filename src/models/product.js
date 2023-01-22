const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    name: {
        type: String,
        required: 'productname is required',
    },
    price:{
        type:Number,
        required: true
    },
    weight:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required: true
    },
    itemInReturn:{
        type: String,
        required: 'product to exchange with required',
    },
    location:{
        type:String,
        required: 'location of item required'
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    }

}, {timestamps: true});

module.exports = mongoose.model('Products', productSchema);