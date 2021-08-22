import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { CartContext, LoginContext, UserContext } from '../Contexts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const Dropdown = () => {
const notify = () => {
  toast.info('Logged out successfuly');
}

const notify_err = () => {
  toast.error('Something went wrong');
}

  const history = useHistory();

    const { isloggedIn, setisloggedIn } = useContext(LoginContext);

    const { userProfile, setuserProfile, setAddMargin, addMargin } = useContext(UserContext);

    const { cart } = useContext(CartContext);


    const logout = () => {
        fetch('/cosmo/api/v1/user/logout')
        .then(res => res.json())
        .then(data => {
            if(data && data.success){ 
              //  window.alert('Logged out successfuly')
               setisloggedIn(false);
               
                  window.localStorage.setItem('loginStatus', JSON.stringify(0));
               
                  window.localStorage.setItem('userData', JSON.stringify({}));
               
               history.push('/signin')
               notify()
            }else{
                // window.alert('Something went wrong')
                notify_err();
                console.log(data.message)
            }
        })
        

        cart.totalItems = 0;
        cart.items = {};

        window.localStorage.setItem('cart', JSON.stringify(cart));

        window.localStorage.setItem('cartItems', JSON.stringify({}))
        window.localStorage.setItem('cart', JSON.stringify({}))

        window.localStorage.setItem('checkOutDetails', JSON.stringify({}))
        window.localStorage.setItem('checkOutSteps', JSON.stringify({}))
        
        window.localStorage.setItem('isOrderInitiated', JSON.stringify(0));
    }

    
    useEffect(() => {
       if(JSON.parse(window.localStorage.getItem('loginStatus')) == 0){
         return;
       }
    },[]);

   
    const addMarginToBanner = () => {
       if(addMargin){
          setAddMargin(false);
       }else{
          setAddMargin(true);
       }
    }
  return (
    <>
      <i className="fa fa-user text-blue-500 text-sm" aria-hidden="true"></i>
      
        <li className="font-mono subpixel-antialiased  ml-1 font-md  text-md  pl-1">
          {
            <div className="flex items-center">
              <NavDropdown onClick={ addMarginToBanner } title={userProfile && userProfile.name && userProfile.name.split(" ")[0] }  className="mt-1 -ml-1 px-0.5 hover:text-blue-700 rounded-full tracking-wider">
                <div className="bg-gray-400 grayscale text-white font-semibold px-2 py-1 my-1.5">   
                 {
                   userProfile.role === 'admin' ? 
                   <><Link to="/dashboard">
                     <NavDropdown.Item href="/dashboard" className="text-sm hover:text-yellow-300">Dashboard</NavDropdown.Item><br/>
                   </Link>
                   <hr/></>
                   :<></>
                 }
                 <Link to="/myOrders">
                   <NavDropdown.Item href="/myOrders" className="text-sm hover:text-yellow-300">my Orders</NavDropdown.Item><br/>
                 </Link>
                 <hr/>
                 <Link to="/profile" className="">
                   <NavDropdown.Item href="/profile" className="text-sm hover:text-yellow-300">profile</NavDropdown.Item><br/>
                 </Link>
                 <hr/>
                   <NavDropdown.Item onClick={ logout } className="text-sm hover:text-yellow-300">logout</NavDropdown.Item>
                 </div>
              </NavDropdown>
          <i className="-mb-1 fas fa-caret-down text-gray-400 text-sm"></i>
            </div>
          }
        </li>

        
      
    </>
  );
};

export default Dropdown;
