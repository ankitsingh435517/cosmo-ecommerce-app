import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const MyOrders = () => {

    const history = useHistory();

    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        const loginStatus = JSON.parse(window.localStorage.getItem('loginStatus'));
  
        if(loginStatus === 0){
            history.push('/')
            return;
        }
      },[]);

    useEffect(() => {
        fetch('/cosmo/api/v1/orders/user/index', {
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include",
        }).then(res => res.json()).then(data => {
            if(data && data.success){
               setMyOrders(data.AllOrders);
            }
        })
    },[]);


    return (
    myOrders.length ? 
    <>
        <div className="container mx-auto">
            <h1 className="pt-6  text-xl tracking-wider">All Orders</h1>
            <div className="m-12">
                {
                    myOrders.map(order => {
                        return (<>
                                <div className="m-6 border p-4 md:flex items-center justify-between">
                                    <Link to={`/singleOrder/${order._id}`}>
                                    <button className="hover:text-red-500">{order._id}</button>
                                    </Link>
                                    <div className="flex">
                                        <h1 className="text-red-500 mr-4">placedAt:</h1>
                                        <span className="text-gray-500">{order.createdAt && order.createdAt.substr(0,10)}</span>
                                    </div>
                                    <div className="flex">
                                        <h1 className=" mr-4">status:</h1>
                                        <span className="text-yellow-300 animate-pulse">{order.orderStatus}</span>
                                    </div>
                                </div>
                             </>);
                    })
                }
                      
                           
            </div>
            <button onClick={ () => {history.goBack() }} className="font-semibold">Back</button>

        </div></>
        : <div className="flex container mx-auto mr-4">
              <button onClick={ () => {history.goBack() }} className="font-semibold">Back</button>
          <div className="flex container mx-auto  w-1/2">
              <h1 className="italic tracking-wider font-serif text-green-400 my-12 text-2xl ">No orders yet</h1>
          </div>
        </div>
    )
}

export default MyOrders;
