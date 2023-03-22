import React from 'react'

function OrderLeft({productsCart}) {
    return <div className=" space-y-3 rounded-lg border shadow bg-white px-2 py-4 sm:px-6">
      {productsCart?.map((product) => {
        const variant = product?.selected_options?.map(
          (option) => option?.option_name
        ) || [];
  
        return (
          <div
            key={product?.id}
            className="flex flex-col rounded-lg bg-white sm:flex-row"
          >
            <img
              className="m-[13px] h-full w-28 rounded-md border object-cover object-center"
              src={product.image.url}
              alt="" />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold text-lg">
                {product.name}
              </span>
              <span className="float-right ">
                {variant.map(
                  (item, index) => `${item} ${variant.length - 1 === index ? "" : "-"} `
                )}
              </span>
              <div className="">
                Quantity:
                <span className=" ml-2">{product.quantity}</span>
              </div>
              <p className="text-lg ">
                {" "}
                {product.price.formatted_with_code}
              </p>
            </div>
          </div>
        );
      })}
    </div>;
  }

export default OrderLeft