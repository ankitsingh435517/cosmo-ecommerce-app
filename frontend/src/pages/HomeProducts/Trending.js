import React, { useState, useEffect } from 'react';
import { Product } from '../../components';

const Trending = () => {
    const[products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/cosmo/api/v1/products/trending/index')
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setProducts(data.products)
        })
    },[])

    // console.log(products);

    return (
        <div className="container mx-auto my-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                
                {
                    products.map(product => <Product key={product._id} product={ product } />)
                }

            </div>
        </div>
    )
}

export default Trending;