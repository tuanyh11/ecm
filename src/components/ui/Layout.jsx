import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";

import Router from "../../routes/Routes";
import Home from "../../pages/Home";
import Product from "../../pages/Product";
import Catalog from "../../pages/Catalog";
import Login from "../../pages/Login";
import SignUp from "../../pages/Signup";
import Cart from "../../pages/Cart";
import Order from "../../pages/Order/Order";

const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
        <div className="pt-[300px] pb-[100px] container m-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:slug" element={<Product />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/search" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
