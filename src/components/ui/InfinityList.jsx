import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Grid from "./Grid";
import ProductCard from "./ProductCard";

const InfinityList = ({ data }) => {
  console.log(data);

  return (
    <div>
      <div className="md:grid-cols-2 grid-cols-1 grid lg:grid-cols-3 gap-[20px] auto-rows-fr">
        {data?.map((item, index) => (
          <div key={item.id} className=" lg:col-span-1 ">
            <ProductCard
              img01={item?.image?.url}
              // img02={item.image02}
              name={item.name}
              slug={item.slug}
              id={item.id}
              {...item}
              price={item.price.formatted_with_code}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
