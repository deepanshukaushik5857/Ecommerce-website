const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
const errorMiddleware = require("./middleware/error.js");
const dotenv = require("dotenv");
// route imports


dotenv.config({path: "backend/config/config.env"});


const product = require("./Routes/productRoute.js");
const user = require("./Routes/userRoute.js");
const order = require("./Routes/orderRoute.js");
const payment = require("./Routes/paymentRoute.js");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

// use error middleware
app.use(errorMiddleware);
module.exports = app;