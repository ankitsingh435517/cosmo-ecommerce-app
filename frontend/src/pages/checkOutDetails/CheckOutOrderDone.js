import React, {useContext, useState, useEffect } from 'react';
import { CheckOutSteps } from '../../components'
import { useHistory } from 'react-router';
import { CartContext } from '../../Contexts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();


const CheckOutOrderDone = () => {
    const notify = () => {
        toast.info('Order placed successfuly');
      }
      
    const notify_err = () => {
        toast.error('Something went wrong');
      }
      
    const history = useHistory();

    const _checkOutDetails = JSON.parse(window.localStorage.getItem('checkOutDetails'));

    const [isOrderInitiated, setIsOrderInitiated] = useState(true);

    const [shippingInfo, setShippingInfo] = useState(_checkOutDetails.step1_shippingInfo);

    const [orderDetails, setOrderDetails] = useState(_checkOutDetails.step2_orderDetails);

    const [paymentInfo, setPaymentInfo] = useState(_checkOutDetails.step3_paymentInfo);

    const { setCart } = useContext(CartContext);

    useEffect(() => {
        const loginStatus = JSON.parse(window.localStorage.getItem('loginStatus'));
        if(loginStatus === 0){
            history.push('/');
            return;
        }
        
        const _isOrderInitiated = JSON.parse(window.localStorage.getItem('isOrderInitiated'));

        if(_isOrderInitiated === 0){
            setIsOrderInitiated(false);
            history.push('/');
            return;
        }
    },[]);
    
    const finishCheckout = () => {
        const { itemsTotal, totalAmount, shippingPrice } = orderDetails;

        fetch('/cosmo/api/v1/order/new', {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            // credentials:"include",
            body:JSON.stringify({
                shippingInfo,
                orderItems:orderDetails.orderItems,
                paymentInfo,
                shippingPrice,
                taxPrice:0.75,
                itemsPrice: itemsTotal,
                totalPrice: totalAmount
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            if(data && data.success){
                // window.alert('Order placed successfuly');
                notify();
            }else{
                notify_err();
            }
        })

// set to default
        setCart({});

        window.localStorage.setItem('cartItems', JSON.stringify({}))
        window.localStorage.setItem('cart', JSON.stringify({}))

        window.localStorage.setItem('checkOutDetails', JSON.stringify({}))
        window.localStorage.setItem('checkOutSteps', JSON.stringify({}))
        
        window.localStorage.setItem('isOrderInitiated', JSON.stringify(0));
        history.push('/');    
    }

    const getItemQty = (itemId) => {
        return orderDetails.otherDetails.items && orderDetails.otherDetails.items[itemId]
    }

    const getItemTotal = (itemPrice, itemId) => {
        const itemTotal = Number(getItemQty(itemId) * itemPrice);
        // console.log(itemTotal);
        return itemTotal;
    }

    return (
    isOrderInitiated ?
    <>
            <CheckOutSteps />
            <button onClick={() => {history.goBack()}} className="my-6 font-semibold mx-12">Back</button>    

            <div className="my-12 container mx-auto md:w-1/2 border py-6 shadow-lg rounded pr-12">
                <div className="container mx-auto w-96 ">
                    <h1 className="font-mono mb-8 tracking-wider text-center text-lg">Order summary</h1>
                    <h1 className="font-semibold my-4">Shipping:</h1>
                        <div className="ml-16 text-sm tracking-wider text-gray-700">
                            <div className="flex items-center align-items justify-between">
                                <h1 className="text-sm tracking-wider text-red-700">Address:</h1>  
                                <span className="ml-28 text-gray-700">{shippingInfo.address}</span>
                            </div>

                            <div className="flex items-center align-items justify-between ">
                                <h1 className="text-sm tracking-wider text-red-700">Postal code:</h1>  
                                <span className="ml-24 text-gray-700">{shippingInfo.postalCode}</span>
                            </div>

                            <div className="flex items-center align-items justify-between ">
                                <h1 className="text-sm tracking-wider text-red-700">Phone number:</h1>
                                <span className="ml-16 text-gray-700">{shippingInfo.phoneNumber}</span>
                            </div >

                            <div className="flex items-center align-items justify-between ">
                                <h1 className="text-sm tracking-wider text-red-700">City:</h1>
                                <span className="ml-36 text-gray-700">{shippingInfo.city}</span>
                            </div>

                            <div className="flex items-center align-items justify-between ">
                                <h1 className="text-sm tracking-wider text-red-700">Country:</h1>
                                <span className="ml-28 text-gray-700">{shippingInfo.country}</span>
                            </div>
                        </div>
                    
                    <hr className="my-4"/>

                    <h1 className="font-semibold my-4">Order details:</h1>
                        <div className="ml-16 my-3">
                            {
                                orderDetails.orderItems.map(item => {
                                    return (<>
                                           <div className="flex items-center my-2 justify-between">
                                               <div className="text-left">
                                                <img style={{height:'55px'}} src={item.images && item.images[0].url} alt={item.name} />
                                               </div>
                                                <div className="text-right text-sm ml-4 py-3 text-sm  text-gray-700">
                                                    <h1 className="my-1 text">{item.name}</h1>
                                                    <span className="">qty: {getItemQty(item._id)}</span>
                                                    <span className="ml-12">price: { getItemQty(item._id) } x {item.price} = { getItemTotal(item.price, item._id) }</span>
                                                </div>
                                           </div>
                                        </>)
                                })
                            }

                            <h1 className="mt-4 text-right mr-1">total amount: <span>{orderDetails.otherDetails.totalAmount }</span></h1>
                        </div>

                    <hr className="my-4"/>

                    <h1 className="font-semibold">Payment: </h1>
                    <div className="ml-16 my-4 text-sm tracking-wider text-gray-700">
                        <div className="flex items-center justify-between">
                            <h1 className="text-sm">method:</h1> 
                            <span className="ml-16 ">{paymentInfo.method === 'COD' ? 'cash on delivery' : 'paid with card'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-sm ">status:</h1> 
                            <span className={`${paymentInfo.method === 'CARD' ? 'text-green-500' : ''} ml-20`}>{paymentInfo.status}</span>    
                        </div>
                        <div className="flex items-center justify-between">
                            {
                                paymentInfo.method === 'CARD' ? 
                                <><h1 className="text-sm">payment-id:</h1>
                                <span className="">{paymentInfo.id}</span></> : <></>
                            }
                        </div>
                    </div>    
 
                </div>

                <div className="ml-2.5 pt-4 mb-4">
                    <button onClick={ finishCheckout } className="hover:bg-red-600 py-0.5 w-80 ml-14 md:ml-44  font-semibold text-white bg-red-500 rounded">Done</button>
                </div>
            </div>
        </>:<></>
    )
}

export default CheckOutOrderDone
