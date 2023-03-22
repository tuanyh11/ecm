import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  createCaptureCheckout,
  generateToken,
  getCartInfo,
  getListCountries,
  getListSubdivision,
  getOptionShipping,
  sendOrder,
} from "../../api";
import { commerce } from "../../lib/commerce";
import ErrorForm from "./ErrorForm";
import OrderLeft from "./OrderLeft";
import TitleOrderRight from "./TitleOrderRight";
import InputForm from "./InputForm";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { Button } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import CardCredit from "./CardCredit";

const paymentMethods = [
  {
    id: 1,
    name: "Thanh toán khi nhận hàng",
    value: "cash",
  },
  {
    id: 2,
    name: "Thanh toán bằng thẻ",
    value: "credit",
  },
];

const stripePromise = loadStripe(
  "pk_test_51MBpzvJZDOwfUt4DPXKMqwpqamXEVzQjdLQhvICPDbxRxSRT6yufxuv2HPNLibdnAKXadEKox9MHG79Ml5yOab2k00Hk8w8xYg"
);

const Order = () => {
  const nav = useNavigate();

  const [stripePaymentMethod, setStripePaymentMethod] = useState({
    stripe: "",
    elements: "",
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: cartInfo } = useQuery({
    queryKey: ["get-cart-info"],
    queryFn: getCartInfo,
    refetchOnWindowFocus: false,
  });

  const { data: token } = useQuery({
    queryKey: ["generate-token"],
    queryFn: () => generateToken(cartInfo.id),
    refetchOnWindowFocus: false,
    enabled: Boolean(cartInfo),
  });

  const { data: countries } = useQuery({
    queryKey: ["get-countries"],
    queryFn: () => getListCountries(token.id),
    refetchOnWindowFocus: false,
    enabled: Boolean(token),
  });

  const countryCode = watch("countryCode");
  const { data: listSubdivision } = useQuery({
    queryKey: ["get-subdivision", countryCode],
    queryFn: () => getListSubdivision(countryCode),
    refetchOnWindowFocus: false,
    enabled: Boolean(countryCode),
  });

  const subdivisionCode = watch("subdivisionCode");

  const { data: optionsShipping } = useQuery({
    queryKey: ["get-optionsShipping", countryCode, token?.id, subdivisionCode],
    queryFn: () =>
      getOptionShipping({
        token: token.id,
        country: countryCode,
        region: subdivisionCode,
      }),
    refetchOnWindowFocus: false,
    enabled: Boolean(countryCode) && Boolean(subdivisionCode !== "default"),
  });

  // console.log(cartInfo);

  const listCountries = Object.entries(countries?.countries || {}).map(
    ([k, v]) => (
      <option key={k} value={k}>
        {v}
      </option>
    )
  );

  const subdivision = Object.entries(listSubdivision?.subdivisions || {}).map(
    ([k, v]) => (
      <option key={k} value={k}>
        {v}
      </option>
    )
  );

  const productsCart = cartInfo?.line_items;

  const selectedOptionShipping =
    watch("shippingOption") && JSON.parse(watch("shippingOption"));

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  console.log(token);

  const errorsList = Object.entries(errors).map(([k, v]) => (
    <li key={v.message}>{v.message}</li>
  ));

  const { mutate } = useMutation(sendOrder, {
    onSuccess: () => {
      alert("Order sent successfully check your email address");
      nav("/catalog");
    },
  });

  const { mutate: onCaptureCheckout } = useMutation(createCaptureCheckout, {
    onError: () => {
      alert("Bạn đã thanh toán thành công!");
      nav("/catalog");
    },
  });

  const handleCheckoutCredit = async (shippingData) => {
    const { stripe, elements } = stripePaymentMethod;

    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    //chay den day thi loiiii
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    console.log(stripe, elements);

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: token.line_items,
        customer: {
          firstname: shippingData.name,
          lastname: shippingData.name,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address,
          town_city: shippingData.city,
          country_state: shippingData.subdivisionCode,
          postal_zip_code: shippingData.zipCode,
          country: shippingData.countryCode,
        },

        fulfillment: { shipping_method: JSON.parse(watch("shippingOption")).id },

        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        }
      };
      onCaptureCheckout({
        checkoutTokenId: token.id,
        newOrder: orderData,
      });
      // nextStep();
    }
  };

  const handleCreateOrder = (value) => {

    if (paymentMethod.value === "cash") {

      mutate({
        email: value.email,
        items: token.line_items,
        otherInfo: token,
        total: selectedOptionShipping.price.raw + cartInfo.subtotal.raw,
      });
    } else {

      handleCheckoutCredit(value);
    }
  };

  console.log(token);
  return (
    <div>
      <div className="m-auto ">
        <div>
          <button
            type="button"
            className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
          >
            <span className="pl-2 mx-1">Create new shipping label</span>
          </button>
          <div className="flex flex-wrap mx-[-15px] mt-8">
            <div className="w-6/12 px-[15px]">
              {<OrderLeft productsCart={productsCart} />}

              <div className="mt-5 bg-white shadow border cursor-pointer rounded-xl">
                <div className="flex">
                  <div className="flex-1 py-5 pl-5 overflow-hidden">
                    <ul>
                      <li className="text-base text-black uppercase font-bold ">
                        SubTotal
                      </li>
                      <li>{cartInfo?.subtotal?.raw}</li>
                    </ul>
                  </div>
                  <div className="flex-1 py-5 pl-1 overflow-hidden">
                    <ul>
                      <li className=" text-black uppercase text-base font-bold">
                        Total
                      </li>
                      <li>
                        {selectedOptionShipping
                          ? cartInfo?.subtotal?.raw +
                            Number(selectedOptionShipping?.price?.raw)
                          : cartInfo?.subtotal?.raw}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit((data) => handleCreateOrder(data))}
              className="w-6/12 px-[15px]"
            >
              <div className=" bg-white rounded-lg shadow border">
                <TitleOrderRight />

                {errorsList.length > 0 && <ErrorForm errorsList={errorsList} />}

                <InputForm
                  register={(name, validate) => register(name, validate)}
                  setValue={setValue}
                  listCountries={listCountries}
                  subdivision={subdivision}
                  token={token}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  paymentMethods={paymentMethods}
                />
                <div className="px-5">
                  {paymentMethod.value === "credit" && (
                    <Elements stripe={stripePromise}>
                      <ElementsConsumer>
                        {({ elements, stripe }) => {
                          return (
                            <div>
                              <CardCredit elements={elements} stripe={stripe} setStripePaymentMethod={setStripePaymentMethod} />
                            </div>
                          );
                        }}
                      </ElementsConsumer>
                    </Elements>
                  )}
                </div>
              </div>
              <div className="mt-5 bg-white shadow cursor-pointer rounded-xl">
                <div className="flex justify-between">
                  <div className="py-5 pl-5 overflow-hidden">
                    <button
                      type="submit"
                      disabled={paymentMethod.value !== "cash"}
                      className={`${
                        paymentMethod.value === "cash" ? "" : "opacity-40"
                      } flex items-center px-5 py-2.5 font-medium tracking-wide bg-gray-800 text-white capitalize   bg-primary-600 rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out`}
                    >
                      <span className="pl-2 mx-1">Order</span>
                    </button>
                  </div>

                  <div className="py-5 pr-5 overflow-hidden ">
                    <button
                      type="submit"
                      disabled={paymentMethod.value !== "credit"}
                      className={`${
                        paymentMethod.value === "credit" ? "" : "opacity-40"
                      } flex items-center px-5 py-2.5 font-medium tracking-wide bg-gray-800 text-white capitalize   bg-primary-600 rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out`}
                    >
                      <span className="pl-2 mx-1">Payment</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
