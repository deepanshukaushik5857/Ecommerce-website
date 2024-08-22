import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import Header from "./components/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./components/layout/Foooter/Footer";
import Home from "./components/Home/Home";
import Loader from "./components/layout/Loader/Loader";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import LoginSignup from "./components/User/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import Cart from "./components/Cart/Cart"
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment.js";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrder from "./components/Order/MyOrder";


function App() {
  // console.log('Stripe Public Key:', process.env.STRIPE_API_KEY);
  // const stripePromise = loadStripe(process.env.STRIPE_API_KEY);
  const { isAuthenticated, user } = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);


  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
          <Route path="/process/payment" element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}><Payment /></ProtectedRoute>} />
          </Routes>
        </Elements>
      )}
      
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/sad" Component={Loader} />
          <Route path="/product/:id" Component={ProductDetails} />
          <Route path="/products" Component={Products} />
          <Route path="/products/:keyword" Component={Products} />
          <Route path="/Search" Component={Search} />
          <Route path="/login" Component={LoginSignup} />
          <Route path="/account" element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true}><Profile /></ProtectedRoute>} />
          <Route path="/me/update" element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}><UpdateProfile /></ProtectedRoute>} />
          <Route path="/password/update" element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}><UpdatePassword /></ProtectedRoute>} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/cart" Component={Cart} />
          <Route path="/login/shipping" element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}><Shipping /></ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}><ConfirmOrder /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}><OrderSuccess/></ProtectedRoute>}/>
          <Route path="/orders" element={<ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}><MyOrder/></ProtectedRoute>}/>


        </Routes>

      <Footer />
    </Router>
  );
}

export default App;
