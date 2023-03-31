import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { handleRemoveFromCart, handleUpdateCartQty } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

const CartItem = (props) => {
  // console.log(props);
  const onRemove = props?.onRemove;
  const { mutate, isLoading } = useMutation(handleRemoveFromCart, {
    onSuccess: props?.refetch,
  });

  const { mutate: mutateQuantity } = useMutation(handleUpdateCartQty, {
    onSuccess: props?.refetch,
  });

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);

  const updateQuantity = (opt) => {
    if (opt === "+") {
      setQuantity(quantity + 1);
      mutateQuantity({ id: props?.item.id, quantity: quantity + 1 });
    } else {
      setQuantity(quantity - 1);
      mutateQuantity({ id: props?.item.id, quantity: quantity - 1 });
    }
    props?.refetch();
  };

  const variant =
    item?.selected_options?.map((item) => item?.option_name) || [];

  // console.log(variant?.split(",", "-"))

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200">
      <td className="w-32 p-4">
        <img src={item?.image?.url} alt="Apple Watch" />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
        <div className="">
          <Link to={`/catalog/${item.slug}`}>{`${item?.name}`}</Link>
          <div className=" uppercase">
            {variant.map(
              (item, index) =>
                `${item} ${variant.length - 1 === index ? "" : "-"} `
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateQuantity("-")}
            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-200 dark:hover:border-gray-600 dark:focus:ring-gray-150"
            type="button"
          >
            <span className="sr-only">Quantity button</span>
            <i className="bx bx-minus"></i>
          </button>
          <div>
            <span
              type="number"
              id="first_product"
              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1"
            >
              {quantity}
            </span>
          </div>
          <button
            onClick={() => updateQuantity("+")}
            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-200 dark:hover:border-gray-600 dark:focus:ring-gray-150"
            type="button"
          >
            <span className="sr-only">Quantity button</span>
            <i className="bx bx-plus"></i>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
        {item?.price?.formatted_with_code}
      </td>
      <td className="px-6 py-4">
        {isLoading ? (
          <ClipLoader color="#4267b2" />
        ) : (
          <button
            onClick={() => mutate(item.id)}
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
          >
            Remove
          </button>
        )}
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
