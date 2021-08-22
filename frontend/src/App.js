import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import { Footer, Navigation } from "./components";
import { Trending, SingleProduct, Home, Cart, SignUp, SignIn, UserProfile,
 UpdateUserProfile, UpdateUserPassword, SetNewPassword, ForgotPassword, ResetPassword, 
 CheckOutShippingInfo, CheckOutPaymentInfo,
 CheckOutOrderDetails, CheckOutOrderDone, StripeContainer,
 MyOrders, SingleOrder, Dashboard, Users, SingleUser, AllUsers,
 Orders, AdminSingleOrder, AllOrders, UpdateOrder,
 AdminProducts, AdminSingleProduct, UpdateProduct, AdminAllProducts, AddNewProduct, SearchProducts } from './pages'; 
import { CartContext, LoginContext, UserContext } from './Contexts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();


function App() {
  const [cart, setCart] = useState({});

  const [isloggedIn, setisloggedIn] = useState(false);

  const [userProfile, setuserProfile] = useState({});


  /// cart
  useEffect(() => {
     const cart = window.localStorage.getItem('cart');

     setCart(JSON.parse(cart));

     // order initiation
     const isOrderInitiated = JSON.parse(window.localStorage.getItem('isOrderInitiated'));
     if(isOrderInitiated === 1){
       return;
     }
     window.localStorage.setItem('isOrderInitiated', JSON.stringify(0));
  },[]);



  // cart
  useEffect(() => {
     window.localStorage.setItem('cart', JSON.stringify(cart));
  },[cart]);


  

  // login and userdata
  
  useEffect(() => {
    fetch('/cosmo/api/v1/user/me/show',{
      method: "GET",
      headers:{
          Accept: "application/json",
          "Content-Type":"application/json"
      },
      credentials: "include"
  }).then(res => res.json()).then(data => {
    // console.log(data)
      if(data && data.success){
        
          window.localStorage.setItem('userData', JSON.stringify(data.user))
          setisloggedIn(true)
          setuserProfile(data.user);
      }
  })

  }, []);
  
  
  useEffect(() => {
    
    fetch('/cosmo/api/v1/user/me/show',{
      method: "GET",
      headers:{
          Accept: "application/json",
          "Content-Type":"application/json"
      },
      credentials: "include"
  }).then(res => res.json()).then(data => {
      if(data && data.success){
          window.localStorage.setItem('userData', JSON.stringify(data.user))
          setisloggedIn(true)
          setuserProfile(data.user);
      }
  })

  }, [isloggedIn]);

  const [addMargin, setAddMargin] = useState(false);
  
  

  return (
    <>
         <Router>
              
           <CartContext.Provider value={{ cart, setCart }} >
              <LoginContext.Provider value={{ isloggedIn, setisloggedIn }}>
                <UserContext.Provider value={{ userProfile, setuserProfile, setAddMargin, addMargin }}>
                  <Navigation />
                    <Switch>
                        <Route path="/" component={Home} exact></Route>
                        <Route path="/trending" component={Trending} ></Route>
                        <Route path="/singleProduct/:id" component={SingleProduct}></Route>
                        <Route path="/cart" component={Cart} ></Route>
                        <Route path="/signup" component={SignUp} ></Route>
                        <Route path="/signin" component={SignIn} ></Route>
                        <Route path="/profile" component={UserProfile} ></Route>
                        <Route path="/updateProfile" component={UpdateUserProfile} ></Route>
                        <Route path="/updatePassword" component={UpdateUserPassword} ></Route>
                        <Route path="/setNewPassword" component={SetNewPassword} ></Route>
                        <Route path="/forgotPassword" component={ForgotPassword} ></Route>
                        <Route path="/resetPassword/:token" component={ResetPassword} ></Route>
                        <Route path="/shippingInfo" component={CheckOutShippingInfo} ></Route>
                        <Route path="/orderDetails" component={CheckOutOrderDetails} ></Route>
                        <Route path="/paymentInfo" component={CheckOutPaymentInfo} ></Route>
                        <Route path="/paymentDetails" component={StripeContainer} ></Route>
                        <Route path="/done" component={CheckOutOrderDone} ></Route>
                        <Route path="/myOrders" component={MyOrders} ></Route>
                        <Route path="/singleOrder/:id" component={SingleOrder} ></Route>
                        <Route path="/dashboard" component={Dashboard} ></Route>
                        <Route path="/admin/users" component={Users} ></Route>
                        <Route path="/admin/singleUser/:id" component={SingleUser} ></Route>
                        <Route path="/admin/allUsers" component={AllUsers} ></Route>
                        <Route path="/admin/orders" component={Orders} ></Route>
                        <Route path="/admin/singleOrder/:id" component={AdminSingleOrder} ></Route>
                        <Route path="/admin/AllOrders" component={AllOrders} ></Route>
                        <Route path="/admin/updateOrder/:id" component={UpdateOrder} ></Route>
                        <Route path="/admin/products" component={AdminProducts} ></Route>
                        <Route path="/admin/singleProduct/:id" component={AdminSingleProduct} ></Route>
                        <Route path="/admin/updateProduct/:id" component={UpdateProduct} ></Route>
                        <Route path="/admin/allProducts" component={AdminAllProducts} ></Route>
                        <Route path="/admin/addNewProduct" component={AddNewProduct} ></Route>
                        <Route path="/searchProducts" component={SearchProducts} ></Route>
                        
                    </Switch>
                </UserContext.Provider>
              </LoginContext.Provider>  
           </CartContext.Provider>
              
          {/* <Footer /> */}
          
         </Router>  
           
    </>
  );
}

export default App;
