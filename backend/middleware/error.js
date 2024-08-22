const ErrorHandler = require("../utils/errorhandler.js");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";




    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //  mongoose duplictae key error
    if(err.code === 1100){
        const message = `Duplicate ${object.keys(err.keyvalue)} Entered `;
        err = new ErrorHandler(message, 400);
    }

    // Wrong jwt error
    if(err.name === "JsonWebTokenError" ){
        const message = `json Web Token is Invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // jwt expire error
    if(err.name === "TokenExpirederror" ){
        const message = `json Web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    
    res.status(err.statusCode).json({
        success: false,
        message : err.message,
    });
};



