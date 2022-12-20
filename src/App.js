import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from "./components";
import Profile from "./components/Test/Profile";
const App = () => {
  // console.log("qq");
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
    // console.log(productID);
    // console.log(quantity);

    // console.log(item);
    setCart(item);
    // setCart((await commerce.cart.add(productID, quantity)).cart);
    // console.log(await commerce.cart.add(productID, quantity));
    // console.log(await commerce.cart);
  };
  useEffect(() => {
    fectchProducts();
    fetchCart();
  }, []);

  // console.log(cart);
  return (
    <div>
      <Navbar totalItems={cart.total_items}></Navbar>
      {/* <Products products={products} onAddToCart={handleAddToCart}></Products> */}
      <Cart cart={cart}></Cart>
    </div>
  );
};

export default App;
