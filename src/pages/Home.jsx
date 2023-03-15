import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Helmet from "../components/ui/Helmet";
import HeroSlider from "../components/ui/HeroSlider";
import Section, { SectionTitle, SectionBody } from "../components/ui/Section";
import PolicyCard from "../components/ui/PolicyCard";
import Grid from "../components/ui/Grid";
import ProductCard from "../components/ui/ProductCard";

import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "../assets/fake-data/policy";
import productData from "../assets/fake-data/products";

import banner from "../assets/images/banner.png";
import { commerce } from "../lib/commerce";
import { useQuery} from "@tanstack/react-query";

const Home = () => {

  const fectchProducts = async () => {
    const { data } = await commerce.products.list();
    return data
  };

  const {data: products} = useQuery({
    queryKey: ['product'],
    queryFn: fectchProducts
  })


  console.log(products)

  return (
    <Helmet title="Trang chủ">
      {/* hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={true}
        timeOut={3000}
      />
      {/* end hero slider */}

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to="/policy">
                {/* <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                /> */}
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}

      {/* best selling section */}
      <Section>
        <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {products?.slice(0, 4).map((item, index) => {
    

              return (
                <ProductCard
                  key={index}
                  img01={item.image.url}
                  // img02={item.image02}
                  name={item.name}
                  price={item.price.formatted_with_code}
                  slug={item.slug}
                  id={item.id}
                />
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
      {/* end best selling section */}

      {/* new arrival section */}
      <Section>
        <SectionTitle>sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {products?.slice(0, 6).map((item, index) => (
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
      {/* end new arrival section */}

      {/* banner */}
      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section>
      {/* end banner */}

      {/* popular product section */}
      <Section>
        <SectionTitle>phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
          {products?.slice(0, 8).map((item, index) => (
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
      {/* end popular product section */}
    </Helmet>
  );
};

export default Home;
