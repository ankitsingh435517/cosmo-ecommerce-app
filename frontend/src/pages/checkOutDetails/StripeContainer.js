import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckOutPaymentInfo_paymentDetails from './CheckOutPaymentInfo_paymentDetails';

const PUBLIC_KEY = "pk_test_51JIWYKSGC2cCea0hDXkfFFPZyoW0ijmPbdbLQifBWWWQEKUbhVEJ597vDx3O8Ea6zdWxH0wr1Z3cmi6VCvyRDEcG00BGOCnHhI";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckOutPaymentInfo_paymentDetails />
        </Elements>
    )
}

export default StripeContainer;
