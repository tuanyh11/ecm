import React from "react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

import Button from "./Button";

import numberWithCommas from "../../utils/numberWithCommas";
import { useState } from "react";
import { handleAddToCart } from "../../api";
import { useMutation } from "@tanstack/react-query";
import useStore from "../../store/cart"; 

const ProductCard = (props) => {
//   let colors = [];
//   let sizes = [];
//   props?.variant_groups?.map((item) => {
//     const isColor = item?.name?.toLowerCase() === "color";
//     if (isColor) {
//       colors = item?.options?.map((c) => ({ ...c, variantId: item.id }));
//     } else {
//       sizes = item?.options?.map((c) => ({ ...c, variantId: item.id }));
//     }
//   });
  const {refetch} = useStore()



  const {mutate, isLoading} = useMutation(handleAddToCart, {
    onSuccess: () => {
      refetch()
    }
  })

  // console.log(refetch);

  const addToCart = () => {;
    mutate({
      id: props.id,
      quantity: 1
    });
  };

  return (
    <div class=" h-full ">
      <div class="bg-white shadow-md  rounded-3xl overflow-hidden  h-full flex flex-col">
        <Link to={`/catalog/${props.id}`} class="relative  w-full lg:mb-0 mb-3 h-[260px] ">
          <img
            src={props.img01}
            alt="Just a flower"
            class=" w-full   object-fill  h-full     "
          />
        </Link>
        <div class=" justify-evenly p-7 flex flex-col flex-1">
          <div className="flex flex-col flex-1">
            <div class="flex flex-wrap  ">
              <div class="w-full flex-none text-sm flex items-center text-gray-600">
                <Link
                  to={`/catalog/${props.id}`}
                  class="text-secondary whitespace-nowrap mr-3 text-xl font-bold text-black"
                >
                  {props.name}
                </Link>
                <span class="mr-2 text-gray-400">{props?.sku}</span>
              </div>
              <div class="flex items-center w-full justify-between min-w-0 capitalize py-2  ">
                <h2
                  class=" mr-auto text-base line-clamp-1 flex-1"
                  dangerouslySetInnerHTML={{ __html: props?.description }}
                ></h2>
                <div class="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                  IN STOCK
                </div>
              </div>
            </div>
            <div class="text-xl font-semibold mb-4 mt-1" >{props.price}</div>
            {/* <div class="flex  py-4  text-sm text-gray-600 items-center flex-wrap flex-1">
              <div class="w-6/12  lg:mb-0 flex items-center">
                <span class="text-secondary whitespace-nowrap mr-3 text-black font-semibold">
                  Color
                </span>
                <div class="w-full flex-none text-sm flex items-center text-gray-600">
                  <ul class="flex flex-row justify-center items-center space-x-2">
                    {colors.map((item) => (
                      <li
                        key={item.id}
                        onMouseLeave={() => setSelectedColor(null)}
                        onMouseOver={() => setSelectedColor(item)}
                      >
                        <span
                          style={{
                            borderColor:
                              item.id === selectedColor?.id ? item.name : "",
                          }}
                          class="block p-1 border-2 border-white rounded-full transition ease-in duration-300"
                        >
                          <button
                            style={{
                              backgroundColor: item.name.toLowerCase(),
                            }}
                            class="block w-3 h-3  rounded-full"
                          ></button>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div class="w-6/12 flex  items-center ">
                <span class="text-secondary whitespace-nowrap mr-3 text-black font-semibold">
                  Size
                </span>
                <div class="cursor-pointer text-gray-400 flex flex-wrap ">
                  {sizes.map((item) => (
                    <span
                      key={item.id}
                      class="border-2 border-white  hover:border-primary-600 hover:text-gray-900 py-0 uppercase text-lg p-2"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
          <div class="flex space-x-2 text-sm font-medium justify-center mt-auto border-t border-gray-200 pt-8 ">
            {isLoading ? (
              <ClipLoader color="#4267b2" />
            ) : (
              <button
                onClick={addToCart}
                class="transition ease-in duration-300 inline-flex items-centertext-sm font-medium mb-2 md:mb-0 bg-main px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-indigo-600 "
              >
                <span>Add Cart</span>
              </button>
            )}
            <Link to={`/catalog/${props.id}`} class="transition ease-in duration-300 bg-yellow-300 hover:bg-yellow-400  text-white  hover:shadow-lg rounded-full w-9 h-9 text-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class=""
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCard;
