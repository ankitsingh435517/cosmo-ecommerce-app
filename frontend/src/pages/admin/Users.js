import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Users = () => {
    const history = useHistory();

    const [getUser, setGetUser] = useState('');
    
    const [deleteUser, setDeleteUser] = useState('');

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData.role !== 'admin'){
            history.goBack();
            return;
        }
    },[])
    
    const handleDeleteUser = () => {
        fetch(`/cosmo/api/v1/admin/user/delete/${deleteUser}`,{
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
        <>
        <h1 className="mt-12 text-lg tracking-wider font-semibold ml-12">User settings</h1>
        <div className="bg-gray-50 container mx-auto md:flex items-center md:p-12 text-center my-2">
            <div style={{height:'200px', width:'400px'}} className=" font-semibold text-lg tracking-wider mx-auto md:border-r  border-b border-blue-400 ">
                <h1 className="text-blue-700">Show</h1>
                <div className="mt-14 shadow-sm flex items-center ml-8 mr-4">
                    <input type="text" value={getUser} onChange={ (e) => {setGetUser(e.target.value)} } className="w-72 px-3 py-0.5 mr-4 border rounded focus:ring-2 focus:ring-blue-600 outline-none font-mono font-thin tracking-wider" placeholder="Enter user id:"></input>
                    <Link to={getUser === '' ? '/admin/users':`/admin/singleUser/${getUser}`}>
                       <button  className="px-6 py-1.5 hover:bg-blue-700 bg-blue-600 rounded text-white font-semibold text-sm">show</button>
                    </Link>
                </div>
            </div>
            <div style={{height:'200px', width:'400px'}} className=" font-semibold text-lg tracking-wider mx-auto md:border-r border-b border-blue-400">
                <h1 className="text-blue-700">Show all</h1>
                <Link to="/admin/allUsers"><button className="mt-14 px-12 py-1.5 hover:bg-blue-700 bg-blue-600 rounded text-white font-semibold text-sm">show all</button></Link>
            </div>
            <div style={{height:'200px', width:'400px'}} className=" font-semibold text-lg tracking-wider mx-auto  sm:border-b border-blue-500">
                <h1 className="text-red-700">Delete</h1>
                <div className="mt-14 flex items-center ml-8 mr-4">
                    <input type="text" value={deleteUser} onChange={ (e) => {setDeleteUser(e.target.value)} } className="w-72 px-3 py-0.5 mr-4 border rounded focus:ring-2 focus:ring-red-600 outline-none font-mono font-thin tracking-wider" placeholder="Enter user id:"></input>
                    <button onClick={ handleDeleteUser } className="px-6 py-1.5 hover:bg-red-700 bg-red-600 rounded text-white font-semibold text-sm">delete</button>
                </div>
            </div>
        </div>
        <button onClick={ () => { history.goBack() } } className="ml-12 font-semibold">Back</button>

    </>)
}

export default Users
