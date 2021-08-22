import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const SingleOrder = () => {
    const history = useHistory();

    const params = useParams().id;

    const [order, setOrder] = useState({});

    const [userData, setUserData] = useState(JSON.parse(window.localStorage.getItem('userData')));

    useEffect(() => {
      const loginStatus = JSON.parse(window.localStorage.getItem('loginStatus'));

      if(loginStatus === 0){
          history.push('/')
          return;
      }
    },[]);

    useEffect(() => {
        if(params && params.startsWith(' ')){
            history.goBack()
            return;
        }
        fetch(`/cosmo/api/v1/order/show/${params}`,{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
        }).then(res => res.json()).then(data => {

            // console.log(data);
            if(data && data.success){
               setOrder(data.order);
            }else{
                window.alert(data.message);
                history.goBack();
                return;
            }
        })
    },[]);

    return (<>
        <div className="container mx-auto border">
           <h1 className="pt-5 text-lg ml-8 font-semibold tracking-wider">Order details</h1>
           <div className="md:m-12 m-8 w-96 text-gray-500 font-mono ">
               <div className="flex justify-between items-center my-1 ">
                  <h1 className="">Order id:</h1>
                  <h1>{order._id}</h1>
               </div>

               <div className="flex justify-between items-center my-1">
                  <h1>Order placed At:</h1>
                  <h1>{order.createdAt && order.createdAt.substr(0,10)}</h1>
               </div>

               <div className="flex justify-between items-center my-1">
                  <h1>Order placed by:</h1>
                  <h1>{userData.name}</h1>
               </div>

               <div className="flex justify-between items-center my-1">
                  <h1>Payment status:</h1>
                  <h1>{order.paymentInfo && order.paymentInfo.status}</h1>
               </div>

               <div className="flex justify-between items-center my-1">
                  <h1>Paid at:</h1>
                  <h1>{order.createdAt && order.createdAt.substr(0,10)}</h1>
               </div>

               <div className="flex justify-between items-center my-1">
                  <h1>Order status:</h1>
                  <h1>{order.orderStatus}</h1>
               </div>
           </div>
        </div>
        
        <button onClick={() => {history.goBack()}} className="font-semibold container mx-auto my-1">Back</button>
        </>
    )
}

export default SingleOrder
