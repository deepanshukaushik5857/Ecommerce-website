const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the product price"],
        maxLength:[8,"Price cannot exceed 8 figures"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }}
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"],
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product stock"],
        maxLength:[4,"Stock cannot excced 4 characters"],
        default:1
    },
    numofReviews:{
        type:Number,
        default:0
    },
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    Reviews:[
        {
            
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
        }
    ],
    craetedAt:{
        type:Date,
        default:Date.now
    }
        
    
})


module.exports = mongoose.model("Product",productSchema);