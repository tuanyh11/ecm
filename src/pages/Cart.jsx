import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Helmet from "../components/ui/Helmet";
import CartItem from "../components/ui/CartItem";
import Button from "../components/ui/Button";

import { useIsFetching, useMutation, useQuery } from "@tanstack/react-query";
import { getCartInfo, getCartItems, handleRemoveFromCart } from "../api";
import { ClipLoader } from "react-spinners";

const Cart = () => {
  const isFetching = useIsFetching();

  const [totalProducts, setTotalProducts] = useState(0);

  const {
    data: cartInfo,
    refetch: refetchCartInfo,
    status,
  } = useQuery({
    queryKey: ["get-cart-info"],
    queryFn: getCartInfo,
    refetchOnWindowFocus: false,
  });

  //   loading chậm cần cải thiện


  console.log(cartInfo);


  return (
    <div className="mb-[150px] lg:mt-[200px]">
      <Helmet title="Giỏ hàng">
        <div className="cart">
          <div className="cart__info !mt-0">
            <div className="cart__info__txt">
              <p>Bạn đang có {cartInfo.total_items} sản phẩm trong giỏ hàng</p>
              <div className="cart__info__txt__price">
                <span>Thành tiền:</span>{" "}
                {isFetching !== 0 ? (
                  <ClipLoader color="#4267b2" />
                ) : (
                  <span>{cartInfo?.subtotal?.formatted_with_code}</span>
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

          <div class="relative overflow-x-auto shadow-md w-full">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Image</span>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartInfo?.line_items?.map((item, index) => (
                  <CartItem item={item} key={index}  refetch={refetchCartInfo} />
                
                ))}
              </tbody>
            </table>
          </div>

        
        </div>
      </Helmet>
    </div>
  );
};

export default Cart;
