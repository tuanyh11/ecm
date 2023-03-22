import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { addItem } from "../../redux/shopping-cart/cartItemsSlide";
import { remove } from "../../redux/product-modal/productModalSlice";

import Button from "./Button";

import { handleAddToCart } from "../../api";
import { Link } from "react-router-dom";

const ProductView = (props) => {
  const dispatch = useDispatch();

  let product = props.product;

  const [previewImg, setPreviewImg] = useState();

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  const check = () => {
    if (color === undefined) {
      alert("Vui lòng chọn màu sắc!");
      return false;
    }

    if (size === undefined) {
      alert("Vui lòng chọn kích cỡ!");
      return false;
    }

    return true;
  };

  const addToCart = () => {
    check();
    handleAddToCart({
      id: product.id,
      quantity,
      variant: [color, size].map((item) => ({
        variantId: item?.variantId,
        optionId: item?.id,
      })),
    });
  };

  const goToCart = () => {
    if (check()) {
      let newItem = {
        ...product,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        dispatch(remove());
        props.history.push("/cart");
      } else {
        alert("Fail");
      }
    }
  };

  const images1 = product?.image.url;

  useEffect(() => {
    setPreviewImg(images1);
  }, [product]);

  let colors = [];
  let sizes = [];
  product?.variant_groups?.map((item) => {
    const isColor = item?.name?.toLowerCase() === "color";
    if (isColor) {
      colors = item?.options?.map((c) => ({ ...c, variantId: item.id }));
    } else {
      sizes = item?.options?.map((c) => ({ ...c, variantId: item.id }));
    }
  });

  console.log(color, size);
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className="">
   
 

      <section class="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4 md:w-1/2 ">
              <div class="sticky top-0 z-50 overflow-hidden ">
                <div class="relative mb-6 lg:mb-10 lg:h-2/4 ">
                  <img
                    src={previewImg}
                    alt=""
                    class="object-cover w-full lg:h-full "
                  />
                </div>
                <div class="flex-wrap hidden md:flex ">
                  {product?.assets?.map((image) => {
                    return (
                      <div key={image?.url} class="w-3/12 p-2 sm:w-1/4">
                        <div
                          onClick={() => setPreviewImg(image?.url)}
                          class="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                        >
                          <img
                            src={image?.url}
                            alt=""
                            class="object-cover w-full lg:h-20 "
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2 ">
              <div class="lg:pl-20">
                <div class="mb-8 ">
                  <span class="text-lg font-medium text-rose-500 dark:text-rose-200">
                    New
                  </span>
                  <h2 class="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    Shoes
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                    class="max-w-md mb-8 text-gray-700 dark:text-gray-400 capitalize"
                  ></div>
                  <p class="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                    <span>{product?.price?.formatted_with_code}</span>
                  </p>
                  <p class="text-green-600 dark:text-green-300 ">
                    {product?.inventory?.available} in stock
                  </p>
                </div>
                <div class="flex items-center mb-8">
                  <h2 class="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                    Colors:
                  </h2>
                  <div class="flex flex-wrap -mx-2 -mb-2">
                    {colors.map((item) => (
                      <button
                        key={item.id}
                        style={{
                          borderColor:
                            item.id === selectedColor?.id ? item.name : "",
                        }}
                        onClick={() => setColor({ ...item })}
                        onMouseLeave={() => setSelectedColor(null)}
                        onMouseOver={() => setSelectedColor(item)}
                        class={`p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 ${color?.id === item?.id ? 'border-blue-400' : ''} `}
                      >
                        <div
                          class="w-6 h-6"
                          style={{
                            backgroundColor: `${item.name.toLowerCase()}`,
                          }}
                        ></div>
                      </button>
                    ))}
                  </div>
                </div>
                <div class="flex items-center mb-8">
                  <h2 class="w-16 text-xl font-bold dark:text-gray-400">
                    Size:
                  </h2>
                  <div class="flex flex-wrap -mx-2 -mb-2">
                    {sizes.map((item) => (
                      <button
                        onClick={() => setSize({ ...item })}
                        key={item.id}
                        class={`py-1 mb-2 uppercase mr-1 border w-11 hover:border-blue-400 ${size?.id === item?.id ? 'border-blue-400' : ''} dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div class="w-32 mb-8 ">
                  <label
                    for=""
                    class="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
                  >
                    Quantity
                  </label>
                  <div class="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                    <button onClick={() => updateQuantity("minus")} class="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                      <span class="m-auto text-2xl font-thin">-</span>
                    </button>
                    <input
                      type="number"
                      class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                      placeholder="1"
                      value={quantity}
                    />
                    <button  onClick={() => updateQuantity("plus")} class="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                      <span class="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
                <div class="flex flex-wrap items-center -mx-4 ">
                  <div class="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                    <button  onClick={() => addToCart()} class="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                      Add to Cart
                    </button>
                  </div>
                  <div class="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                    <button onClick={() => goToCart()} class="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                      Go to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
