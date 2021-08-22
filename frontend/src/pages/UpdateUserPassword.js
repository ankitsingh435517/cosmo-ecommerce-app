import React, { useContext, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { LoginContext } from '../Contexts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const UpdateUserPassword = () => {
    const notify_err = (message) => {
        toast.error(message);
      }
    
      const notify = () => {
          toast.success('Check your email for recovery link')
        }
    const history = useHistory();
    
    const { isloggedIn } = useContext(LoginContext)
    
    const [oldPassword, setOldPassword] = useState('');
    
     // route protection
  useEffect(() => {
    if(JSON.parse(window.localStorage.getItem('loginStatus')) == 0){
        history.push('/');
        return;
    }
 }, []);
    
    

    const checkOldPassword = (e) => {
        e.preventDefault();

        if(!oldPassword){
            window.alert('Enter your current password');
            return;
        }
        fetch('/cosmo/api/v1/user/me/checkOldPassword', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include",
            body: JSON.stringify({ old_Password: oldPassword })
        }).then(res => res.json()).then(data => {

            window.localStorage.setItem('isMatch', JSON.stringify(1));
            
            if(!data || data.status === 422){
                // window.alert(data.message);
                notify_err(data.message);
                setOldPassword('')
                return;
            }else{
                // console.log(data)
                history.push('/setNewPassword')
            }
            
        })
    }


    return (
        isloggedIn ?
        <div className="container mx-auto py-14 md:w-1/2 border text-center bg-yellow-50 shadow-md">
            <h1 className="mb-4 text-2xl -ml-4">Update your password</h1>
            <div className="mt-6 -ml-4">
            <h1 className="mb-4 mt-2 font-semibold mx-2">Input your current password</h1>
            <div className="flex items-center md:ml-36 ml-9">
                <form method="POST" >
                    <input type="password" value={oldPassword} onChange={ (e) => { setOldPassword(e.target.value) }} className="focus:outline-none focus:ring focus:border-blue-50 border rounded ml-14 pl-6 pr-20 py-2 bg-gray-50 shadow-inner"/>
                    <button type="submit" onClick={ checkOldPassword } className="hover:bg-gray-600 ml-14 md:ml-4 my-4 font-semibold px-2 py-2 mb-1 text-white rounded bg-gray-500 active:bg-gray-700">done</button>
                </form>
                <Link to="/forgotPassword">
                    <button className=" ml-4 -mb-4 text-sm font-thin font-mono italic text-gray-500 underline hover:text-yellow-500">forgot password</button>
                </Link>
            </div>
            
            </div>
        </div>
        :<></>
    )
}

export default UpdateUserPassword
