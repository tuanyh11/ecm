import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";




import Button from "./Button";

import { handleAddToCart } from "../../api";

const ProductView = (props) => {

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
    console.log(color, size)
   handleAddToCart({
    id: product.id,
    quantity,
    variant: [color, size].map(item => ({variantId: item?.variantId, optionId: item?.option.id}))
   })
  };

  const goToCart = () => {
    if (check()) {
      let newItem = {
        ...product,
        quantity: quantity,
      };
     
    }
  };

  const images1 = product?.image.url;

  useEffect(() => {
    setPreviewImg(images1);
    
  }, [product]);


  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
            {product?.assets?.map(image => {

                return (
                    <div
                        key={image?.url}
                        className="product__images__list__item"
                        onClick={() => setPreviewImg(image?.url)}
                    >
                        <img src={image?.url} alt="" />
                    </div>
                )
            })}
        
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product?.name}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {product?.price?.formatted_with_code}
          </span>
        </div>
        <div className="product__info__item">
          {product?.variant_groups?.map((item) => {

            const isColor = item?.name?.toLowerCase() === "color"
            return (
              <div key={item?.id}>
                <div className="product__info__item__title">{item?.name}</div>
                <div className="product__info__item__list">
                  {item?.options?.map((option, index) => (
                    <div
                      key={index}
                      className={`product__info__item__list__item ${
                        isColor ? (color?.option?.name === option?.name ? "active" : "" ): ( size?.option?.name === option?.name ? "active" : "")
                      }`}
                      onClick={() => {
                        isColor ? setColor({variantId: item?.id, option: option}) : setSize({variantId: item?.id, option: option})
                      }}
                    >
                      <div
                        className={`circle flex justify-center items-center`}
                        style={{
                          backgroundColor: `${option?.name?.toLowerCase()}`,
                        }}
                      >
                        {!isColor
                          ? option?.name
                          : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
          <Button onClick={() => goToCart()}>mua ngay</Button>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        ></div>
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
