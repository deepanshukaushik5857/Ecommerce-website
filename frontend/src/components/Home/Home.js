import { Fragment, useEffect } from "react";
import React from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { getProduct,clearErrors } from "../../actions/productactions.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";



// const product = {
//     name:"Blue Shirt",
//     images:[{url:"https://images.bestsellerclothing.in/data/selected/march-17-2022/200658604_g1.jpg?width=1080&height=1355&mode=fill&fill=blur&format=auto"}],
//     price:"3000",
//     _id:"abhishek"
// }

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.products
    )

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])
    return (
        <Fragment>
            {
                loading ? (<Loader />) :
                    <Fragment>

                        <MetaData title="ECOMMERCE" />
                        <div className="banner">
                            <p>Welcome To Ecommerce</p>
                            <h1>FIND AMAZING PRODUCT BELOW</h1>
                            <a href="#container">
                                <button>
                                    scroll <CgMouse />
                                </button>
                            </a>
                        </div>
                        <h2 className="homeHeading">Featured Heading</h2>
                        <div className="container" id="container">
                            {products && products.map((product) => <Product product={product} />)}

                        </div>

                    </Fragment>
            }
        </Fragment>

    )
}

export default Home
