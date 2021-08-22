import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const AdminSingleProduct = () => {
    const history = useHistory();
    
    const [product, setProduct] = useState();

    const params = useParams().id;

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData.role !== 'admin'){
            history.goBack();
            return;
        }
    },[])
    
    useEffect(() => {
        if(params.startsWith(' ')){
            history.goBack();
            return;
        }
        fetch(`/cosmo/api/v1/product/show/${params}`,{
            method: "GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then(res => res.json()).then(data => {
            if(data && data.success){
                setProduct(data.product);
            }else{
                window.alert(data.message);
                history.goBack();
                return;
            }
        })
    },[])

    return (
    product ? 
    <>
    <button onClick={ () => { history.goBack()}} className="ml-12 font-semibold">Back</button>
        <h1 className="ml-96  text-2xl font-light tracking-wider text-red-500">Product details</h1>
        <div className="container mx-auto w-1/2 bg-gray-50 p-4 shadow-md my-2 mb-6 text-gray-600">
            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">ratings</h1>
                <h1>{product && product.ratings}</h1>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">num Of Reviews</h1>
                <h1>{product && product.numOfReviews}</h1>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">product id</h1>
                <h1>{product && product._id}</h1>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">name</h1>
                <h1>{product && product.name}</h1>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">price</h1>
                <h1>{product && product.price}</h1>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">description</h1>
                <h1>{product && product.details}</h1>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">stock</h1>
                <h1>{product && product.stock}</h1>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">category</h1>
                <h1>{product && product.category}</h1>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">seller</h1>
                <h1>{product && product.seller}</h1>
            </div>

            <div className=" py-2 text-sm font-mono ">
                <h1 className="mr-28 text-gray-700">reviews</h1>
                {
                   product && product.reviews.map(review => {
                        return (<>
                        <div className=" py-4 ml-24">
                            <div className="flex items-center justify-between py-0.5">
                                <h1>review id</h1>
                                <h1>{review._id}</h1>
                            </div>

                            <div className="flex items-center justify-between py-0.5">
                                <h1>name</h1>
                                <h1>{review.name}</h1>
                            </div>

                            <div className="flex items-center justify-between py-0.5">
                                <h1>user id</h1>
                                <h1>{review.user}</h1>
                            </div>

                            <div className="flex items-center justify-between py-0.5">
                                <h1>rating</h1>
                                <h1>{review.rating}</h1>
                            </div>

                            <div className="flex items-center justify-between">
                                <h1>comment</h1>
                                <h1 className="text-right">{review.comment}</h1>
                            </div>
                         <hr className="my-1"/>
                        </div>
                        </>)
                    })
                }
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">images</h1>
                <div className="container mx-auto py-2">
                    {
                        product && product.images.map(image => {
                            return (<>
                            <div className="flex items-center justify-between">        
                                <h1 className="break-all">{image.url}</h1>
                            </div>
                            </>)
                        })
                    }
                </div>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">created At</h1>
                <h1>{product && product.createdAt.substr(0,10)}</h1>
            </div>
        </div>
        
    </>:<></>)
}

export default AdminSingleProduct
