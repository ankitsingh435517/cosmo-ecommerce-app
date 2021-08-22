import React, { useState, useEffect } from 'react';
import { CheckOutSteps } from '../../components'
import { useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckOutPaymentInfo_paymentDetails = () => {
  const history = useHistory();

  const [isPaying, setisPaying] = useState(false);

  const [success, setSuccess] = useState(false);

  const stripe = useStripe();

  const elements = useElements();

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

  const handleCARDoption = (payment) => {

    const _checkOutDetails = JSON.parse(window.localStorage.getItem('checkOutDetails'));
     
    _checkOutDetails.step3_paymentInfo = {
      method: 'CARD',
      status: payment.status,
      id: payment.id
    }

    window.localStorage.setItem('checkOutDetails', JSON.stringify(_checkOutDetails));

  } 

  const proceedToDone = (payment) => {
    handleCARDoption(payment);
    const _checkOutSteps = JSON.parse(window.localStorage.getItem('checkOutSteps'));

        _checkOutSteps.step3_paymentInfo = 'disable';
        _checkOutSteps.step4_done = 'active';

        window.localStorage.setItem('checkOutSteps', JSON.stringify(_checkOutSteps));
  }

  // console.log(success)
  const handlePaymentSubmit = async (e) => {
    setisPaying(true);

    e.preventDefault();

    const { error, paymentMethod} = await stripe.createPaymentMethod({
       type: "card",
       card: elements.getElement(CardElement)
    }) 

    if(!error){
      try{
        const { id } = paymentMethod;
        const amount = JSON.parse(window.localStorage.getItem('checkOutDetails')).step2_orderDetails.otherDetails.totalAmount * 100;

        fetch('/payment',{
             method: "POST",
             headers:{
               Accept: "application/json",
               "Content-Type":"application/json" 
             },
             credentials:"include",
             body:JSON.stringify({ amount, id })
        }).then(res =>  res.json()).then(data => {
          setisPaying(false);
          console.log(data)
          if(data && data.success){          
            setSuccess(true);  
            window.alert('Payment successful');
            proceedToDone(data.payment);
            history.push('/done');
          }

        })

        
      }catch(err){
        console.log("Something went wrong: ",err);
      }
    } else{
      console.log("Error: ", error.message);
    }


  }

    return (
        <>
          <CheckOutSteps />
          {
            success ? <h1 className="text-xl font-mono tracking-wider text-gray-600">Payment status: <span className="font-semibold tracking-wider text-green-500 text-lg">PAID</span></h1>
            :
          
            <div className="my-12 container mx-auto py-8 text-center border shadow-lg rounded md:w-1/2">
                <h1 className="font-semibold trackiing-wider">Fill your card details</h1>
                <form method="POST">
                  <div className="md:w-1/2 w-2/3 ml-20 md:ml-40 pl-2 my-8 ">
                    <CardElement options={{hidePostalCode:true}} className="bg-gray-50 px-2 py-3 rounded shadow-md" />
                  </div>
                </form>

                <button onClick={ handlePaymentSubmit } className="px-16 py-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold tracking-wider rounded-sm">{isPaying ? 'Processing' : 'Pay'}</button>
            </div>
          }   
        </>
    )
}

export default CheckOutPaymentInfo_paymentDetails
