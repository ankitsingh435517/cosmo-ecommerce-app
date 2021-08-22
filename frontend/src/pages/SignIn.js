import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from "../Contexts";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.minimal.css';
// call toast configure
toast.configure();

const SignIn = () => {
  const history = useHistory();

  const [islogginIn, setislogginIn] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { isloggedIn, setisloggedIn } = useContext(LoginContext);

  const notify_err = (message) => {
    toast.error(message);
  }

  const notify = () => {
      toast.success('Login successful.')
    }
  
  const loginUser = async (e) => {
    e.preventDefault();

    setislogginIn(true);

    const res = await fetch("/cosmo/api/v1/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    console.log(data);

    setislogginIn(false);

    if(data && data.success === true) {
      setisloggedIn(true);

         window.localStorage.setItem('loginStatus', JSON.stringify(1));
         notify();

      history.push("/");
    } else {
      notify_err(data.message)
      // window.alert(data.message);
    }
  };

  // route protection
  useEffect(() => {
     if(JSON.parse(window.localStorage.getItem('loginStatus')) === 1){
         history.push('/');
         return;
     }
  }, []);

  // console.log(isloggedIn)

  return isloggedIn ? (
    <></>
  ) : (
    <>
      <div className="container mx-auto pt-8 p-2 lg:w-1/3 shadow-xl">
        <form  className="w-72 pl-1">
          <h1 className="font-semibold text-xl text-center  font-serif">
            Sign In
          </h1>
          <div className="py-4">
            <div className="flex py-2 items-center">
              <label for="Email" className="w-30 mr-6 font-semibold">
                Email
              </label>
              <div className="mx-7">
                <input
                  type="email"
                  className="w-80 p-2 border shadow-inner pl-4"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex py-2 items-center">
              <label for="Password" className="w-24 font-semibold">
                Password
              </label>
              <div className="mx-6">
                <input
                  type="password"
                  className="w-80 p-2 border shadow-inner pl-4"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {/* <Link to="/forgotPassword"> */}<form>
                  <div className="text-right">
                    <button onClick={ (e) => {e.preventDefault(); history.push('/forgotPassword')}} className="hover:text-yellow-500 -mb-4 text-sm font-thin font-mono italic text-gray-500 underline">
                      forgot password
                    </button>
                  </div>
                {/* </Link> */}</form>
              </div>
            </div>
          </div>

          <div className="flex py-1 items-center">
            <button
              onClick={loginUser}
              type="submit"
              className="bg-green-500 px-2 py-1 mr-6 font-semibold hover:bg-green-600 rounded text-white"
            >
              {islogginIn ? "Loading..." : "Login"}
            </button>
            <em className="font-light text-gray-400 text-sm w-40">
              Don't have an account ?
            </em>
            <Link to="/signup" className="">
              <button className="text-blue-500 hover:text-blue-600 font-semibold">
                SignUp
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
