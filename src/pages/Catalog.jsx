import React, { useCallback, useState, useEffect, useRef } from "react";

import Helmet from "../components/ui/Helmet";
import CheckBox from "../components/ui/CheckBox";

import productData from "../assets/fake-data/products";
import category from "../assets/fake-data/category";
import Button from "../components/ui/Button";
import InfinityList from "../components/ui/InfinityList";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../api";

// console.log(category);

const Catalog = () => {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const inputSearchRef = useRef();

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);

  const [filter, setFilter] = useState(initFilter);

  const [size, setSize] = useState([]);
  const [colors, setColors] = useState([]);

  const [category, setCategory] = useState([]);
  // console.log(filter);

  const [searchTerm, setSearchTerm] = useState("");


  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.slug],
          });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item] });
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter((e) => e !== item.slug);
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item);
          setFilter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item);
          setFilter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const { isLoading, data: productList } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
    onSuccess: async (data) => {
      const colorOptions = new Set();
      const sizeOptions = new Set();
      const categories = [];
      data.forEach((product) => {
        product.categories.forEach((category) => {
          const existingCate = categories.find((c) => category.id === c.id);
          if (existingCate) return;
          categories.push(category);
        });
      });

      const products = [];

      for (const product of data) {
        const productDetail = await getProductById(product.id);
        products.push(productDetail);
        setProducts([...products]);
        setDisplayProducts([...products]);
        productDetail.variant_groups.forEach((variant) => {
          if (variant.name === "color") {
            variant.options.forEach((option) => colorOptions.add(option.name));
          } else if (variant.name === "size") {
            variant.options.forEach((option) =>
              sizeOptions.add(option.name.toUpperCase())
            );
          }
        });
      }

      setSize(Array.from(sizeOptions));
      setColors(Array.from(colorOptions));
      setCategory(categories);
    },
    refetchOnWindowFocus: false,
  });

  const updateProducts = useCallback(() => {
    let temp = products || [];

    if (searchTerm !== "") {
      temp = displayProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    )
    }

    if (filter.category.length > 0) {
      temp = temp.filter((item) =>
        filter.category.some((c) =>
          item.categories.some((cate) => cate.slug === c)
        )
      );
    }
    if (filter.color.length > 0) {
      console.log(temp);

      temp = temp.filter((item) => {
        const variants = item.variant_groups?.find((variant) => {
          if (variant.name === "color") {
            return true;
          }
          return false;
        });
        if (variants) {
          variants.options.some((option) =>
            filter.color.some((c) => console.log(c, option.name))
          );
          return variants.options.some((option) =>
            filter.color.some((c) => c === option.name)
          );
        }
        return false;
      });
    }
    if (filter.size.length > 0) {
      temp = temp.filter((item) => {
        const variants = item.variant_groups?.find((variant) => {
          if (variant.name === "size") {
            return true;
          }
          return false;
        });
        if (variants) {
          variants.options.some((option) =>
            filter.size.some((c) => console.log(c, option.name))
          );
          return variants.options.some((option) =>
            filter.size.some((c) => c === option.name.toUpperCase())
          );
        }
        return false;
      });
    }
    setDisplayProducts(temp);
  }, [filter, products, searchTerm]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

  const loc = useLocation();

  //search from name
  // console.log(productList);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const query = Object.fromEntries(new URLSearchParams(loc.search).entries());
    if (Boolean(query?.search)) {
      inputSearchRef.current.focus();
    }
  }, [loc]);

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // console.log(results);
    setSearchResults(results);
  }, [searchTerm, products]);

  console.log(filter);

  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className=" shadow-lg mb-[2rem] overflow-hidden ">
            <div className="relative flex items-center w-full h-14 focus-within:shadow-lg  focus-within:border-[#4267b2] border-2 bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
                type="text"
                id="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={inputSearchRef}
                placeholder="Search something.."
              />
            </div>
          </div>
          <div
            className="catalog__filter__close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {category.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.name}
                    onChange={(input) =>
                      filterSelect("CATEGORY", input.checked, item)
                    }
                    checked={filter.category.includes(item.slug)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">màu sắc</div>
            <div className="catalog__filter__widget__content">
              {colors.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item}
                    onChange={(input) =>
                      filterSelect("COLOR", input.checked, item)
                    }
                    checked={filter.color.includes(item)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">kích cỡ</div>
            <div className="catalog__filter__widget__content">
              {size.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item}
                    onChange={(input) =>
                      filterSelect("SIZE", input.checked, item)
                    }
                    checked={filter.size.includes(item)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size="sm" onClick={clearFilter}>
                xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            bộ lọc
          </Button>
        </div>
        <div className="catalog__content">
          {displayProducts?.length === 0 ? (
            <div className=" flex justify-center">
              <span className="text-lg">Khong co san pham nao</span>
            </div>
          ) : (
            <InfinityList data={displayProducts} />
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
