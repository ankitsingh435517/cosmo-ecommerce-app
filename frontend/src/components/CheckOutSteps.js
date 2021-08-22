import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const CheckOutSteps = () => {
    const [isvisited_step1, setisvisited_step1] = useState(false);
    const [isvisited_step2, setisvisited_step2] = useState(false);
    const [isvisited_step3, setisvisited_step3] = useState(false);
    const [isvisited_step4, setisvisited_step4] = useState(false);

    useEffect(() => {
        const _checkOutSteps = JSON.parse(window.localStorage.getItem('checkOutSteps'));
        
        if(_checkOutSteps.step1_shippingInfo === 'active'){
            setisvisited_step1(true)
        }
        else if(_checkOutSteps.step1_shippingInfo === 'disable' && _checkOutSteps.step2_orderDetails === 'active'){
            setisvisited_step1(true)
            setisvisited_step2(true)
        }

        else if(_checkOutSteps.step2_orderDetails === 'disable' && _checkOutSteps.step3_paymentInfo === 'active'){
            setisvisited_step1(true)
            setisvisited_step2(true)
            setisvisited_step3(true)
        }

        else {
            setisvisited_step1(true)
            setisvisited_step2(true)
            setisvisited_step3(true)
            setisvisited_step4(true)
        }
    }, [])

    const [step1_shippingInfo, setStep1_shippingInfo] = useState('disable');
    const [step2_orderDetails, setStep2_orderDetails] = useState('disable');
    const [step3_paymentInfo, setStep3_paymentInfo] = useState('disable');
    const [step4_done, setStep4_done] = useState('disable');

    useEffect(() => {
        const checkOutSteps = JSON.parse(window.localStorage.getItem('checkOutSteps')); 
        
        const step1_status = checkOutSteps.step1_shippingInfo;
        setStep1_shippingInfo(step1_status);

        const step2_status = checkOutSteps.step2_orderDetails;
        setStep2_orderDetails(step2_status);
                
        const step3_status = checkOutSteps.step3_paymentInfo;
        setStep3_paymentInfo(step3_status);

        const step4_status = checkOutSteps.step4_done;
        setStep4_done(step4_status);
    }, [])

    return (
        
        <div className="text-sm mx-auto bg-gray-50 shadow-inner tracking-wider pl-12 pr-12  flex justify-between mt-16">
            {
            //     isvisited_step1 ? 
            // <Link to="/shippingInfo">
            //     <h1 className={`${step1_shippingInfo === 'active' ? 'text-yellow-400' : '' ||  isvisited_step1 ? 'text-gray-400': ''}  font-semibold font-mono text-sm`}>Shipping</h1>
            // </Link>: 
                <h1 className={`${step1_shippingInfo === 'active' ? 'text-yellow-400' : '' ||  isvisited_step1 ? 'text-gray-400': ''}  font-semibold font-mono text-sm`}>Shipping</h1>
            }
          
            {  
            //  isvisited_step2 ? 
            // <Link to="/orderDetails">
            //      <h1 className={`${step2_orderDetails === 'active' ? 'text-yellow-400' : '' ||  isvisited_step2 ? 'text-gray-400': ''} font-semibold font-mono text-sm`}>Order details</h1>
            // </Link>: 
                 <h1 className={`${step2_orderDetails === 'active' ? 'text-yellow-400' : '' ||  isvisited_step2 ? 'text-gray-400': ''} font-semibold font-mono text-sm`}>Order details</h1>
            }

            {
            //  isvisited_step3 ? 
            // <Link to="/paymentInfo">
            // <h1 className={`${step3_paymentInfo === 'active' ? 'text-yellow-400' : '' ||  isvisited_step3 ? 'text-gray-400': ''} font-semibold font-mono text-sm`}>Payment</h1>
            // </Link> :
            <h1 className={`${step3_paymentInfo === 'active' ? 'text-yellow-400' : '' ||  isvisited_step3 ? 'text-gray-400': ''}  font-semibold font-mono text-sm`}>Payment</h1>
            }

            {
            //  isvisited_step4 ?
            //  <Link to="/done">
            //     <h1 className={`${step4_done === 'active' ? 'text-yellow-400' : '' ||  isvisited_step4 ? 'text-gray-400': ''} font-semibold font-mono text-sm`}>Place  order</h1>
            // </Link> :
                <h1 className={`${step4_done === 'active' ? 'text-yellow-400' : '' ||  isvisited_step4 ? 'text-gray-400': ''} font-semibold font-mono text-sm`}>Place  order</h1>
            }
        </div>
    )
}

export default CheckOutSteps
