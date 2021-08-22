import React from 'react'
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <Link to={`singleProduct/${product._id}`}>
            <div className="border p-3 text-sm md:text-base">
                <img  style={{ height: '220px' }} className="mx-auto" src={ product.images[0].url } alt={ product.name }/>
                <div className="text-center mt-4">
                    <h2 className=" font-semibold  mb-2 hover:text-red-500">{ product.name }</h2>
                    <span className="text-md">₹{ product.price }</span>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm">
                    {/* <span>4 from 12</span> */}
                    <div class="">
                        <i class="fas fa-star text-yellow-400 text-xs"></i>
                        <i class="fas fa-star text-yellow-400 text-xs"></i>
                        <i class="fas fa-star text-yellow-400 text-xs"></i>
                        <i class="fas fa-star text-yellow-400 text-xs"></i>
                        <i class="far fa-star text-gray-400 text-xs"></i>
                    </div>
                    <button className="text-sm font-semibold text-red-500 text-md hover:text-red-400">details</button>
                </div>
           </div>
        </Link>
    )
}

export default Product
