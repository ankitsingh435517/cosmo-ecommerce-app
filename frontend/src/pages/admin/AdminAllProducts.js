import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const AdminAllProducts = () => {
    const history = useHistory()

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData.role !== 'admin'){
            history.goBack();
            return;
        }
        fetch('/cosmo/api/v1/products/trending/index', {
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include",
        }).then(res => res.json()).then(data => {
            if(data && data.success){
               setAllProducts(data.products);
            }
        })
    },[]);
    return (
        <div className="container mx-auto">
            <h1 className="pt-6  text-xl tracking-wider">All Products</h1>
            <div className="m-12">
                {
                    allProducts.map(product => {
                        return (<>
                                <div className="md:m-6 m-3 border p-4 md:flex items-center justify-between">
                                    <Link to={`/admin/singleProduct/${product._id}`}>
                                    <button className="w-36 hover:text-red-500">{product._id}</button>
                                    </Link>
                                    <div className="flex md:w-96">
                                        <h1 className="text-red-500 mr-4">name</h1>
                                        <span className="text-gray-500">{product && product.name}</span>
                                    </div>
                                    <div className="flex w-8">
                                        <h1 className=" mr-4">stock:</h1>
                                        <span className="text-yellow-500 ">{product.stock}</span>
                                    </div>
                                    <Link to={`/admin/singleProduct/${product._id}`}>
                                    <button className="md:w-16 hover:text-red-600 text-red-500">details</button>
                                    </Link>
                                </div>
                             </>);
                    })
                }
                      
                           
            </div>
            <button onClick={ () => {history.goBack() }} className="mb-2 font-semibold">Back</button>

        </div>
    )
}

export default AdminAllProducts
