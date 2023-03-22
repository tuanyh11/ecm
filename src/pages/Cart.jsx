import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Helmet from "../components/ui/Helmet";
import CartItem from "../components/ui/CartItem";
import Button from "../components/ui/Button";

import productData from "../assets/fake-data/products";
import numberWithCommas from "../utils/numberWithCommas";
import { useIsFetching, useMutation, useQuery } from "@tanstack/react-query";
import { getCartInfo, getCartItems, handleRemoveFromCart } from "../api";
import { ClipLoader } from "react-spinners";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value);

  const [cartProducts, setCartProducts] = useState(
    productData.getCartItemsInfo(cartItems)
  );

  const isFetching = useIsFetching()

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems));
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);

  const {
    data: cartInfo,
    refetch,
    status
  } = useQuery({
    queryKey: ["get-cart-info"],
    queryFn: getCartInfo,
    refetchOnWindowFocus: false
  });

  const {mutate} = useMutation(handleRemoveFromCart)

  //   loading chậm cần cải thiện

  const handleRemoveItem = (id) => {
    mutate(id)
    refetch()
  }



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
          {cartInfo?.line_items?.map((item, index) => (
            <CartItem onRemove={handleRemoveItem} item={item} key={index} refetch={refetch} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
