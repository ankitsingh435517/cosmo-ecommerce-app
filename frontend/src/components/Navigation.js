import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext, LoginContext, UserContext } from "../Contexts";
import { Dropdown, SearchBar } from ".";

const Navigation = () => {
  const { cart } = useContext(CartContext);

  const _cart = JSON.parse(window.localStorage.getItem('cart'));

  const [isAdded, setisAdded] = useState(false);

  const { isloggedIn, setisloggedIn } = useContext(LoginContext);

  const { userProfile, setuserProfile } = useContext(UserContext);

  const [isHamburgerOn, setIsHamburgerOn] = useState(false);

  useEffect(() => {
    setisAdded(true);
    setTimeout(() => {
      setisAdded(false);
    }, 1000);
  }, [cart.totalItems]);

  const handleHamburgerMenu = () => {
    if(isHamburgerOn){
      setIsHamburgerOn(false);
    }else{
      setIsHamburgerOn(true);
    } 
  }

  return (
    <div className="container mx-auto mb-6 mt-4 flex  justify-between px-4">
      <Link to="/">
        <h1 className="font-extrabold text-2xl">
          co<em className="font-extrabold text-2xl">s</em>mo
        </h1>
      </Link>
    <nav className="">
      <button onClick={ handleHamburgerMenu } className="float-right hamburger hover:text-yellow-500"><i className="fas fa-bars"></i></button>
      {
        isHamburgerOn ? 
      <div className="pt-12">
      <div className="">
          <SearchBar />
      </div>
      <ul className=" flex items-center">
        <Link to="/cart" className="flex items-center">
          <img
            style={{ height: "19px", width: "21px" }}
            src="/images/cart-black.png"
            alt="cart"
          />
          <li className="my-1 ml-1.5 relative font-semibold font-md hover:text-gray-500">
            {/* cart icon */}
            cart
            { _cart && _cart.totalItems > 0 ? (
              <span
                className={`${isAdded ? "animate-ping" : ""} absolute ${
                  _cart.totalItems > 9 ? "-left-6" : "-left-5"
                } bottom-3 text-yellow-500 font-medium`}
              >
                {_cart.totalItems}
              </span>
            ) : (
              <></>
            )}
          </li>
        </Link>

        {/* className="ml-1.5 fas fa-caret-down" */}
        <div className="ml-8  flex items-center  ">
          {
            isloggedIn ? (<>
              
                    <Dropdown userProfile={userProfile} loginStatus={setisloggedIn} />
               
               </>) : (<>
               <Link to="/signin">
                    <li className="font-semibold ml-1 text-sm tracking-wider">signIn</li>
                    </Link>
               </>)
          }
          
          
            
          
        </div>
      </ul>
     </div> :
      <div className="flex">
      <div className="nav-ul">
          <SearchBar />
      </div>
      <ul className="nav-ul flex items-center">
        <Link to="/cart" className="flex items-center">
          <img
            style={{ height: "19px", width: "21px" }}
            src="/images/cart-black.png"
            alt="cart"
          />
          <li className="ml-1.5 relative font-semibold font-md hover:text-gray-500">
            {/* cart icon */}
            cart
            { _cart && _cart.totalItems > 0 ? (
              <span
                className={`${isAdded ? "animate-ping" : ""} absolute ${
                  _cart.totalItems > 9 ? "-left-6" : "-left-5"
                } bottom-3 text-yellow-500 font-medium`}
              >
                {_cart.totalItems}
              </span>
            ) : (
              <></>
            )}
          </li>
        </Link>

        {/* className="ml-1.5 fas fa-caret-down" */}
        <div className="flex items-center ml-8 ">
          {
            isloggedIn ? (<>
              
                    <Dropdown userProfile={userProfile} loginStatus={setisloggedIn} />
               
               </>) : (<>
               <Link to="/signin">
                    <li className="font-semibold ml-1 text-sm tracking-wider">signIn</li>
                    </Link>
               </>)
          }
          
          
            
          
        </div>
      </ul>
      </div> 
      }
    </nav>
      </div>
  );
};

export default Navigation;
