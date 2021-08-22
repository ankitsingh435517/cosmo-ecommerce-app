import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// call toast configure
toast.configure();


const ForgotPassword = () => {
    const notify_err = (message) => {
        toast.error(message);
      }
    
      const notify = () => {
          toast.success('Check your email for recovery link')
        }
        
    const history = useHistory();

    const [email, setEmail] = useState('');

    const [isloading, setisloading] = useState(false);

    const handleForgotPassword = (e) => {
        e.preventDefault();

        setisloading(true);

        fetch('/cosmo/api/v1/user/me/forgotPassword',{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({ email })
        }).then(res => res.json()).then(data => {
            
            setisloading(false);
            
            if(data && data.success){
                // window.alert('')
                notify();
                window.localStorage.setItem('allowReset', JSON.stringify(1));
                history.push('/');
            }else{
                // window.alert(data.message);
                notify_err(data.message)
            }
        })

        
    }
    return (
        <div className="container mx-auto py-14 md:w-1/2 border text-center bg-yellow-50 shadow-md">
            <h1 className="mb-4 text-2xl -ml-4">Forgot password</h1>
            <div className="mt-6 -ml-4">
            <h1 className="mb-4 mt-2 font-semibold mx-2">Input your registered email</h1>
            <div className="flex items-center md:ml-36 ml-6">
                <form method="POST" >
                    <input type="email" value={email} onChange={ (e) => { setEmail(e.target.value)} } required className="focus:outline-none focus:ring focus:border-blue-50 border rounded ml-14 pl-6 pr-20 py-2 bg-gray-50 shadow-inner"/>
                    <button type="submit" onClick={ handleForgotPassword } className="ml-4 font-semibold px-2 py-2 mb-1 text-white rounded bg-gray-500 active:bg-gray-700">{isloading ? 'Loading...': 'Done'}</button>
                </form>
                {/* <button className=" ml-4 -mb-4 text-sm font-thin font-mono italic text-gray-500 underline">forgot password</button> */}
            </div>
            
            </div>
        </div>
    )
}

export default ForgotPassword
