import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Helmet from "../components/ui/Helmet";
import CartItem from "../components/ui/CartItem";
import Button from "../components/ui/Button";

import { useIsFetching, useMutation, useQuery } from "@tanstack/react-query";
import { getCartInfo, getCartItems, handleRemoveFromCart } from "../api";
import { ClipLoader } from "react-spinners";
import useStore from "../store/cart";

const Cart = () => {
  const { cart, refetch, isLoading } = useStore();

  const isFetching = useIsFetching();

  // console.log(isFetching);

  return (
    <div className="my-[150px] lg:mt-[200px]">
      <Helmet title="Giỏ hàng">
        <div className="cart flex-wrap mx-[-15px]">
          <div className="cart__info !mr-0 px-[15px]  !mt-10 lg:!mt-0 !mt-0 w-full lg:w-4/12 order-2 lg:order-1">
            <div className="cart__info__txt flex-wrap">
              <p>Bạn đang có {cart?.total_items} sản phẩm trong giỏ hàng</p>
              <div className="cart__info__txt__price !block">
                <div className=" w-full">Thành tiền:</div>{" "}
                {isFetching !== 0 ? (
                  <ClipLoader color="#4267b2" />
                ) : (
                  <span className="w-full">
                    {cart?.subtotal?.formatted_with_code}
                  </span>
                )}
              </div>
            </div>
            <div className="cart__info__btn">
              <Link to={"/order"} className="block mb-4">
                {" "}
                <Button size="block">Đặt hàng</Button>
              </Link>
              <Link to="/catalog">
                <Button size="block">Tiếp tục mua hàng</Button>
              </Link>
            </div>
          </div>
          <div className="px-[15px] w-full   overflow-x-auto lg:w-8/12  order-1 lg:order-0">
            <div class=" shadow-md relative">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-800 ">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-center ">
                      Image
                    </th>
                    <th scope="col" class="px-6 py-3 text-center ">
                      Product
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Qty
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.line_items?.map((item, index) => (
                    <CartItem item={item} key={index} refetch={refetch} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Helmet>
    </div>
  );
};

export default Cart;
