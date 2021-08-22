import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const SingleUser = () => {

    const history = useHistory();

    const params = useParams().id;

    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData.role !== 'admin'){
            history.goBack();
            return;
        }
    },[])
    
    useEffect(() => {
        if(params && params.startsWith(' ')){
            history.goBack()
            return;
        }
        fetch(`/cosmo/api/v1/admin/user/show/${params}`,{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then(res => res.json()).then(data => {
            if(data && data.success){
                setUser(data.user);
            }else{
                window.alert(data.message);
                history.goBack();
                return;
            }
        })
    },[])
    return (
        // user.length  ?
        <>
        <button onClick={ () => { history.goBack() } } className="font-semibold ml-14 pt-6">Back</button>
        <h1 className="text-center -ml-96 font-semibold text-lg font-mono tracking-wider">User:</h1>
        <div className="container mx-auto w-1/3 pt-6 text-gray-500 bg-gray-50 p-6">
            <div className="flex items-center justify-between my-2">
                <h1>role:</h1>
                <h1>{user.role}</h1>
            </div>

            <div className="flex items-center justify-between my-2">
                <h1>user id:</h1>
                <h1>{user._id}</h1>
            </div>

            <div className="flex items-center justify-between my-2">
                <h1>name:</h1>
                <h1>{user.name}</h1>
            </div>

            <div className="flex items-center justify-between my-2">
                <h1>email:</h1>
                <h1>{user.email}</h1>
            </div>

            <div className="flex items-center justify-between my-2">
                <h1>joined:</h1>
                <h1>{user.createdAt && user.createdAt.substr(0,10)}</h1>
            </div>
        </div>
    </>)
}

export default SingleUser
