function InputForm({register, setValue, listCountries, subdivision, token, paymentMethod, setPaymentMethod, paymentMethods}) {
    return <div className="px-5 pb-5">
      <input
        placeholder="Name"
        {...register("name", {
          required: {
            value: true,
            message: "Name is required",
          },
        })}
        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
  
      <input
        placeholder="Email"
        {...register("email", {
          required: {
            message: "Please enter your email",
            value: true,
          },
          pattern: {
            message: "Your email is not valid",
            value: /^\S+@\S+$/i,
          },
        })}
        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
      <input
        placeholder="Address"
        {...register("address", {
          required: {
            value: true,
            message: "Address is required",
          },
        })}
        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
      <div className="flex gap-2">
        <div className="flex-grow w-1/2">
          <input
            placeholder="Zip Code"
            {...register("zipCode", {
              required: {
                value: true,
                message: "Zip Code is required",
              },
            })}
            className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
        </div>
        <div className="flex-grow w-1/2">
          <input
            placeholder="City"
            {...register("city", {
              required: {
                value: true,
                message: "City is required",
              },
            })}
            className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
        </div>
      </div>
  
      <div className="flex gap-2">
        <select
          id="countries"
          onChange={(e) => e.target.value !== "" &&
            (() => {
              setValue("countryCode", e.target.value);
              setValue("subdivisionCode", null);
            })()}
          className="text-black w-1/2 placeholder-gray-600  px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        >
          <option value={""} selected>
            Choose a country
          </option>
          {listCountries}
        </select>
        <select
          {...register("subdivisionCode", {
            required: {
              value: true,
              message: "State country is required",
            },
          })}
          className="text-black  placeholder-gray-600 w-1/2 px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        >
          <option value={""} selected>
            Select State or City
          </option>
          {subdivision}
        </select>
      </div>
  
      <select
        id="countries"
        {...register("shippingOption", {
          required: {
            value: true,
            message: "Shipping option is required",
          },
        })}
        className="text-black w-full placeholder-gray-600  px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
      >
        <option value={""} selected>
          Shipping Option
        </option>
        {token?.shipping_methods?.map((item) => (
          <option key={item.id} value={JSON.stringify(item)}>
            {item.description} - ({item.price.raw})
          </option>
        ))}
      </select>
  
      <div className="mt-5 flex justify-between   mb-4  flex-col">
        {paymentMethods.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center mb-4 cursor-pointer"
          >
            <input
              id={`radio-${i}`}
              type="radio"
              checked={item.id === paymentMethod.id}
              value=""
              onChange={() => setPaymentMethod(item)}
              name="disabled-radio"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer " />
            <label
              for={`radio-${i}`}
              className="ml-2  font-medium text-black text-lg cursor-pointer"
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </div>;
  }

  export default InputForm