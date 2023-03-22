import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const stripePromise = loadStripe(
  "pk_test_51MBpzvJZDOwfUt4DPXKMqwpqamXEVzQjdLQhvICPDbxRxSRT6yufxuv2HPNLibdnAKXadEKox9MHG79Ml5yOab2k00Hk8w8xYg"
);

const PaymentForm = ({
  checkoutToken,
  shippingData,
  backStep,
  onCaptureCheckout,
  nextStep,
  // shippingData,
}) => {
  console.log(shippingData);
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    console.log(1);
    console.log("er");

    //chay den day thi loiiii
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    console.log(error);

    // console.log("er");

    if (error) {
      // console.log("er");

      console.log(error);
      // console.log("er");
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },

        fulfillment: { shipping_method: shippingData.shippingOption },

        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
    
      nextStep();
    }
  };
  return (
    <>
      <Review checkoutToken={checkoutToken}></Review>
      <Divider></Divider>
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        {" "}
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => {
            console.log(stripe, elements);
            console.log(checkoutToken);
            return (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement></CardElement>
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="outlined" onClick={backStep}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!stripe}
                    color="primary"
                  >
                    Pay{checkoutToken?.subtotal.formatted_with_symbol}
                  </Button>
                </div>
              </form>
            );
          }}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
