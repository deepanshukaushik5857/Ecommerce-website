

import React, { Fragment } from 'react';
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { Rating,Button,Dialog,DialogTitle,DialogContent,DialogActions } from '@mui/material';
import { getProductDetails,clearErrors } from '../../actions/productactions';
import { useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MetaData from "../layout/MetaData.js";
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';
import {addItemsToCart} from "../../actions/cartActions.js";


const ProductDetails = () => {



  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails || {}
  )
  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id))
  }, [dispatch, id,alert,error])

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if(product.Stock <= quantity) return ;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if(1 >= quantity) return ;
    const qty = quantity - 1;
    setQuantity(qty);
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  // const submitReviewToggle = () => {
  //   open ? setOpen(false) : setOpen(true);
  // };


  return (
    <Fragment>
      {
        loading ? (<Loader />) :
          <Fragment>
            <MetaData title={`${product.name} --ECOMMERCE`}/>
            <div className="ProductDetails">
              <div>
                <Carousel className='Carousel'>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>


              <div>
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>product #{product._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <Rating {...options} />
                  <span className="detailsBlock-2-span">
                    {" "}
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{`₹${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>{" "}
                    {/* <button
                      disabled={product.Stock < 1 ? true : false}
                    > */}
                    <button onClick={addToCartHandler}>
                      Add to Cart
                    </button>
                  </div>

                  <p>
                    Status:
                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview">
                Submit Review
              </button>


              </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
            aria-labelledby="simple-dialog-title"
            // open={open}
            // onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                // onChange={(e) => setRating(e.target.value)}
                // value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                // value={comment}
                // onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button  color="secondary">
                Cancel
              </Button>
              <Button  color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>


            {product.Reviews && product.Reviews[0] ? (
              <div className="reviews">
                {product.Reviews &&
                  product.Reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}

          </Fragment>
      }
    </Fragment>
  )
}

export default ProductDetails;



