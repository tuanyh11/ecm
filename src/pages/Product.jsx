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

  const [{ data: productDetail }, { data: products }] = useQueries({
    queries: [
      // Truy vấn 1: Lấy chi tiết sản phẩm dựa trên id.
      // Để thực hiện truy vấn này, đoạn mã sử dụng queryKey
      // để xác định truy vấn này là truy vấn "product-id" với id là tham số được truyền vào.
      //  Ngoài ra, nó sử dụng queryFn để định nghĩa hàm thực hiện truy vấn,
      //  sử dụng phương thức retrieve của đối tượng sản phẩm của Commerce.js.
      //  Các tùy chọn khác bao gồm refetchOnWindowFocus để không tự động gọi lại truy vấn khi cửa sổ được focus lại.
      {
        queryKey: ["product-id", id],
        queryFn: async () => await commerce.products.retrieve(id),
        refetchOnWindowFocus: false,
      },
      // Truy vấn 2: Lấy 4 sản phẩm liên quan đến sản phẩm đang xem.
      //  Để thực hiện truy vấn này, đoạn mã sử dụng queryKey
      // để xác định truy vấn này là truy vấn "product-related" với id là tham số được truyền vào.
      //  Ngoài ra, nó sử dụng queryFn để định nghĩa hàm thực hiện truy vấn,
      //  sử dụng phương thức list của đối tượng sản phẩm của Commerce.js.
      //  Các tùy chọn khác cũng bao gồm refetchOnWindowFocus để không tự động gọi lại truy vấn khi cửa sổ được focus lại.
      {
        queryKey: ["product-related", id],
        queryFn: async () => await commerce.products.list({ limit: 4 }),
        refetchOnWindowFocus: false,
      },
    ],
  });
  console.log(products);
  return (
    <div className="mb-[150px] lg:mt-[200px]">
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
    </div>
  );
};

export default Product;
