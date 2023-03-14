import React from "react";

import Helmet from "../components/ui/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/ui/Section";
import Grid from "../components/ui/Grid";
import ProductCard from "../components/ui/ProductCard";
import ProductView from "../components/ui/ProductView";

import productData from "../assets/fake-data/products";
import { useState } from "react";
import { useEffect } from "react";
import { commerce } from "../lib/commerce";
import { useParams } from "react-router-dom";

const Product = (props) => {
  const [product, setProduct] = useState(undefined);
  const [products, setProducts] = useState([]);
  const id = useParams()?.slug;

  const fetchProduct = async () => {
    const data = await commerce.products.retrieve(id);
    const data2 = await commerce.products.list({limit: 4});
    setProducts(data2.data);
    setProduct(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, []);

  console.log(product);

  return (
    <Helmet title={product?.title}>
      <Section>
        <SectionBody><ProductView product={product}/></SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {products.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image.url}
                // img02={item.image02}
                name={item.name}
                price={item.price.formatted_with_code}
                slug={item.slug}
                id={item.id}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
