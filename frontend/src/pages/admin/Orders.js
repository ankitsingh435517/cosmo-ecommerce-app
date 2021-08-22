import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Orders = () => {
  const history = useHistory();

  const [getOrder, setGetOrder] = useState("");

  const [updateOrder, setUpdateOrder] = useState("");

  const [deleteOrder, setDeleteOrder] = useState("");

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    if(userData.role !== 'admin'){
        history.goBack();
        return;
    }
  },[])

  const handleDeleteOrder = () => {
    fetch(`/cosmo/api/v1/admin/order/delete/${deleteOrder}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert(data.message);
      });
  };

  return (
    <>
      <h1 className="mt-12 text-lg tracking-wider font-semibold ml-12">
        Order settings
      </h1>
      <div className="container bg-gray-50  w-full mx-auto md:p-6 md:flex items-center  text-center my-2 pt-8">
        
        
        <div
          style={{ height: "200px", width: "450px" }}
          className="container font-semibold text-lg tracking-wider mx-auto md:border-r border-b border-yellow-400"
        >
          <h1 className="text-yellow-400">Update</h1>
          <div className="mt-14 flex items-center ml-8 mr-4">
            <input
              type="text"
              value={updateOrder}
              onChange={(e) => {
                setUpdateOrder(e.target.value);
              }}
              className="w-72 px-3 py-0.5 mr-4 border rounded focus:ring-2 focus:ring-yellow-600 outline-none font-mono font-thin tracking-wider"
              placeholder="Enter order id:"
            ></input>
            <Link
              to={
                updateOrder === ""
                  ? "/admin/orders"
                  : `/admin/updateOrder/${updateOrder}`
              }
            >
              <button className="px-6 py-1.5 hover:bg-yellow-600 bg-yellow-500 rounded text-white font-semibold text-sm">
                update
              </button>
            </Link>
          </div>
        </div>
        
        <div
          style={{ height: "200px", width: "450px" }}
          className="container  font-semibold text-lg tracking-wider mx-auto md:border-r border-b border-yellow-400"
        >
          <h1 className="text-yellow-400">Show all</h1>
          <Link to="/admin/allOrders">
            <button className=" mt-14 px-12 py-1.5 hover:bg-yellow-600 bg-yellow-500 rounded text-white font-semibold text-sm">
              show all
            </button>
          </Link>
        </div>

        <div
          style={{ height: "200px", width: "450px" }}
          className=" font-semibold text-lg tracking-wider mx-auto  sm:border-b border-yellow-400"
        >
          <h1 className="text-red-500">Delete</h1>
          <div className="mt-14 flex items-center ml-8 mr-4">
            <input
              type="text"
              value={deleteOrder}
              onChange={(e) => {
                setDeleteOrder(e.target.value);
              }}
              className="w-72 px-3 py-0.5 mr-4 border rounded focus:ring-2 focus:ring-red-600 outline-none font-mono font-thin tracking-wider"
              placeholder="Enter order id:"
            ></input>
            <button
              onClick={handleDeleteOrder}
              className="px-6 py-1.5 hover:bg-red-600 bg-red-500 rounded text-white font-semibold text-sm"
            >
              delete
            </button>
          </div>
        </div>
       
        
      </div>
      <button
        onClick={() => {
          history.goBack();
        }}
        className="ml-12 font-semibold"
      >
        Back
      </button>
    </>
  );
};

export default Orders;
