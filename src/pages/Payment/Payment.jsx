// Payment page, shows order summary (price + fees) and Stripe card form
// whhen the payement is successful, marks the offer as sold in the back-end and hides it from the search results
// Receives offer id, title, and amount via React Router location state

import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";

// getting the stripe public api key from frontend .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


// stripe form to complete the payement 
const CheckoutForm = ({ id, title, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "Buyer",
      });

      const stripeToken = stripeResponse.token.id;

      await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title,
          amount,
          token: stripeToken,
        }
      );

      // Mark offer as sold
      await axios.put(import.meta.env.VITE_API_URL + "/offers/" + id + "/sold");

      setCompleted(true);
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Une erreur est survenue lors du paiement");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="payment-success">
        <p>Paiement effectué avec succès !</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <CardElement />
      {errorMessage && <p className="payment-error">{errorMessage}</p>}
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? "Paiement en cours..." : `Payer ${amount} €`}
      </button>
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const { id, title, amount } = location.state || {};

  if (!title || !amount) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <div className="payment-container">
        <div className="payment-card">
          <h2>Résumé de la commande</h2>
          <div className="payment-summary">
            <div className="payment-row">
              <span>Commande</span>
              <span>{amount} €</span>
            </div>
            <div className="payment-row">
              <span>Frais protection acheteurs</span>
              <span>{(amount * 0.04).toFixed(2)} €</span>
            </div>
            <div className="payment-row">
              <span>Frais de port</span>
              <span>{(amount * 0.06).toFixed(2)} €</span>
            </div>
          </div>
          <div className="payment-total">
            <span>Total</span>
            <span>{(amount * 1.1).toFixed(2)} €</span>
          </div>
          <p className="payment-description">
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <strong>{title}</strong>. Vous allez payer{" "}
            <strong>{(amount * 1.1).toFixed(2)} €</strong> (frais de protection
            et frais de port inclus).
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm id={id} title={title} amount={amount} />
          </Elements>
        </div>
      </div>
    </main>
  );
};

export default Payment;
