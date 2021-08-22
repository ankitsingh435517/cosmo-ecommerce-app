import React, {useEffect, useState} from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { Product } from '../components';

const SearchProducts = () => {
    const history = useHistory();

    const [products, setProducts] =useState([]);

    // const params = useParams.id;
    // console.log(useParams);

    const search = useLocation().search;
    const keyword = new URLSearchParams(search).get('keyword');

    // console.log(search)
    console.log(keyword);

    useEffect(() => {
        // if(keyword.startsWith('')){
        //     return;
        // }
       fetch(`/cosmo/api/v1/products/trending/index?keyword=${keyword}`,{
           method:"GET",
           headers:{
               Accept:"application/json",
               "Content-Type":"application/json"
           },
           credentials:"include"
       }).then(res => res.json()).then(data => {
           console.log(data)
           if(data && data.success){
               setProducts(data.products);
           }
       })
    },[keyword]);
    return (
        products.length ?
        <div className="container mx-auto my-3">
            <div className="grid grid-cols-4 gap-5">
                
                {
                    products.map(product => <Product key={product._id} product={ product } />)
                }

            </div>
        </div>
        : <div className="container mx-auto w-1/2 pt-28 text-center">
            <i className="text-8xl text-green-400 fas fa-frown"></i>
            <h1 className="text-lg font-semibold text-gray-400 my-8 tracking-wider">Looks like there are not much products to show</h1>
            <button onClick={(e) => {e.preventDefault(); history.goBack()}} className="font-semibold my-4 text-gray-700">Back</button>
        </div>
    )
}

export default SearchProducts
