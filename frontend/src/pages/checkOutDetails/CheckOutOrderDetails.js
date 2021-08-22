import React, { useState, useEffect } from 'react';
import { CheckOutSteps } from '../../components'
import { Link, useHistory } from 'react-router-dom'

const CheckOutOrderDetails = () => {
    const history = useHistory();

    let itemsTotal = 0;
    let grandTotal = 0.75;
    let shippingPrice = 0;

    const [orderItems, setOrderItems] = useState([]);
    
    const [otherDetails, setOtherDetails] = useState({});

    useEffect(() => {
        const loginStatus = JSON.parse(window.localStorage.getItem('loginStatus'));
        if(loginStatus === 0){
            history.push('/');
            return;
        }
        
        const isOrderInitiated = JSON.parse(window.localStorage.getItem('isOrderInitiated'));

        if(isOrderInitiated === 0){
            history.push('/');
            return;
        }
    },[]);
    
    useEffect(() => {
       const _checkOutDetails = JSON.parse(window.localStorage.getItem('checkOutDetails'));
       
       if(_checkOutDetails.step2_orderDetails && _checkOutDetails.step2_orderDetails.otherDetails.totalAmount){
           return;
       }
       
       const cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
       const _cart = JSON.parse(window.localStorage.getItem('cart'));

       _checkOutDetails.step2_orderDetails.orderItems = [...cartItems];

       _checkOutDetails.step2_orderDetails.otherDetails = {..._cart}

       window.localStorage.setItem('checkOutDetails', JSON.stringify(_checkOutDetails));

       setOrderItems(_checkOutDetails.step2_orderDetails.orderItems);
       setOtherDetails(_checkOutDetails.step2_orderDetails.otherDetails);

    },[])

    useEffect(() => {
       const _checkOutDetails = JSON.parse(window.localStorage.getItem('checkOutDetails'));

       setOrderItems(_checkOutDetails.step2_orderDetails.orderItems);
       setOtherDetails(_checkOutDetails.step2_orderDetails.otherDetails);
    },[])

    const proceedToPaymentInfo = () => {
        const _checkOutSteps = JSON.parse(window.localStorage.getItem('checkOutSteps'));

        _checkOutSteps.step2_orderDetails = 'disable';
        _checkOutSteps.step3_paymentInfo = 'active';

        window.localStorage.setItem('checkOutSteps', JSON.stringify(_checkOutSteps));

       const _checkOutDetails = {...JSON.parse(window.localStorage.getItem('checkOutDetails'))};

       _checkOutDetails.step2_orderDetails.otherDetails.totalAmount = grandTotal;
       _checkOutDetails.step2_orderDetails.otherDetails.itemsTotal = itemsTotal;
       _checkOutDetails.step2_orderDetails.otherDetails.shippingPrice = shippingPrice;

       window.localStorage.setItem('checkOutDetails', JSON.stringify(_checkOutDetails));

    }

    const getItemQty = (itemId) => {
        return otherDetails.items && otherDetails.items[itemId]
    }

    const getItemTotal = (itemPrice, itemId) => {
        const itemTotal = Number(getItemQty(itemId) * itemPrice);
        // console.log(itemTotal);
        itemsTotal += itemTotal;
        grandTotal += itemTotal;
        return itemTotal;
    }

    const getShippingPrice = (itemsTotal) => {
        const _shippingPrice = itemsTotal < 500 ? 18.50 : 0;
        grandTotal += _shippingPrice;
        shippingPrice = _shippingPrice;
        return _shippingPrice;
    }

    return (
        <>
           <CheckOutSteps /> 
               <button onClick={() => {history.goBack()}} className="my-6 font-semibold mx-12">Back</button>    
               <hr className="my-16"/>
           <div className="container mx-auto md:flex">
               <div className="container md:w-1/2 md:border-r md:-mt-16 mb-20">
                   <h1 className="text-2xl font-mono tracking-wider md:pt-9 pb-3">Order Items</h1>
                   {
                       orderItems.map(item => {
                           return (<>
                                <div className="my-3 border px-4 mr-6">
                                    <div className="flex items-center m-2">
                                        <img style={{ height: '40px'}} src={item.images && item.images[0].url} alt={item.name} />
                                        <div className="mx-6">
                                            <h1 className="font-semibold tracking-wider">{item.name}</h1>
                                            <div className="flex">
                                            <span className="font-mono text-gray-600 text-sm">qty: { getItemQty(item._id) }</span>
                                            <span className=" text-sm font-mono text-gray-600 md:ml-12 ml-4">price: { getItemQty(item._id) } x {item.price} = { getItemTotal(item.price, item._id) }</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           
                           </>)
                       })
                   }

               </div>
               <div className="container mx-auto md:w-1/2">
                   <div className="ml-16 -mt-8 border-t w-64 pt-2 pl-2 pr-2 pb-1">
                        <h1 className="font-semibold tracking-wider text-lg">Price details</h1>
                        {/* <hr className="my-2"/> */}
                        <div className="flex my-4">
                            <h1 className="mr-20 text-sm font-mono tracking-wider">Total MRP </h1>
                            <span className="text-sm font-mono tracking-wider">Rs {itemsTotal}</span>
                        </div>
                        
                        <div className="flex my-4">
                            <h1 className="mr-6 text-sm font-mono tracking-wider">Shipping price </h1>
                            <span className="text-sm ml-12 text-right font-mono tracking-wider">Rs { getShippingPrice(itemsTotal) }</span>
                        </div>
                        <div className="flex my-4">
                            <h1 className="mr-8 text-sm font-mono tracking-wider">Tax price </h1>
                            <span className="text-sm ml-14 font-mono tracking-wider">Rs 0.75</span>
                        </div>
                        
                        <hr className="my-2"/>
                        <h1 className="text-sm font-mono tracking-wider py-2">Total Amount: <span className="ml-6 my-2 ">Rs {grandTotal}</span></h1>
                        {/* <h1 className="text-sm font-mono text-gray-500 pt-2 -pb-2">* tax is not included yet</h1> */}
                   </div>
                   <div className="text-center md:-ml-64">
                        <Link to="/paymentInfo">
                            <button onClick={ proceedToPaymentInfo } className="px-24 py-2 font-semibold hover:shadow-sm border text-white  bg-red-500 hover:bg-red-600">continue</button>
                        </Link>
                   </div>
               </div>
           </div>  
        </>
    )
}

export default CheckOutOrderDetails
