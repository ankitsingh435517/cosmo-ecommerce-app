import React, { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { LoginContext } from '../Contexts';

const UserProfile = () => {
    const { isloggedIn } = useContext(LoginContext);

    const [userProfile, setUserProfile] = useState({});

    const history = useHistory();

    useEffect(() => {

         // route protection
        if(JSON.parse(window.localStorage.getItem('loginStatus')) == 0){
            history.push('/');
            return;
        }

        fetch('/cosmo/api/v1/user/me/show')
        .then(res => res.json())
        .then(data => {
            
            if(data && data.success){
                window.localStorage.setItem('userData', JSON.stringify(data.user));
                setUserProfile(data.user);            
            }
            else{
                window.alert(data.message);
                history.push('/signin');
                return;
            }
        })
    }, []);



    return (
        isloggedIn ? 
        <>
        <div className="Container bg-red-50 shadow-inner w-1/2 mx-auto pb-6 pt-4 text-center ">
            <div className="">
                <div className="mx-auto flex items-center pb-8 px-8">
                    <span className="text-md italic mr-2">welcome</span>
                    <h1 className="font-semibold text-lg">{userProfile.name}</h1>
                </div>
                <span className="text-2xl">Your Profile</span>
            </div>
         </div>
                {/* <hr className="my-2"/> */}

        <div className="Container bg-gray-50 mx-auto shadow-inner w-1/2 pb-16 pt-4  text-center ">
            <div className="pt-6 mx-8 ">

                <div className="md:mx-6 mb-2">
                    <span className="font-semibold text-sm md:text-md ">Email: </span>
                    <span className="font-bold text-sm md:text-md md:ml-4 ml-2">{ userProfile.email }</span>
                </div >
                <div className="mr-12">
                    <span className="font-semibold text-sm md:text-md ">Name: </span>
                    <span className="font-bold text-sm md:text-md md:ml-4 ml-2">{ userProfile.name }</span>
                </div>
            </div>

            <div className="pt-12 mr-2">
                <Link to="/updateProfile">
                    <button className="text-white px-2 py-1 bg-gray-400 hover:bg-gray-500 rounded">
                    <i class="fas fa-user-cog"></i>
                    <span className="ml-2 font-semibold">update profile</span>
                    </button>
                </Link>
            </div>
        </div>
        </>
        : <></>
    )
}

export default UserProfile
