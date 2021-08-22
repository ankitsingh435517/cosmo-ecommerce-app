import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData.role !== 'admin'){
            history.goBack();
            return;
        }
        fetch('/cosmo/api/v1/admin/orders/index',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then(res => res.json()).then(data => {
            if(data && data.success){
                setOrders(data.orders);
            }
        })
    },[]);

    return (
        <div className="container mx-auto pt-5 ">
            
            <div className="flex items-center tracking-wider ml-4 mb-1 text-4xl">
               <h1 className="mr-6  text-base -mb-4">Welcome,</h1>
               <h1 className="font-thin">John doe</h1>
            </div>
{/* <div className="border-pink-700 border-l-8">
<div className="border-pink-700 border-l-8">
<div className="border-pink-700 border-l-8"> */}
{/* <div className="border-pink-700 border-l-8"> */}
<div className="border-pink-700 border-l-8 rounded-t-sm rounded-b-sm">
            <div className="bg-pink-700 p-2 text-right rounded-r">
                <h1 className="font-semibold italic text-white text-xl mr-2 ">Dashboard</h1>
            </div>

            <div className="md:flex items-center my-6 justify-between px-6">
            <Link to="/admin/users"><button style={{height:'110px', width:'350px'}} className="my-4 rounded hover:bg-blue-600  items-center flex bg-blue-500">
                    <button className="mx-auto font-semibold text-xl text-white">users</button>
                </button></Link>
            <Link to="/admin/products"><button style={{height:'110px', width:'350px'}} className="my-4 rounded hover:bg-red-600 items-center flex bg-red-500">
                    <button className="mx-auto font-semibold text-xl text-white">products</button>
                </button></Link>
            <Link to="/admin/orders"><button style={{height:'110px', width:'350px'}} className="my-4 rounded hover:bg-yellow-600 items-center flex bg-yellow-500">
                    <button className="mx-auto font-semibold text-xl text-white">orders</button>
                </button></Link>
                
            </div>

            <div className="container mx-auto pt-4">
               <h1 className="font-semibold text-lg ml-6">Recent orders</h1>
               <div className="my-4">
                   

            {
                 orders.map(order => {
                     return( <>
                                    <div className="my-4 border p-3 md:flex items-center justify-between text-sm tracking-wider">
                                        <Link to={`/singleOrder/${order._id}`}>
                                        <button className="hover:text-red-500 w-40 tracking-wider text-yellow-500">{order._id}</button>
                                        </Link>
                                        
                                        <div className="flex 40">
                                            <span className="text-red-500 mr-4 text-left">user:</span>
                                            <span className="text-gray-500">{order.user}</span>
                                        </div>
                                        <div className="flex w-42">
                                            <span className="text-red-500 mr-4 text-left">placedAt:</span>
                                            <span className="text-gray-500">{order.createdAt && order.createdAt.substr(0,10)}</span>
                                        </div>
                                        <div className="flex w-48">
                                            <span className="text-red-500 mr-4 text-left">order status:</span>
                                            <span className="text-yellow-400">{order.orderStatus}</span>
                                        </div>
                                        
                                        <div className="flex w-52">
                                            <span className="text-red-500 mr-4 text-left">payment status:</span>
                                            <span className="text-green-500">{order.paymentInfo && order.paymentInfo.status}</span>
                                        </div>
                                    </div>
                </>) })
            }

                
               </div>
            </div>
        </div></div>
        // </div>
    )
}

export default Dashboard
