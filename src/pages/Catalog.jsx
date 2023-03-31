import React, { useCallback, useState, useEffect, useRef } from "react";

import Helmet from "../components/ui/Helmet";
import CheckBox from "../components/ui/CheckBox";

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

  // search
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

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
    // Nếu searchTerm khác rỗng, ta lọc sản phẩm trong temp dựa trên từ khóa tìm kiếm.
    if (searchTerm !== "") {
      temp = displayProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm)
      );
    }
    // Nếu filter.category có phần tử, ta lọc sản phẩm trong temp dựa trên danh mục sản phẩm đã được chọn.
    if (filter.category.length > 0) {
      temp = temp.filter((item) =>
        filter.category.some((c) =>
          item.categories.some((cate) => cate.slug === c)
        )
      );
    }
    // Nếu filter.color có phần tử, ta lọc sản phẩm trong temp dựa trên màu sắc đã được chọn.
    //  Trong quá trình lọc, ta sử dụng variants.options.some() để kiểm tra xem sản phẩm đó có tồn tại màu sắc được chọn hay không.
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
    // Nếu filter.size có phần tử, ta lọc sản phẩm trong temp dựa trên kích thước đã được chọn.
    // Tương tự với màu sắc, ta sử dụng variants.options.some() để kiểm tra xem sản phẩm có tồn tại kích thước được chọn hay không.
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
    // Cuối cùng, ta cập nhật danh sách sản phẩm được hiển thị bằng cách gọi setDisplayProducts(temp).
    setDisplayProducts(temp);
  }, [filter, products, searchTerm]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);
  // console.log(updateProducts);
  // console.log("updatePr");

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

  const loc = useLocation();

  // console.log(productList);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="my-[150px] lg:mt-[200px]">
      <Helmet title="Sản phẩm">
        <div className="catalog mt-[150px] lg:mt-[200px] mb-[100px] flex flex-wrap mx-[-15px]">
          <div
            className="catalog__filter w-full lg:w-6/12 px-[15px]"
            ref={filterRef}
          >
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
                {/* search */}
                <input
                  className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
                  type="text"
                  id="search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  ref={inputSearchRef}
                  placeholder="Search something.."
                />
                {/* search */}
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

          <div className="catalog__content w-full  lg:w-6/12 px-[15px] ">
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
    </div>
  );
};

export default Catalog;
