import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Helmet from "../components/ui/Helmet";
import CartItem from "../components/ui/CartItem";
import Button from "../components/ui/Button";

import { useIsFetching, useQuery } from "@tanstack/react-query";
import { getCartInfo, getCartItems } from "../api";
import { ClipLoader } from "react-spinners";

const Cart = () => {

  const isFetching = useIsFetching()

  const [totalProducts, setTotalProducts] = useState(0);


  const {
    data: cartInfo,
    refetch: refetchCartInfo,
    status
  } = useQuery({
    queryKey: ["get-cart-info"],
    queryFn: getCartInfo,
    refetchOnWindowFocus: false
  });

  //   loading chậm cần cải thiện

  const { data, refetch } = useQuery({
    queryKey: ["get-cart"],
    queryFn: getCartItems,
    onSuccess: () => {
      refetchCartInfo();
    },
    refetchOnWindowFocus: false
    
  });

  console.log(cartInfo)

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info !mt-0">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
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
            <Link to={"/order"} className="block mb-4" > <Button size="block">Đặt hàng</Button></Link>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {data?.map((item, index) => (
            <CartItem item={item} key={index} refetch={refetch} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
