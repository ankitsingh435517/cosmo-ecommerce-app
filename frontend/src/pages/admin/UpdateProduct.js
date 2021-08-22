import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const UpdateProduct = () => {
    const notify_err = (message) => {
        toast.error(message);
      }

      const notify = () =>{
        toast.warn('Product updated successfuly')
    }
    const history = useHistory();

    const [product, setProduct] = useState();

    const params = useParams().id;

    const [isUpdating, setIsUpdating] = useState(false);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState('');

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
            console.log(data.product);
            if(data && data.success){
                setProduct(data.product);
            }else{
                window.alert(data.message);
                history.goBack();
                return;
            }
        })
    },[])

    
    

    const handleUpdateProduct = () => {
        // if(params.startsWith('')){
        //     history.goBack();
        //     return;
        // }
        setIsUpdating(true);

        fetch(`/cosmo/api/v1/product/update/${params}`,{
            method: "PUT",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                 name: name === '' ? product.name : name,
                 price: price === '' ? product.price : price,
                 description: description === '' ? product.description : description,
                 stock: stock === '' ? product.stock : stock,
                 category: category === '' ? product.category : category,
                 seller: seller === '' ? product.seller : seller,
                 images: images === '' ? product.images[0].url : images
            })
        }).then(res => res.json()).then(data => {
            setIsUpdating(false);
            console.log(data);
            if(data && data.success){
                notify();
                // window.alert('Product updated successfuly');
                setProduct(data.product);
            }else{
                // window.alert(data.message);
                // history.goBack();
                // return;
                notify_err(data.message);
            }
        })
    }
    return (
        <>
            <button onClick={ () => { history.goBack()}} className="ml-12 font-semibold">Back</button>
        <h1 className="ml-96  text-2xl font-light tracking-wider text-red-700">Update product</h1>
        <div className="container mx-auto w-1/2 bg-red-50 p-4 shadow-sm my-2 mb-6 text-gray-600">
            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">name</h1>
                <input type="text" value={name} onChange={ (e) => { setName(e.target.value) } } className="w-96 p-2" placeholder={product && product.name}></input>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">price</h1>
                <input type="text" value={price} onChange={ (e) => { setPrice(e.target.value) } } className="w-96 p-2" placeholder={product && product.price}></input>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">description</h1>
                <input type="text" value={description} onChange={ (e) => { setDescription(e.target.value) } } className="w-96 p-2" placeholder={product && product.description}></input>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">stock</h1>
                <input type="text" value={stock} onChange={ (e) => { setStock(e.target.value) } } className="w-96 p-2" placeholder={product && product.stock}></input>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">category</h1>
                <input type="text" value={category} onChange={ (e) => { setCategory(e.target.value) } } className="w-96 p-2" placeholder={product && product.category}></input>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">seller</h1>
                <input type="text" value={seller} onChange={ (e) => { setSeller(e.target.value) } } className="w-96 p-2" placeholder={product && product.seller}></input>
            </div>

            <div className="flex py-2 text-sm font-mono items-center justify-between">
                <h1 className="mr-28 text-gray-700">images</h1>      
                <input value={images} onChange={ (e) => { setImages(e.target.value) } } type="text" className="w-96 p-2" placeholder="Enter image url"></input>                    
            </div>
        </div>
        <div className="ml-80 pb-6">
           <button disabled={isUpdating} onClick={ handleUpdateProduct } className="hover:bg-yellow-500 px-4 py-1 rounded-sm bg-yellow-400 text-white font-semibold text-sm ml-6">{isUpdating ? 'Loading' : 'Update'}</button>
        </div>
        </>
    )
}

export default UpdateProduct
