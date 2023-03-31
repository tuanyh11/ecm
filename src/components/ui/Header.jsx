import React, { useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { commerce } from "../../lib/commerce";

import logo from "../../assets/images/Logo-2.png";
import { useQuery } from "@tanstack/react-query";
import { getCartInfo } from "../../api";
import useStore from "../../store/cart";
import useUserInfo from "../../store/userInfo";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Phụ kiện",
    path: "/accessories",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const headerRef = useRef(null);

  const { useCartQuery, cart } = useStore();
  const { user, logout } = useUserInfo();

  useCartQuery();
  console.log(cart);

  useEffect(() => {
    const scrollTop = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", scrollTop);
    return () => {
      window.removeEventListener("scroll", scrollTop);
    };
  }, []);

  const menuLeft = useRef(null);

  console.log(user);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header " ref={headerRef}>
      <div className="container ">
        <div className="header__menu relative">
          <div className="header__menu__mobile-toggle " onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header__menu__right">
            <NavLink
              to={"/search?search=true"}
              className="header__menu__item header__menu__right__item"
            >
              <i className={"bx bx-search"}></i>
            </NavLink>
            <NavLink
              to={"/cart"}
              className="header__menu__item header__menu__right__item relative "
            >
              <i className="bx bx-shopping-bag"></i>
              <span className="w-7 h-7 text-center text-sm  leading-[24px] absolute text-white bg-main rounded-full -top-2 -right-4">
                {cart?.total_items}
              </span>
            </NavLink>
            {
              <div className="ml-10 group ">
                <NavLink
                  to={"/login"}
                  className="header__menu__item header__menu__right__item"
                >
                  <i className="bx bx-user"></i>
                </NavLink>
                <div className="absolute hidden group-hover:block after:absolute after:top-0 after:inset-x-0 after:-translate-y-full after:h-8    top-1/2 translate-y-10 right-0">
                  <div
                    className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  >
                    {user ? <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownHoverButton"
                    >
                      <li>
                        <div
                          
                          className="block px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {user?.email}
                        </div>
                      </li>
                      <li>
                        <div
                          
                          className="block px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </div>
                      </li>
                      <li>
                        <div
                          
                          className="block px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Earnings
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => logout()}
                          className="block px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </div>
                      </li>
                    </ul> :

                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownHoverButton"
                    >
                      <li>
                        <Link
                          to={"/login"}
                          className="block px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Login Now
                        </Link>
                      </li>
                      
                
                    </ul> }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
