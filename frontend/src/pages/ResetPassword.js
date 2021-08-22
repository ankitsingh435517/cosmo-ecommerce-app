import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const ResetPassword = () => {
    const notify_err = (message) => {
        toast.error(message);
      }
    
      const notify = () => {
          toast.success('Password reset successfull')
        }
    const resetUrl = useParams().token;

    const history = useHistory();

    const [newPassword, setNewPassword] = useState(''); 
    
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
       if(JSON.parse(window.localStorage.getItem('allowReset') == 0)){
           history.push('/');
           return;
       }
    },[])
    const resetPassword = (e) => {
         e.preventDefault();

         fetch(`/cosmo/api/v1/user/me/resetPassword/${resetUrl}`,{
             method:"PUT",
             headers:{
                 Accept: "application/json",
                 "Content-Type":"application/json"
             },
             credentials:"include",
             body:JSON.stringify({ new_Password: newPassword, confirm_New_Password: confirmNewPassword })
         }).then(res => res.json()).then(data => {
             if(data && data.success){
                //  window.alert('');
                notify();
             }else{
                //  window.alert(data.message);
                notify_err(data.message)
             }
             history.push('/');
         })

         window.localStorage.setItem('allowReset', JSON.stringify(0));
    }

    return (
        <>
        <div className="container mx-auto md:w-1/2 bg-green-50 text-left p-4 shadow-inner border">
            <h1 className="text-2xl font-normal">Set New Password</h1>
            {/* <form method="POST"> */}
                <div className="my-6">
                    <div className="flex items-center">
                        <h1 className="w-56 text-gray-500">New Password:</h1>
                        <div className="flex items-center">
                            <input  className="pl-4 pr-20 py-2 border shadow-inner outline-none" required value={newPassword} onChange={ (e) => { setNewPassword(e.target.value)}} type="password"  placeholder="Enter new password"/>
                            {/* <button className="-ml-11 w-6 font-thin text-sm font-serif text-gray-400 hover:text-gray-800">show</button> */}
                            {/* <span className="-ml-9">|</span> */}
                        </div>
                    </div>
                    <div className="flex items-center mt-6">
                        <h1 className="w-56 text-gray-500">Confirm New Password:</h1>
                        <div className="flex items-center">
                            <input required className="pl-4 pr-20 py-2 border shadow-inner outline-none" value={confirmNewPassword} onChange={ (e) => { setConfirmNewPassword(e.target.value)}} type="password" placeholder="Enter password again"/>
                            {/* <button className="-ml-11 w-6 font-thin text-sm font-serif text-gray-400 hover:text-gray-800">show</button> */}
                            {/* <span className="-ml-9">|</span> */}
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" onClick={ resetPassword } className="px-4 py-1 bg-green-500 text-white font-semibold rounded">Reset</button>
                </div>
            {/* </form> */}
        </div>
       </>
    )
}

export default ResetPassword
