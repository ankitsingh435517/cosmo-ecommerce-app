import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const UpdateOrder = () => {
    const notify_err = (message) => {
        toast.error(message);
    }

    const notify = () =>{
        toast.warn('Order updated successfuly')
    }
   
    const history = useHistory();

    const [orderStatus, setOrderStatus] = useState('');

    const [currentStatus, setCurrentStatus] = useState('');

    const params = useParams().id;

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData.role !== 'admin'){
            history.goBack();
            return;
        }
    },[])
    
    useEffect(() => {
        fetch(`/cosmo/api/v1/admin/order/show/${params}`,{
            method:"GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then(res => res.json()).then(data => {
            if(data && data.success){
                setCurrentStatus(data.order.orderStatus);

            }
        })
    },[])


    const handleUpdateOrderStatus = () => {
        fetch(`/cosmo/api/v1/admin/order/update/${params}`,{
            method:"PUT",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({ orderStatus })
        }).then(res => res.json()).then(data => {
            if(data && data.success){
                setCurrentStatus(data.order.orderStatus);
                setOrderStatus(data.order.orderStatus);
                notify();
            }else{
                notify_err(data.message);
            }
            // window.alert(data.message);
        })
    }
    return (<>
        <div className="container mx-auto py-12 px-12">
            <h1 className="font-semibold text-lg">Update Order status:</h1>
            <div className="flex my-6 border p-6 w-1/3 items-center justify-between bg-yellow-300 shadow-sm">
                <h1 className="tracking-wider font-serif text-lg">Order status:</h1>
                <input type="text" value={orderStatus} onChange={(e) => {setOrderStatus(e.target.value)}} placeholder={currentStatus} className="outline-none border p-2 px-3 shadow-inner text-gray-500"></input>
            </div>
        <button onClick={ handleUpdateOrderStatus } className="font-semibold text-white px-2 py-0.5 rounded bg-red-500">update</button>
        </div>
        <button onClick={() => {history.goBack()}} className="font-semibold ml-24">Back</button>
    </>)
}

export default UpdateOrder
