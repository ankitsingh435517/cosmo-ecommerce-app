import React, { useState } from 'react'
import { CheckOutSteps } from '../../components'
import { Link, useHistory } from 'react-router-dom'
import { useEffect } from 'react';

const CheckOutPaymentInfo = () => {
    const history = useHistory();

    const [hasPaid, setHasPaid] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('');

    const [COD, setCOD] = useState(false);
    
    const [onlinePay, setonlinePay] = useState(false);

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

    useEffect(() => {
        const _checkOutDetails = JSON.parse(window.localStorage.getItem('checkOutDetails'));

        if(!_checkOutDetails.step3_paymentInfo){
            return;
        }
        
        if(_checkOutDetails.step3_paymentInfo.status){
            setHasPaid(true);
            setPaymentMethod(_checkOutDetails.step3_paymentInfo.method);
        }
    },[]);

    const handlePaidContinue= () => {
        const _checkOutSteps = JSON.parse(window.localStorage.getItem('checkOutSteps'));

        _checkOutSteps.step3_paymentInfo = 'disable';
        _checkOutSteps.step4_done = 'active';

        window.localStorage.setItem('checkOutSteps', JSON.stringify(_checkOutSteps));

        history.push('/done')
    }

    const handleCODoption = () => {
        const _checkOutDetails = JSON.parse(window.localStorage.getItem('checkOutDetails'));

        _checkOutDetails.step3_paymentInfo = {
            method: 'COD',
            status: 'available'
        }

        window.localStorage.setItem('checkOutDetails', JSON.stringify(_checkOutDetails));

    }
    const handleCashOnDelivery = () => {
        handleCODoption();
        const _checkOutSteps = JSON.parse(window.localStorage.getItem('checkOutSteps'));

        _checkOutSteps.step3_paymentInfo = 'disable';
        _checkOutSteps.step4_done = 'active';

        window.localStorage.setItem('checkOutSteps', JSON.stringify(_checkOutSteps));

    }

    const handlePaymentOption = () => {
        if(COD){
            handleCashOnDelivery();
            history.push('/done');
        }else{
            history.push('/paymentDetails');
        }

        
    }

    return (
          
        <>
            <CheckOutSteps />
            <button onClick={() => {history.goBack()}} className="my-6 font-semibold mx-12">Back</button>    

            {
               !hasPaid ? 
    
                        <div className="container mx-auto">
                            <h1 className="mt-12 mx-14 text-gray-800 italic text-3xl leading-none tracking-wider font-light">Choose payment option:</h1>
                            <div className="my-12 md:mx-96">
                                <div className="my-4 border p-2 bg-gray-50">   
                                    <input type="radio" value={COD} onClick={ (e) => { setCOD(true) } } name="paymentMethod" className="" />
                                    <span className="font-thin text-2xl  tracking-wider font-mono  p-2">Cash on delivery</span>
                                </div>
                            
                                <div className="border p-2 bg-gray-50">
                                    <input type="radio" value={onlinePay} onClick={ (e) => { setonlinePay(true) } } name="paymentMethod" className=""/>
                                    <span className="font-thin text-2xl tracking-wider font-mono p-2">Pay with card</span>
                                </div>
                            
                                <button onClick={ handlePaymentOption } className="bg-gray-500 text-white font-semibold md:px-56 px-48 py-2.5 my-4 hover:bg-gray-600">continue</button>
                            </div>
                        </div>
                        : 
                    <>
                        <div className="container max-auto">
                        <h1 className="mt-12 mx-14 text-gray-800 italic text-3xl leading-none tracking-wider font-light">Your payment method: </h1>
                           {
                               paymentMethod === 'COD' ? 
                                <div className="ml-8 my-4 border p-2 bg-gray-50">   
                                    <input type="checkbox" checked disabled className="" />
                                    <span className="font-thin text-2xl text-gray-500 tracking-wider font-mono  p-2">Cash on delivery available</span>
                                </div>
                                :
                                <div className="ml-8 my-4 border p-2 bg-gray-50">   
                                    <input type="checkbox" checked disabled className="" />
                                    <span className="font-thin text-2xl text-green-500 tracking-wider font-mono  p-2">Paid with Card</span>
                                </div>
                           }                                 
                           <button onClick={handlePaidContinue} className="bg-gray-500 text-white font-semibold md:px-56 px-44 py-2.5 my-4 ml-8 hover:bg-gray-600">continue</button>
                        </div>
                    </>
            }
        </>
       
    )
}

export default CheckOutPaymentInfo
