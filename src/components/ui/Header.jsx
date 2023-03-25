import React, { useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { commerce } from "../../lib/commerce";

import logo from "../../assets/images/Logo-2.png";
import { useQuery } from "@tanstack/react-query";
import { getCartInfo } from "../../api";
import useStore from "../../store/cart";

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

  const {useCartQuery, cart} = useStore()

  useCartQuery()
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

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__menu">
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
              <span className="w-6 h-6 text-center text-sm  leading-[24px] absolute text-white bg-main rounded-full -top-2 -right-4">
                {cart?.total_items}
              </span>
            </NavLink>
            <NavLink
              to={"/login"}
              className="header__menu__item header__menu__right__item"
            >
              <i className="bx bx-user"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
