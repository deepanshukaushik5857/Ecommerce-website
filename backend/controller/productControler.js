const catchAsyncError = require("../middleware/catchAsyncError.js");
const Product = require("../models/productModels.js");
const ApiFeatures = require("../utils/apifeatures.js");
const ErrorHandler = require("../utils/errorhandler.js");


// create product --admin

exports.createProduct = catchAsyncError(async(req,res,next)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(200).json({
        success:true,
        product
    });
});



// Get All Product (Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });



exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
  
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

      
  
    let products = await apiFeature.query.clone();
  
    let filteredProductsCount = products.length;
  
    apiFeature.pagination(resultPerPage);
  
    products = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  });


// update product -- admin

exports.updateProduct = catchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
});


// GET PRODUCT DETAILS

exports.getProductDetails = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id);


    if (!product) {
        return next(new ErrorHandler("Product not found",404));
    }


    res.status(200).json({
        success:true,
        product,
    })
});

// delete product


exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found",404));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
});


// create new review or update the review

exports.createProductReview = catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId} = req.body;
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    const isReviewed = product.Reviews.find(rev=> rev.user.toString()===req.user._id.toString())
    if(isReviewed){
        product.Reviews.forEach(rev => {
            if(rev.user.toString()===req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
        })
    }
    else{
        product.Reviews.push(review);
        product.numofReviews = product.Reviews.length
    }


    let avg = 0;
     product.Reviews.forEach(rev => {
        avg = avg + rev.rating;
    });

    product.ratings = avg/product.Reviews.length;



    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })
})

// get all REviews of a product

exports.getProductReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        Reviews:product.Reviews,
    })
})


// delete review

exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }


    const Reviews = product.Reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    let avg = 0;
    Reviews.forEach(rev => {
        avg = avg + rev.rating;
    });

    let ratings = 0;

    if (Reviews.length === 0) {
        ratings = 0;
      } else {
        ratings = avg / Reviews.length;
      }

    const numofReviews = Reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        Reviews,
        ratings,
        numofReviews,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    }
    );

    res.status(200).json({
        success:true,
    })

})