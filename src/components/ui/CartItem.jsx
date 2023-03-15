import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import {
  updateItem,
  removeItem,
} from "../../redux/shopping-cart/cartItemsSlide";

import numberWithCommas from "../../utils/numberWithCommas";
import { Link } from "react-router-dom";
import { handleUpdateCartQty } from "../../api";

const CartItem = (props) => {
  console.log(props);

  const dispatch = useDispatch();

  const itemRef = useRef(null);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);

  const updateQuantity = (opt) => {
   if(opt === '+') {
    setQuantity(quantity + 1)
    handleUpdateCartQty(props?.item.id, quantity + 1);
   } else {
    setQuantity(quantity - 1)
    handleUpdateCartQty(props?.item.id, quantity - 1);
   }
    props?.refetch();
  };

  // const updateCartItem = () => {
  //     dispatch(updateItem({...item, quantity: quantity}))
  // }

  const removeCartItem = () => {
    console.log("removeCartItem");
    dispatch(removeItem(item));
  };

  const variant =
    item?.selected_options?.map((item) => item?.option_name) || [];

  // console.log(variant?.split(",", "-"))

  return (
    <div className="cart__item" ref={itemRef}>
      <div className="cart__item__image w-[150px] h-[150px]">
        <img className="w-full h-full" src={item?.image?.url} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/catalog/${item.slug}`}>{`${item?.name}`}</Link>
          <div className=" uppercase">
            {variant.map(
              (item, index) =>
                `${item} ${variant.length - 1 === index ? "" : "-"} `
            )}
          </div>
        </div>
        <div className="cart__item__info__price">
          {item?.price?.formatted_with_code}
        </div>
        <div className="cart__item__info__quantity">
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("-")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("+")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="cart__item__del">
          <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
