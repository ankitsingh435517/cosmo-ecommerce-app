import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const AddNewProduct = () => {
    const notify = () => {
        toast.info('Product added successfuly')
    }

    const notify_err = (message) => {
        toast.error(message);
      }
    const history = useHistory();

    const [product, setProduct] = useState();

    const params = useParams().id;

    const [isAdding, setIsAdding] = useState(false);

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

    const handleAddNewProduct = () => {
        setIsAdding(true);

        fetch('/cosmo/api/v1/product/new',{
             method:"POST",
             headers:{
                 Accept:"application/json",
                 "Content-Type":"application/json"
             },
             credentials:"include",
             body:JSON.stringify({
                 name,
                 price,
                 description,
                 stock,
                 category,
                 seller,
                 images
             })
         }).then(res => res.json()).then(data => {
            if(data && data.success){
                setIsAdding(false); 
                // console.log(data);
                notify()
            }else{
                notify_err(data.message);
            }
            
            // window.alert(data.message);
         })
    }
    return (
        <>
            <button onClick={ () => { history.goBack()}} className="ml-12 font-semibold">Back</button>
            <h1 className="md:ml-96 ml-12 my-4 md:text-2xl font-light tracking-wider text-green-600">Add product</h1>
            <div className="container mx-auto md:w-1/2 bg-green-100 p-4 shadow-sm my-2 mb-6 text-gray-600">
                <div className="flex py-2 text-sm font-mono items-center justify-between">
                    <h1 className="mr-28 text-gray-700">name</h1>
                    <input type="text" value={name} onChange={ (e) => { setName(e.target.value) } } className="md:w-96 p-2" placeholder="Enter product name"></input>
                </div>

                <div className="flex py-2 text-sm font-mono items-center justify-between">
                    <h1 className="mr-28 text-gray-700">price</h1>
                    <input type="text" value={price} onChange={ (e) => { setPrice(e.target.value) } } className="md:w-96 p-2" placeholder="Enter product price"></input>
                </div>

                <div className="flex py-2 text-sm font-mono items-center justify-between">
                    <h1 className="mr-28 text-gray-700">description</h1>
                    <input type="text" value={description} onChange={ (e) => { setDescription(e.target.value) } } className="md:w-96 p-2" placeholder="Enter product description"></input>
                </div>

                <div className="flex py-2 text-sm font-mono items-center justify-between">
                    <h1 className="mr-28 text-gray-700">stock</h1>
                    <input type="text" value={stock} onChange={ (e) => { setStock(e.target.value) } } className="md:w-96 p-2" placeholder="Enter product stock"></input>
                </div>

                <div className="flex py-2 text-sm font-mono items-center justify-between">
                    <h1 className="mr-28 text-gray-700">category</h1>
                    <input type="text" value={category} onChange={ (e) => { setCategory(e.target.value) } } className="md:w-96 p-2" placeholder="Enter product category"></input>
                </div>

                <div className="flex py-2 text-sm font-mono items-center justify-between">
                    <h1 className="mr-28 text-gray-700">seller</h1>
                    <input type="text" value={seller} onChange={ (e) => { setSeller(e.target.value) } } className="md:w-96 p-2" placeholder="Enter seller name"></input>
                </div>

                <div className="flex py-2 text-sm font-mono items-center justify-between">
                    <h1 className="mr-28 text-gray-700">images</h1>      
                    <input value={images} onChange={ (e) => { setImages(e.target.value) } } type="text" className="md:w-96 p-2" placeholder="Enter image url"></input>                    
                </div>
            </div>
            <div className="md:ml-80 pb-6">
            <button disabled={isAdding} onClick={ handleAddNewProduct } className="hover:bg-green-500 px-4 py-1 rounded-sm bg-green-400 text-white font-semibold text-sm ml-6 ">{isAdding ? 'Loading' : 'Add'}</button>
            </div>  
        </>
    )
}

export default AddNewProduct
