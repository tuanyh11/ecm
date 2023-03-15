import React from "react";

import Helmet from "../components/ui/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/ui/Section";
import Grid from "../components/ui/Grid";
import ProductCard from "../components/ui/ProductCard";
import ProductView from "../components/ui/ProductView";

import { commerce } from "../lib/commerce";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";

const Product = () => {
  const id = useParams()?.slug;

  const [{data: productDetail}, {data: products}] = useQueries({
    queries: [
      {
        queryKey: ["product-id", id],
        queryFn: async () => await commerce.products.retrieve(id),
        refetchOnWindowFocus: false
      },
      {
        queryKey: ["product-related", id],
        queryFn: async () => await commerce.products.list({ limit: 4 }),
        refetchOnWindowFocus: false
      },
    ]
  });

  return (
    <Helmet title={productDetail?.data?.title}>
      <Section>
        <SectionBody>
          <ProductView product={productDetail} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {products?.data?.map((item, index) => (
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
