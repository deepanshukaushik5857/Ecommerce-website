import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {  productReducer } from "./reducers/productReducer";
import  {productDetailsReducer}  from "./reducers/productReducer"; 
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer } from "./reducers/orderReducer";
// import { forgotPasswordReducer } from "../../backend/controller/userController";


const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders: myOrdersReducer,
});

let initialState = {
  cart:{
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartitems"))
    : [],
    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

export default store;