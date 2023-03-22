import { CardElement } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";

const CardCredit = ({setStripePaymentMethod, stripe, elements}) => {
    useEffect(() => {
        setStripePaymentMethod({stripe, elements})
    }, [stripe, elements])
  return (
    <div>
      <div
        id="card"
        class="relative w-96 h-60 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500"
      >
        <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center gap-6 p-6 bg-gradient-to-tr from-gray-900 to-gray-700 transition-all duration-100 delay-200 z-20">
          <div class="flex justify-between items-center">
            <img
              src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
              alt="Smart card"
              class="w-12"
            />

            <img
              src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
              alt="Visa"
              class="w-12"
            />
          </div>

          <div class="bg-white p-2 rounded-md">
            <label for="" class="hidden">
              Card Number
            </label>
            <CardElement className="card-custom" />
          </div>

          <div class="w-full flex flex-row justify-between">
            <div class="w-full flex flex-col">
              <label for="">Card holder</label>
              <input
                type="text"
                id=""
                readOnly
                class="outline-none bg-transparent"
              />
            </div>

            <div class="w-1/4 flex flex-col">
              <label for="">Expires</label>
              <input
                type="text"
                id=""
                readOnly
                class="outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        <div class="absolute top-0 left-0 w-full h-full flex flex-col gap-3 justify-center bg-gradient-to-tr from-gray-900 to-gray-700 transition-all z-10">
          <div class="w-full h-12 bg-black"></div>

          <div class="px-6 flex flex-col gap-6 justify-center">
            <div class="flex flex-col items-end">
              <label for="">CVV</label>
              <input
                type="text"
                id=""
                readOnly
                class="outline-none rounded text-black w-full h-8 text-right"
              />
            </div>

            <div class="flex justify-start items-center">
              <img
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                alt=""
                class="w-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCredit;
