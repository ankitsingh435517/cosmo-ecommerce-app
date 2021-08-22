import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../Contexts";
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const Cart = () => {
  const CustomToast = ({ action, product }) => (<>
    <div className="flex items-center">
      <img style={{height:'30px', width:'30px'}} src={product.images[0].url}/>
      <h1 className=" ml-2 text-sm">{product.name.substr(0,20)}...</h1>
    </div>
    <div className="">
      <h1 className="text-sm">{action === 'removed' ? 'Item removed' : 'Item added'}</h1>
    </div>
 </>)

const notify = (action, product) => {
    toast(<CustomToast action={action} product={product} />)
}

  let grandTotal = 0;

  const [isOrderInitiated, setIsOrderInitiated] = useState(false);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const history = useHistory();

  const { cart, setCart } = useContext(CartContext);

  // const _cart = JSON.parse(window.localStorage.getItem('cart'));

  const [products, setProducts] = useState([]);

  const [loginStatus, setloginStatus] = useState(0);
  

  useEffect(() => {
     setloginStatus(JSON.parse(window.localStorage.getItem('loginStatus')));
     const _checkOutSteps = JSON.parse(window.localStorage.getItem('checkOutSteps'));

     if(_checkOutSteps){
        if(_checkOutSteps.step1_shippingInfo === 'active' || _checkOutSteps.step2_orderDetails === 'active'
          ||_checkOutSteps.step3_paymentInfo === 'active' || _checkOutSteps.step4_done === 'active'){
              setIsPlacingOrder(true)
          }
       }
    }, [])

  useEffect(() => {
    
    // console.log(_cart);
    if(!cart.items){
      return;
    }
    
    
    fetch("/cosmo/api/v1/products/cart-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => res.json())
      .then((products) => {
        console.log(products);
        setProducts(products);
        window.localStorage.setItem('cartItems', JSON.stringify(products));
      });
  }, [cart.totalItems]);
 

  const decrement = (product) => {
    const _cart = { ...cart };

    if (_cart.items[product._id] === 1) {
      return;
    }

    _cart.items[product._id] -= 1;

    _cart.totalItems -= 1;

    setCart(_cart);
    notify('removed', product);
  };

  const increment = (product) => {
    const _cart = { ...cart };

    if (_cart.items[product._id] === product.stock) {
      return;
    }

    _cart.items[product._id] += 1;

    _cart.totalItems += 1;

    setCart(_cart);
    notify('added', product);
  };

  const getSum = (productId, productPrice) => {
    const sum = cart.items[productId] * productPrice;
    grandTotal += sum;
    return sum;
  };

  const deleteItem = (product) => {
    const _cart = { ...cart };

    const qty = _cart.items[product._id];

    delete _cart.items[product._id];

    _cart.totalItems -= qty;

    const remainingProducts = products.filter(
      (_product) => _product._id !== product._id
    );

    setProducts(remainingProducts);
    setCart(_cart);
    notify('removed', product)
  };

  const handlePlaceOrder = () => {
    if(loginStatus == 0){
      history.push('/signin');
      return;
    }
    
    let redirection = '/shippingInfo';
    
    if(isPlacingOrder){
      const _checkOutSteps = JSON.parse(window.localStorage.getItem('checkOutSteps'));

      if(_checkOutSteps.step1_shippingInfo === 'active'){
         redirection = '/shippingInfo';
      }else if(_checkOutSteps.step2_orderDetails === 'active'){
         redirection = '/orderDetails';
      }else if(_checkOutSteps.step3_paymentInfo === 'active'){
         redirection = '/paymentInfo';
      }else if(_checkOutSteps.step4_done === 'active'){
         redirection = '/done';
      }
 
      history.push(redirection);
      return;
    }

    const checkOutSteps = {
       step1_shippingInfo: 'active',
       step2_orderDetails: 'disable',
       step3_paymentInfo: 'disable',
       step4_done: 'disable',
     }

     const checkOutDetails = {
       step1_shippingInfo: {},
       step2_orderDetails: {
        orderItems:[],
        otherDetails:{}
       },
       step3_paymentInfo: {}
     }

     window.localStorage.setItem('checkOutSteps', JSON.stringify(checkOutSteps));

     window.localStorage.setItem('checkOutDetails', JSON.stringify(checkOutDetails));
     
     window.localStorage.setItem('isOrderInitiated', JSON.stringify(1));
     history.push(redirection);
    }

  return products.length > 0 ? (
    <div className="container mx-auto xl:w-2/3 my-14">
      <h1 className="font-semibold text-lg">Your cart</h1>
      <div className="container mx-auto my-3">
        <div className="container orders text-sm md:text-base ml-12">
          <ul className="grid grid-cols-1">
            {products.map((product) => {
              return (
                <>
                  <li className="container my-6 ">
                    <div className="flex container">
                      
                        <Link to={`/singleProduct/${product._id}`}>
                          <img
                            className="container w-20 h-20 "
                            
                            src={product.images && product.images[0].url}
                            alt={product.name}
                          />
                        </Link>
                      <div className="text-sm md:text-base ml-6 md:flex items-center">
                        <div className="lg:w-96">
                          <Link to={`/singleProduct/${product._id}`}>
                            <h1 className=" hover:text-red-500 font-semibold my-1">
                              {product.name}
                            </h1>
                          </Link>
                          <h6 className="text-gray-600">
                            seller:{" "}
                            <span className="text-sm text-blue-600 mb-2">
                              {product.seller}
                            </span>
                          </h6>
                        </div>
                        <div className="md:mx-8 items-center flex my-2 lg:w-28">
                          <div className="flex md:mr-14 mr-6">
                          <button
                            onClick={() => {
                              decrement(product);
                            }}
                            className="text-sm px-1.5 leading-none bg-gray-600 rounded text-white font-bold hover:bg-gray-500"
                          >
                            -
                          </button>
                          <b className="mx-2 text-sm">{cart.items[product._id]}</b>
                          <button
                            onClick={() => {
                              increment(product);
                            }}
                            className="px-1.5 text-sm  leading-none bg-gray-600 rounded text-white font-bold hover:bg-gray-500"
                          >
                            +
                          </button></div>
                          <div className="flex ">
                        <span className="md:mx-1 ml-8 lg:w-24 font-light font-mono">
                          ₹ {getSum(product._id, product.price)}
                        </span>
                      <button
                        onClick={() => {
                          deleteItem(product);
                        }}
                        className="md:ml-4 ml-8 hover:text-red-500 text-gray-500 float-right "
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button></div>
                        </div>
                      </div>

                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>

        <div className=" border-t-2  mt-6 h-42 w-full float-right">
          <div className="bill pr-1 pt-1 pb-1 text-center mt-1">
            <h1 className="font-bold">Price details</h1>
            <hr className="my-1" />
            <div className="my-2">
              <div className="w-1/2 mx-auto justify-between items-center">
              <h6 className="font-medium  pb-2">
                <span className="font-serif">Total items</span>:{" "}
                {cart.totalItems}{" "}
              </h6>
                <h6 className="font-medium text-">
                  <span className="font-serif">Total MRP</span>: Rs {grandTotal}{" "}
                </h6>
                <button onClick={ handlePlaceOrder }
                  className=" my-2  object-cover rounded-full px-6 py-1 bg-red-500 text-white hover:bg-red-600 font-semibold"
                >
                {
                  isPlacingOrder ? 'continue' : 'Place order'
                }
                </button></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="">
        <button
          onClick={() => {
            history.goBack();
          }}
          className="mx-16 font-bold hover:text-gray-500"
        >
          Back
        </button>
        <div className="mx-auto container">
          <img
            style={{ height: "560px" }}
            src="/images/cart-man.png"
            alt="empty cart"
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
