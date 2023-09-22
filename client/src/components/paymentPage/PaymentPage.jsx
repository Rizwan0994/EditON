import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm'; // Adjust the import path as needed

// Replace 'YOUR_STRIPE_PUBLIC_KEY' with your actual Stripe public key
const stripePromise = loadStripe('pk_test_51Muy0GHaLC1wsFOqorxn0RwhJjTHSN3c0w3PoHcbCYxBvK7QFw1IjYPdD6bR3DCItDcedt6WIlPmpiQa7Q6CWD1e00oYFh4MMi');
function PaymentPage() {
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    stripePromise.then(() => {
      setStripeLoaded(true);
    });
  }, []);

  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  return (
    <div>
      <h1>Enter Payment Amount</h1>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <Elements stripe={stripePromise}>
        {stripeLoaded ? <PaymentForm amount={amount} /> : null}
      </Elements>
    </div>
  );
}


export default PaymentPage;


