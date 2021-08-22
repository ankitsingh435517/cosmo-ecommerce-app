import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router';
import { LoginContext } from '../Contexts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();

const SetNewPassword = () => {
    const notify_err = (message) => {
        toast.error(message);
      }
    
      const notify = () => {
          toast.success('Password updated successfully')
        }
        
    const history = useHistory();
    
    const { isloggedIn } = useContext(LoginContext)
    
    const [newPassword, setNewPassword] = useState('');
    
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    
  

    useEffect(() => {
        if(JSON.parse(window.localStorage.getItem('isMatch')) == 0){
            history.push('/updatePassword');
            return;
        }
         // route protection
        if(JSON.parse(window.localStorage.getItem('loginStatus')) == 0){
            history.push('/');
            return;
        }
        
    }, []);


    const updatePassword = (e) => {
        e.preventDefault();

        if(newPassword === '' || confirmNewPassword === ''){
            window.alert('Password should not be empty');
            return;
        }
        
        fetch('/cosmo/api/v1/user/me/updatePassword', {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials: "include",
            body: JSON.stringify({ new_Password: newPassword, confirm_New_Password: confirmNewPassword })
        }).then(res => res.json()).then(data => {
            console.log(data)
            if(data && data.success){
                window.localStorage.setItem('isMatch', JSON.stringify(0));
                // window.alert('');
                notify();
                history.push('/updateProfile');
            }else{
                notify_err('Entered Passwords do not match')
                // window.alert('Entered Passwords do not match');
            }

            setNewPassword('');
            setConfirmNewPassword('');

        })
    }

    

    return (
        isloggedIn ? 
        <>
        <div className="container mx-auto md:w-1/2 bg-green-50 text-left p-4 shadow-inner border">
            <h1 className="text-2xl font-normal">Set New Password</h1>
            
                <div className="my-6">
                    <div className="flex items-center">
                        <h1 className="w-56 text-gray-500">New Password:</h1>
                        <div className="flex items-center">
                            <input  className="pl-4 pr-20 py-2 border shadow-inner outline-none" required value={newPassword} onChange={ (e) => { setNewPassword(e.target.value)}} type="password"  placeholder="Enter new password"/>
                            {/* <button className="-ml-11 w-6 font-thin text-sm font-serif text-gray-400 hover:text-gray-800">show</button>
                            <span className="-ml-9">|</span> */}
                        </div>
                    </div>
                    <div className="flex items-center mt-6">
                        <h1 className="w-56 text-gray-500">Confirm New Password:</h1>
                        <div className="flex items-center">
                            <input required className="pl-4 pr-20 py-2 border shadow-inner outline-none" value={confirmNewPassword} onChange={ (e) => { setConfirmNewPassword(e.target.value)}} type="password" placeholder="Enter password again"/>
                            {/* <button className="-ml-11 w-6 font-thin text-sm font-serif text-gray-400 hover:text-gray-800">show</button>
                            <span className="-ml-9">|</span> */}
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" onClick={ updatePassword } className="px-4 py-1 bg-green-500 text-white font-semibold rounded hover:bg-green-600">Update</button>
                </div>
            
        </div>
       </>
       : <></>
    )
}

export default SetNewPassword
