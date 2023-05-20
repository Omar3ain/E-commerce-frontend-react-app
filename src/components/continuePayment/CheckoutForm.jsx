import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import styles from './css/Stripe.module.css';

export default function CheckoutForm({orderId}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('Enter Your email');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const returnUrl = `/fail?orderId=${orderId}`;

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        
        return_url: `/success?orderId=${orderId}`,
      },
    });
  
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      navigate(returnUrl)
      // window.location.href = returnUrl;
    } else {
      setMessage("An unexpected error occurred.");
      navigate(returnUrl)
      // window.location.href = returnUrl;
    }
    setIsLoading(false); 
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  const handleEmailChange = (e) => {
    const emailValue = e.target?.value ?? 'Enter Your email';
    setEmail(emailValue);
  };
  

  return (
    <form id={styles['payment-form']} className={styles['form']} onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={handleEmailChange}
      />
      <PaymentElement id={styles['payment-element']} options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className={styles['button']}>
        <span id="button-text">
          {isLoading ? <div className={styles['spinner']} id={styles['spinner']}></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id={styles['payment-message']} >{message}</div>}
    </form>
  );
}