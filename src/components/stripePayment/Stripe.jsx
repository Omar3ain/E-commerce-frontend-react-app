import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../../features/stripe/stripeSlice";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51LBME2GWaIxWiKnbH9WCVVVXWKffLjTDd5xm99IZRkeLceBHNuTaIJxAh3hRwaEvdT6Q0iIrtpUPeQ0ycd70CRyd00XSGRA46x");

const Stripe = ({id}) => {

    const dispatch = useDispatch();
    const { clientSecret } = useSelector((store) => store.stripe);

    useEffect(()=>{
        dispatch(checkout(id));
    },[dispatch])
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };

  return (
    <>
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}
export default Stripe;