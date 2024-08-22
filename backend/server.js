const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database.js");


// handeling uncaught exception
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exception`);


    process.exit(1);
})


// config
dotenv.config({path:"backend/config/config.env"});

//  connecting to database 
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const server = app.listen(process.env.PORT,()=>{
    console.log(`the server is running on http://localhost:${process.env.PORT}`);
})

// unhandelled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandeled promise`);

    server.close(()=>{
        process.exit(1);
    })

})