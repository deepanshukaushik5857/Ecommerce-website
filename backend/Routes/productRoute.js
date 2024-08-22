const express = require("express");
const Router = express.Router();
const {getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview} = require("../controller/productControler.js");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth.js");

Router.route("/products").get(getAllProducts);


Router
    .route("/admin/product/new")
    .post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);


Router.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);


Router.route("/product/:id").get(getProductDetails);

Router.route("/reviews").put(isAuthenticatedUser,createProductReview);

Router.route("/reviewss").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);



module.exports = Router;