import React, { useContext } from 'react'
import Trending from './HomeProducts/Trending';
import { UserContext } from '../Contexts';

const Home = () => {
    const { addMargin } = useContext(UserContext);

    return (
        <>
            <div className={`${addMargin ? 'mt-28': '' }  mb-8 bg-green-400 shadow-inner filter contrast-100 `}>
                <div className=" shadow-inner flex items-center justify-between py-6 font-thin text-white text-9xl antialiased text-center">
                    <h1 className="animate-pulse shadow-sm mx-6">C</h1>
                    <h1 className="animate-pulse shadow-sm mx-6">O</h1>
                    <h1 className="animate-pulse shadow-sm mx-6">S</h1>
                    <h1 className="animate-pulse shadow-sm mx-6">M</h1>
                    <h1 className="animate-pulse shadow-sm mx-6">O</h1>
                </div>
            </div>
            <h1 className="font-semibold text-lg mx-12 pt-6">Trending</h1>
            <Trending />
            
        </>
    )
}

export default Home;
