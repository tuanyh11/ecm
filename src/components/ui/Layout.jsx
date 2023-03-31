import React, { useMemo } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
// import ProductViewModal from "./ProductViewModal";

import Home from "../../pages/Home";
import Product from "../../pages/Product";
import Catalog from "../../pages/Catalog";
import Login from "../../pages/Login";
import SignUp from "../../pages/Signup";
import Cart from "../../pages/Cart";
import Order from "../../pages/Order/Order";
import { useQuery } from "@tanstack/react-query";
import { getCartInfo } from "../../api";
import useStore from "../../store/cart";
import useUserInfo from "../../store/userInfo";

const Layout = () => {
  const data = useQuery({
    queryKey: ["get-cart-info"],
    queryFn: getCartInfo,
    refetchOnWindowFocus: false,
  });

  const { user } = useUserInfo();
  console.log(1, user);
  const routes = useMemo(() => {
    return (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:slug" element={<Product />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        ></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/order" element={<Order />} />
        <Route path="/search" element={<Catalog />} />
      </>
    );
  }, [user]);
  return (
    <BrowserRouter>
      <Header {...data} />
      <div className="container m-auto">
        <Routes>
          <Route path="/cart" element={<Cart {...data} />} />
          {routes}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
