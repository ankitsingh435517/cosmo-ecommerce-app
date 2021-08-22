import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const ProductReview = ({ product }) => {
    const notify = () => {
        toast.warn('Product review added successfuly');
    }

    const notify_delete = () => {
        toast.warn('Product review deleted successfuly');
    }

    const notify_err = () => {
        toast.error('Something went wrong');
      }

    const productId = useParams().id;

    const [userData, setUserData] = useState({});

    const [isadding, setisadding] = useState(false);

    const [issaved, setissaved] = useState(false);

    const [reviews, setreviews] = useState([]);

    const [rating, setrating] = useState(0);

    const [comment, setcomment] = useState('');

    const [isupdated, setisupdated] = useState(false);

    const [isverified, setisverified] = useState(0);

    useEffect(() => {
        setisverified(JSON.parse(window.localStorage.getItem('loginStatus')));
        setUserData(JSON.parse(window.localStorage.getItem('userData')));
    },[])

    useEffect(() => {
       fetch(`/cosmo/api/v1/product/reviews/index?productId=${productId}`)
       .then(res=> res.json()).then(data => {
           if(data && data.success){
            //    console.log(data.AllReviews)
               setreviews(data.AllReviews);
           }
       })
    },[]);

    useEffect(() => {
        fetch(`/cosmo/api/v1/product/reviews/index?productId=${productId}`)
        .then(res=> res.json()).then(data => {
            if(data && data.success){
                // console.log(data.AllReviews)
                setreviews(data.AllReviews);
            }
        })
     },[isupdated]);

    const addNewReview = () => {
        if(isadding)
            setisadding(false);
        else
            setisadding(true);
    }

    const saveReview = () => {

        if(!rating && !comment){
            window.alert('Rating and comment can not be empty');
            return;
        }
        
        if(!rating || !comment){
            window.alert('Rating or comment can not be empty');
            return;
        }

        fetch('/cosmo/api/v1/product/review/new', {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include",
            body: JSON.stringify({ rating, comment, productId })
        }).then(res =>  res.json()).then(data => {
            if(data && data.success){
                setisupdated(false); 
                setisupdated(true);
                // window.alert(data.message);
                notify()
            }else{
                notify_err();
            }
        })


        setisadding(false);
        
        setissaved(true);
        setTimeout(() => {
            setissaved(false);
        },2300)
    }
    
    const handleCancel = () => {
        setisadding(false);
    }

    const handleDeleteReview = () => {
        fetch(`/cosmo/api/v1/product/review/destroy?productId=${product._id}`,{
            method:"DELETE",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then(res => res.json()).then(data => {
            if(data && data.success){
                setisupdated(false); 
                setisupdated(true);
                notify_delete()
            }else{
                notify_err();
            }
            // console.log(data);
            // window.alert(data.message);
        })
    }
    return (
        <div className="md:container md:mx-auto mt-4">
            <h1 className="font-semibold text-lg">Product ratings</h1>
            <div className="mx-4 my-2">
                <span className="text-5xl font-thin text-gray-800">{ product.ratings }</span>
                <i class="fas fa-star text-green-600 text-s mx-2"></i>
            </div>
                <h6 className="font-mono text-sm text-gray-700">Based on customer ratings</h6>
            <hr className="my-4"/>

            <h1 className="font-semibold text-lg mb-3">Customer reviews</h1>

            {
                isverified ? 
                <button disabled={issaved} onClick={ addNewReview } className={`${issaved ? 'bg-green-400 text-white font-semibold transition-colors duration-500 ease-in-out' : 'bg-gray-100' } px-2 py-1 my-2 rounded-full text-sm font-thin hover:bg-gray-200`}>{issaved ? 'Added new review' : 'Add new review'}
                {issaved ? 
                 <i className="fas fa-check text-white ml-4"></i>
                :<i className="fas fa-edit text-gray-500 ml-4"></i> 
                }
                </button>
                : <></> 
            }
                {isadding ? 
             <div className="bg-gray-50 my-2 py-2 pl-3 ">
                    <div className="flex mb-4">
                        <h1 className="text-sm tracking-wider text-gray-800">How do you rate this product ? </h1>
                        <input type="number" min="0" max="5" value={rating} onChange={ (e) => {setrating(e.target.value)}} className="ml-9 bg-yellow-50 focus:outline-none border shadow-inner pl-2"></input>
                    </div>
                    <div >
                        <h1 className="mb-2 text-sm tracking-wider text-gray-800">What do you feel about this product ? </h1>
                       <div className=" pb-1">
                            <textarea cols="60" type="input" value={comment} onChange={ (e) => {setcomment(e.target.value)}} placeholder="Write here." className="p-2 mb-2 focus:outline-none md:w-96 w-64"></textarea>
                            <div className="md:-ml-9">
                            <button onClick={ handleCancel } className="md:-mb-10 md:mr-2 md:ml-80 font-semibold px-1 bg-gray-400 hover:bg-gray-500 text-white rounded">cancel</button>
                            
                            <button onClick={ saveReview } className="-mb-10 ml-2 md:ml-0 font-semibold px-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded">save</button>
                            </div>
                       </div>
                    </div>
             </div> : <></>}
            

            {
                isverified ? 
                <h1 className="font-light tracking-wider mb-4 mt-4 text-xl text-red-500">Other customer's review</h1>
                : <></> 
            }
            <div className="my-4 mx-2">

                {
                    reviews.length ?
                    reviews.map((review) => {
                        return ( <> 
                        <div className="my-6">
                            <div className="flex">
                                <div style={{height: '19px', width:'21px'}} className="text-white ml-1 pl-0.5 text-sm bg-green-500">
                                {review.rating}
                                </div>
                                <div className="ml-4 -mt-1 text-gray-500 text-sm font-mono leading-7 tracking-wider overflow-clip">{ review.comment }
                                </div>
                            </div>
                            <div className="flex items-center">
                                <h1 className=" md:my-1 md:mx-4 text-sm text-gray-500">- By : </h1>
                                <em className="ml-2 text-yellow-500 text-sm font-thin">{ review.name }</em>
                                {
                                    isverified ? 
                                    review.user.toString() === userData._id.toString() ? 
                                    <button onClick={ handleDeleteReview } className="text-sm ml-52 md:ml-96 text-gray-400 hover:text-red-400 "><i className="fa fa-trash" aria-hidden="true"></i></button>:<></>
                                    : <></>
                                }
                            </div>
                        </div>
                        </>)
                    })
                    : <h1 className="text-yellow-700 tracking-wider">No reviews yet ! <i className="ml-2 far fa-frown-open text-red-500"></i></h1>
                }
            </div>
            
            <hr className="my-4" />

            <h1 className="font-semibold text-red-700 mr-2 ml-1 my-4">Seller: <span className="font-thin text-gray-600 font-serif ml-2 tracking-wider">{product.seller}</span></h1>

        </div>
    )
}

export default ProductReview
