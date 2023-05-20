import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { continuePayment } from "../../features/stripe/stripeSlice";
import { useLocation } from 'react-router-dom';
import { Box } from "@mui/material";
import Invoice from "../stripePayment/Invoice";
import styles from './css/Stripe.module.css';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51LBME2GWaIxWiKnbH9WCVVVXWKffLjTDd5xm99IZRkeLceBHNuTaIJxAh3hRwaEvdT6Q0iIrtpUPeQ0ycd70CRyd00XSGRA46x");

const ContStripe = () => {
  // const { order, isLoading } = useSelector((store) => store.order);
  const location = useLocation();
  const order = location.state.order;
  const orderItems = location.state.orderItems;
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((store) => store.stripe);

  useEffect(() => {
    console.log(location);
    dispatch(continuePayment(order.id));
  }, [dispatch])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'  }} className={styles['cont']}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={order.id}/>
        </Elements>
      )}
      <Invoice order={order} orderItems={orderItems} />
    </Box>
  )
}
export default ContStripe;