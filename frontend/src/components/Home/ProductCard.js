import React from 'react';
import { Link } from 'react-router-dom';
import Reactstars from "react-rating-stars-component";





const ProductCard = ({product}) => {

    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        size: window.innerWidth < 600 ? 20 : 25,
        activeColor:"tomato",
        value:product.ratings,
        isHalf:true,
    };

    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <Reactstars {...options}/> <span>({product.numofReviews})</span>
            </div>
            <span>{`₹${product.price}`}</span>

        </Link>
    )
}

export default ProductCard
