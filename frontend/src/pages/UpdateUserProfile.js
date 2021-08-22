import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../Contexts';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const UpdateUserProfile = () => {
    const notify_err = (message) => {
        toast.error(message);
      }
    
      const notify = () => {
          toast.success('Your Profile updated successfuly')
        }
    const history = useHistory();
    
    const [userProfile, setuserProfile] = useState({});

    const { isloggedIn } = useContext(LoginContext);

    let [email, setEmail] = useState('');

    let [name, setName] = useState('');

    const [isUpdating, setisUpdating] = useState(false);

    const updateUser = () => {

        
        if(!name && !email){
            window.alert('Nothing to update');
            return;
        }
        if(!email){
            email = userProfile.email;
        }
        if(!name){
            name = userProfile.name;
        }
        setisUpdating(true);
        fetch('/cosmo/api/v1/user/me/update', {
            method:"PUT",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, name })
        }).then(res => res.json()).then(data => {
           
            setisUpdating(false)

            if(!data || data.status === 402 || data.status === 422){
                // window.alert(data.message);
                notify_err(data.message)
                data.status === 402 ? history.push('/signin') : history.push('/updateProfile')
                // console.log(data);
            }else{
                    window.localStorage.setItem('userData', JSON.stringify(data.user));
                    setuserProfile(data.user);
                // window.alert('');
                notify()
                history.push('/profile')
            }
        })
    }

    // useEffect(()=> {
    // },[userProfile])
    // route protection
    useEffect(() => {
        if(JSON.parse(window.localStorage.getItem('loginStatus')) == 0){
            history.push('/');
            return;
        }
        
        setuserProfile(JSON.parse(window.localStorage.getItem('userData')));
        
    }, []);

    
    return (
        isloggedIn ? 
        <>
            <div className="container mx-auto pt-12 pb-5 w-1/2 bg-gray-50 text-center border">
                <h1 className="font-normal text-2xl -mt-4 pb-3 ">Update Your Profile</h1>
                {/* <hr/> */}
                <div className="my-8 md:mx-4">
                    <span className="font-semibold mr-2 ">Email: </span>
                    <input type="email" value={email} onChange={ (e) => { setEmail(e.target.value)}} placeholder={ userProfile.email } className="text-gray-800 px-6 py-2 md:mx-6 md:ml-4 shadow-inner border-b-2 border-r-2 focus:outline-none"/>
                </div>
                <div className="my-8 md:mx-4">
                    <span className="font-semibold mr-2">Name: </span>
                    <input onChange={ (e) => { setName(e.target.value)}} type="text" value={name} placeholder={ userProfile.name } className="text-gray-800 px-6 py-2  md:mx-6 md:ml-4   shadow-inner border-b-2 border-r-2 focus:outline-none"/>
                </div>

                <div>
                    <Link to="/updatePassword">
                    <button className="font-mono font-thin text-sm mb-4 px-2 py-1 my-1 border-2 rounded-full hover:bg-gray-100">
                        <i class="fas fa-wrench mr-2"></i>
                        Privacy settings
                    </button>
                    </Link>
                </div>
                <div className="my-2">
                    <button onClick={ updateUser } className={`${isUpdating ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-500 hover:bg-gray-600' } px-2 py-1 ml-2 hover:bg-gray-400 rounded-sm text-white font-semibold`}>{ isUpdating ? 'Updating...' : 'Update'}</button>
                </div>
            </div>
        </>
        : <></>
    )
}

export default UpdateUserProfile
