import React,{ useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

const AllUsers = () => {
    const history = useHistory();
    
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem('userData'));
        if(userData.role !== 'admin'){
            history.goBack();
            return;
        }
    },[])
    
    useEffect(() => {
        fetch('/cosmo/api/v1/admin/users/index',{
            method:"GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then(res => res.json()).then(data => {
            if(data && data.success){
                setAllUsers(data.users);
            }
        })
    },[])
    return (
        <div className="container mx-auto py-6 ">
            <h1 className="text-xl ">All users</h1>
            {
                allUsers.map(user => {
                    return (<>
                        <div className="my-4 flex items-center p-6  border md:w-1/2 ">
                            <h1 className="md:mr-24 w-40">{user.name}</h1>
                            <h1 className="md:mr-24 w-44">{user._id}</h1>
                            <Link to={`/admin/singleUser/${user._id}`}><button className="ml-14 font-semibold text-red-500">Details</button></Link>
                        </div>
                    </>)
                })
            }

            <button onClick={ () => { history.goBack() } } className="font-semibold">Back</button>
           
        </div>
    )
}

export default AllUsers
