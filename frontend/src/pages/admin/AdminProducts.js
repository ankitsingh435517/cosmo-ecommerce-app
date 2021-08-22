import React, {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';

const AdminProducts = () => {
    const history = useHistory();
    
    const [getProduct, setGetProduct] = useState('');

    const [updateProduct, setUpdateProduct] = useState('');

    const [deleteProduct, setDeleteProduct] = useState('');

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData.role !== 'admin'){
            history.goBack();
            return;
        }
    },[])
    
    const handleDeleteProduct = () => {
        if(deleteProduct.startsWith(' ')){
            window.alert('Enter product id')
            return;
        }
        fetch(`/cosmo/api/v1/product/delete/${deleteProduct}`,{
            method:"DELETE",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then(res => res.json()).then(data => {
            window.alert(data.message);
        })
    }
    

    return (
        <div className="container ml-12 py-6">
            <h1 className="text-gray-600 tracking-wider ml text-lg">Product settings</h1>
            <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12 my-6 mb-12 font-semibold text-lg tracking-wider  text-center">
                <div className="bg-red-50 p-6">
                    <h1 className="text-green-400">add</h1>
                    <div className="pt-6 font-mono font-thin text-sm">
                        <h1 className="text-gray-400 tracking-wider ">Add new product</h1>
                        <Link to="/admin/addNewProduct">
                            <button className="hover:bg-red-500 my-2 px-4 py-1 rounded bg-red-400 text-sm font-semibold text-white">add</button>
                        </Link>
                    </div>
                </div>
                <div className="bg-red-50 p-6">
                    <h1 className="text-blue-600">show</h1>
                    <div className="pt-6 font-mono font-thin text-sm">
                        <h1 className="text-gray-400 tracking-wider ">Show all products</h1>
                        <Link to="/admin/allProducts">
                            <button className="hover:bg-red-500 my-2 px-4 py-1 rounded bg-red-400 text-sm font-semibold text-white">show all</button>
                        </Link>
                    </div>
                </div>
                <div className="bg-red-50 p-6">
                    <h1 className="text-blue-600">show</h1>
                    <div className="pt-12 font-mono font-thin text-sm">
                        <input type="text" value={getProduct} onChange={(e) => {setGetProduct(e.target.value)} } className="px-2 py-1.5 text-gray-600 outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter produt id:"></input>
                        <Link to={getProduct === '' ? '/admin/products' : `/admin/singleProduct/${getProduct}`}>
                            <button className="hover:bg-red-500 ml-3 px-4 py-1 rounded bg-red-400 text-sm font-semibold text-white">show</button>
                        </Link>
                    </div>
                </div>
                <div className="bg-red-50 p-6">
                    <h1 className="text-yellow-400">update</h1>
                    <div className="pt-12 font-mono font-thin text-sm">
                        <input type="text" value={updateProduct} onChange={(e) => {setUpdateProduct(e.target.value)} } className="px-2 py-1.5 text-gray-600 outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter produt id:"></input>
                        <Link to={updateProduct === '' ? '/admin/products' : `/admin/updateProduct/${updateProduct}`}> 
                            <button className="hover:bg-red-500 ml-3 px-4 py-1 rounded bg-red-400 text-sm font-semibold text-white">update</button>
                        </Link>
                    </div>
                </div>
                <div className="bg-red-50 p-6">
                    <h1 className="text-red-600">delete</h1>
                    <div className="pt-12 font-mono font-thin text-sm">
                        <input type="text" value={deleteProduct} onChange={(e) => {setDeleteProduct(e.target.value)} } className="px-2 py-1.5 text-gray-600 outline-none focus:ring-2 focus:ring-red-600" placeholder="Enter produt id:"></input>
                        <button onClick={ handleDeleteProduct } className="hover:bg-red-500 ml-3 my-2 px-4 py-1 rounded bg-red-400 text-sm font-semibold text-white">delete</button>
                    </div>
                </div>
            </div>
            <button onClick={ () => { history.goBack() } } className="font-semibold">Back</button>
        </div>
    )
}

export default AdminProducts
