import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const AllOrders = () => {
    const history = useHistory()

    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData.role !== 'admin'){
            history.goBack();
            return;
        }
    },[])
    
    useEffect(() => {
        fetch('/cosmo/api/v1/admin/orders/index', {
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include",
        }).then(res => res.json()).then(data => {
            if(data && data.success){
               setAllOrders(data.orders);
            }
        })
    },[]);
    return (
        
            allOrders.length ? 
    <>
        <div className="container mx-auto">
            <h1 className="pt-6  text-xl tracking-wider">All Orders</h1>
            <div className="m-12">
                {
                    allOrders.map(order => {
                        return (<>
                                <div className="m-6 border p-4 md:flex items-center justify-between">
                                    <Link to={`/singleOrder/${order._id}`}>
                                    <button className="w-48 hover:text-red-500">{order._id}</button>
                                    </Link>
                                    <div className="flex w-60">
                                        <h1 className="text-red-500 mr-4">placedAt:</h1>
                                        <span className="text-gray-500">{order.createdAt && order.createdAt.substr(0,10)}</span>
                                    </div>
                                    <div className="flex w-36">
                                        <h1 className=" mr-4">status:</h1>
                                        <span className="text-yellow-300 animate-pulse">{order.orderStatus}</span>
                                    </div>
                                </div>
                             </>);
                    })
                }
                      
                           
            </div>
            <button onClick={ () => {history.goBack() }} className="mb-2 font-semibold">Back</button>

        </div></>
        : <div className="flex container mx-auto mr-4">
              <button onClick={ () => {history.goBack() }} className="font-semibold">Back</button>
          <div className="flex container mx-auto  w-1/2">
              <h1 className="italic tracking-wider font-serif text-green-400 my-12 text-2xl ">No orders yet</h1>
          </div>
        </div>
        
    )
}

export default AllOrders
