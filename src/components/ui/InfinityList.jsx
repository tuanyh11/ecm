import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Grid from "./Grid";
import ProductCard from "./ProductCard";

const InfinityList = ({ data }) => {

 


//   console.log(products);

  return (
    <div >
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data?.map((item, index) => (
          <ProductCard
            key={index}
            img01={item?.image?.url}
            // img02={item.image02}
            name={item.name}
            price={item.price.formatted_with_code}
            slug={item.slug}
            id={item.id}
          />
        ))}
      </Grid>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
