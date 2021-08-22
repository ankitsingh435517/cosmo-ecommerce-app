import React, { useState, useEffect } from 'react'
import { CheckOutSteps } from '../../components'
import { Link, useHistory } from 'react-router-dom'

const CheckOutShippingInfo = () => {

    const history = useHistory();

    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        const loginStatus = JSON.parse(window.localStorage.getItem('loginStatus'));
        if(loginStatus === 0){
            history.push('/');
            return;
        }

        const isOrderInitiated = JSON.parse(window.localStorage.getItem('isOrderInitiated'));

        if(isOrderInitiated === 0){
            history.push('/');
            return;
        }


    },[]);

    const collectShippimgInfo = () => {
        const _checkOutDetails = JSON.parse(window.localStorage.getItem('checkOutDetails'));
        
        _checkOutDetails.step1_shippingInfo = {
            address,
            postalCode,
            phoneNumber,
            city,
            country
        }

        window.localStorage.setItem('checkOutDetails', JSON.stringify(_checkOutDetails));
    }

    const proceedToOrderDetails = () => {
        // collect shipping info
        const _checkOutDetails = JSON.parse(window.localStorage.getItem('checkOutDetails'));
        if(!_checkOutDetails.step1_shippingInfo.address){
            
            collectShippimgInfo();
        }

        const _checkOutSteps = JSON.parse(window.localStorage.getItem('checkOutSteps'));

        _checkOutSteps.step1_shippingInfo = 'disable';
        _checkOutSteps.step2_orderDetails = 'active';

        window.localStorage.setItem('checkOutSteps', JSON.stringify(_checkOutSteps));

    }
    
    return (<>
        <CheckOutSteps />
        <div className="container md:w-1/2 mx-auto">
            <div className="pt-6 pl-6 pr-6 border border-t-2 border-r-2 w-full rounded mt-12 mb-4 shadow-lg">
                <div className="  py-1">
                    <h1 className=" mr-72 font-base text-gray-800 tracking-wider">Address</h1>
                    <textarea type="text" value={address} onChange={ (e) => { setAddress(e.target.value)} } cols="50" className="md:p-4 p-2 my-1 border-2 shadow-inner focus:border-blue-500 outline-none " placeholder="Enter your residential address"></textarea>
                </div>

                <div className="mt-2  py-2">
                    <h1 className="mr-64 font-base text-gray-800 tracking-wider">Postal code</h1>
                    <input type="Number" value={postalCode} onChange={ (e) => { setPostalCode(e.target.value)} } className="p-2 mr-28 my-1 border-2 shadow-inner focus:border-blue-500 outline-none w-60" placeholder="Enter your postal code"></input>
                </div>

                <div className="mt-6  py-2">
                    <h1 className="mr-60 font-base text-gray-800 tracking-wider">Phone number</h1>
                    <input type="Number" value={phoneNumber} onChange={ (e) => { setPhoneNumber(e.target.value)} } className="p-2 mr-28 my-1 border-2 shadow-inner focus:border-blue-500 outline-none w-60" placeholder="Enter your phone number"></input>
                </div>
                
                <div className="mt-6  py-2">
                    <h1 className="mr-80 font-base text-gray-800 tracking-wider">City</h1>
                    <input type="text" value={city} onChange={ (e) => { setCity(e.target.value)} } className="p-2 mr-28 my-1 border-2 shadow-inner focus:border-blue-500 outline-none w-60" placeholder="Enter your city name"></input>
                </div>
                
                <div className="mt-6  py-2">
                    <h1 className="mr-72 font-base text-gray-800 tracking-wider">Country</h1>
                    <input type="text" value={country} onChange={ (e) => { setCountry(e.target.value)} } className="p-2 mr-28 my-1 border-2 shadow-inner focus:border-blue-500 outline-none w-60" placeholder="Enter your country name"></input>
                </div>

                <div className="my-6 mr-60 ">
                    <Link to="/orderDetails">
                        <button onClick={ proceedToOrderDetails } className="bg-gray-700 hover:bg-gray-800 font-semibold text-white px-3 py-1 rounded">continue</button>
                    </Link>
                </div>
            </div>
        </div></>
    )
}

export default CheckOutShippingInfo;
