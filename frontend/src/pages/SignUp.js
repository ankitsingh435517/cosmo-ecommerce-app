import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.minimal.css';
// call toast configure
toast.configure();

const SignUp = () => {
    const[issigningUp, setissigningUp] = useState(false);

    const history = useHistory();

    const [user, setUser] = useState({
        name:"", email:"", password:""
    })

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user , [name]:value })
    }
    
    const notify = () => {
        toast.info('Registration successful')
    }
    const notify_err = (message) => {
        toast.error(message);
      }
    
    const registerUser = async (e) => {
        e.preventDefault();

        setissigningUp(true);

        const { name, email, password } = user;

        const res = await fetch('/cosmo/api/v1/user/register/new', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })

        const data = await res.json()

        setissigningUp(false);

        console.log(data);

        if(!data || data.status === 422 || data.status === 421 || data.status === 501 ){
            // window.alert(`${data.message} !`);
            notify_err(data.message);
            console.log(`Error: ` , data.status)
        }else{
            // window.alert('Registration successful');
            notify()
            history.push('/signin');
        }

    }

      // route protection
  useEffect(() => {
    if(JSON.parse(window.localStorage.getItem('loginStatus')) === 1){
        history.push('/');
        return;
    }
 }, []);

    return (
        <div className="container mx-auto pt-8 p-2 lg:w-1/3 shadow-xl">
            <form className="w-72 pl-1" method="POST">
                <h1 className="font-semibold text-xl text-center ml-36 font-serif">Sign Up</h1>
                <div className="py-4">
                    <div className="flex py-2 items-center">
                        <label for="Email" className="w-30 mr-6 font-semibold">Email</label>
                        <div className="mx-7">
                            <input required type="email" className="w-80 p-2 border shadow-inner pl-4" placeholder="example@email.com"
                              name="email" value={user.email} onChange={ handleInputs }
                             />
                        </div>
                    </div>

                    <div className="flex py-2 items-center">
                        <label for="Name" className="w-30 mr-6 font-semibold">Name</label>
                        <div className="mx-6">
                            <input type="text" required className="w-80 p-2 border shadow-inner pl-4" placeholder="John Doe"
                              name="name" value={user.name} onChange={ handleInputs } 
                            />
                        </div>
                    </div>

                    <div className="flex py-2 items-center">
                        <label for="Password" className="w-24 font-semibold">Password</label>
                        <div className="mx-6">
                            <input type="password" required className="w-80 p-2 border shadow-inner pl-4" placeholder="Enter your password"
                              name="password" value={user.password} onChange={ handleInputs }
                            />
                        </div>
                    </div>
                </div>

                <div className="flex py-1 items-center">
                    <button onClick={ registerUser } type="submit" className=' px-2 py-1 mr-6 font-semibold bg-yellow-500 hover:bg-yellow-600 rounded text-white '>{issigningUp ? 'Loading...' : 'Register'}</button>
                    <div className="flex items-center justify-between">
                        <h6><em className="text-gray-400 font-light text-sm">Already a user ? </em></h6> 
                        <Link to="/signin">
                            <button className="text-blue-500 hover:text-blue-600 font-semibold ml-4">SignIn</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp
