import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
// import Cart1 from "./components/Cart/Cart";

// import EmptyCart from "./components/Cart/Cart";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fectchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    // const cart = await commerce.cart.retrieve();
    // setCart(cart);
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productID, quantity) => {
    const item = await commerce.cart.add(productID, quantity);
    console.log(item + " Add1");

    setCart(item);
    console.log(item + " Add2");
  };
  const handleUpdateCartQty = async (productID, quantity) => {
    const item = await commerce.cart.update(productID, { quantity });
    console.log(item + " Update1");

    setCart(item);
    console.log(item + " Update2");
  };
  const handleRemoveFromCart = async (productID) => {
    const cart = await commerce.cart.remove(productID);
    console.log(cart + " remove1");
    setCart(cart);
    console.log(cart + " remove2");
  };
  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();
    console.log(cart + " Empty1");
    setCart(cart);
    console.log(cart + " Empty2");
  };

  useEffect(() => {
    fectchProducts();
    fetchCart();
  }, []);

  // console.log(cart.total_items);
  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}></Navbar>
        <Switch>
          <Route exact path="/">
            <Products
              products={products}
              onAddToCart={handleAddToCart}
            ></Products>
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            ></Cart>
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
