import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CartContext } from '../Contexts';
import { ProductReview } from '../components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();


const SingleProduct = () => {
    const CustomToast = () => (<>
        <div className="flex items-center">
          <img style={{height:'30px', width:'30px'}} src={product.images[0].url}/>
          <h1 className=" ml-2 text-sm">{product.name.substr(0,20)}...</h1>
        </div>
        <div className="">
          <h1 className="text-sm">Item added to cart</h1>
        </div>
     </>)

    const notify = () => {
        toast(<CustomToast  />)
    }
    const params = useParams();

    const history = useHistory();

    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`/cosmo/api/v1/product/show/${params.id}`)
        .then(res => res.json())
        .then(data => {
            setProduct(data.product);
        })
    },[]);
    
    const { cart, setCart } = useContext(CartContext);

    const [isAdding, setisAdding] = useState(false);

    const addToCart = (productId) => {

        // console.log(cart.items[productId]);

        if(cart.items && cart.items[productId] >= product.stock){
            return;
        }

        const _cart = {...cart};
        
        if(!_cart.items){
            _cart.items = {}
        }

        if(!_cart.items[productId]){
            _cart.items[productId] = 1;
        }else{
            _cart.items[productId] += 1;
        }

        if(!_cart.totalItems){
            _cart.totalItems = 0;
        }

        _cart.totalItems += 1;
        setCart(_cart);
        setisAdding(true);
        setTimeout(() => {
            setisAdding(false); 
        }, 1000);
        // console.log(_cart);
        notify();
    }
    return (
        <>
         
        <button onClick={ () => { history.goBack() }} className="hover:text-gray-600 font-bold mx-12 mt-4">Back</button>
        <div className="container mx-auto mt-4 md:flex ">
            <img style={{ width: '650px', height: '500px' }} src={ product.images && product.images[0].url } alt={ product.name } />
            <div className="right ml-24 ">
                <div className="name">
                    <h1 className="font-semibold text-xl">{ product.name }</h1>
                    <div className="mt-2">
                        <h6 className="text-md">4 from 108 ratings</h6>
                        <span>
                            <i class="fas fa-star text-yellow-400 text-xs"></i>
                            <i class="fas fa-star text-yellow-400 text-xs"></i>
                            <i class="fas fa-star text-yellow-400 text-xs"></i>
                            <i class="fas fa-star text-yellow-400 text-xs"></i>
                            <i class="far fa-star text-gray-400 text-xs"></i>
                        </span>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="add">
                    <h1 className="text-xl mb-2 font-semibold">Rs. <span className="tracking-wider font-mono font-thin">{product.price}</span></h1>
                    <h3 className={`${product.stock > 0 ? 'text-green-700' : 'text-yellow-500'} ml-2`} >{product.stock > 0 ? 'in Stock' : 'Out of stock'}</h3>
                    {
                        product.stock > 0 ? 
                        <button disabled={isAdding} onClick={ () => { addToCart(product._id) } } className={`${isAdding ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600' }   my-2 px-4 py-1 rounded-full text-white font-semibold `}>{isAdding ? 'Added to cart' : 'Add to cart' }</button>
                        : <></>
                    }
                </div>
                <hr className="my-2"/>
                <div className="details">
                    <h1 className="font-semibold text-lg">Product details</h1>
                    <div className="my-2">
                        <p className="text-gray-700 leading-7 tracking-wider overflow-clip">{ product.description }</p>
                    </div>
                </div>
                <hr className="my-4"/>
                <ProductReview product={product} key={product._id}/>
            </div>
        </div>
    
        </>
    )
}

export default SingleProduct
