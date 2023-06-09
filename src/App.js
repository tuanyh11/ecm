// import React, { useState, useEffect } from "react";
// import { commerce } from "./lib/commerce";
// import { Products, Navbar, Cart, Checkout } from "./components";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Switch } from "react-router-dom";
// import './index.css'
// import Cart1 from "./components/Cart/Cart";

// import EmptyCart from "./components/Cart/Cart";
// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState({});
//   const [order, setOrder] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");

//   const fectchProducts = async () => {
//     const { data } = await commerce.products.list();
//     setProducts(data);
//   };

//   const fetchCart = async () => {
//     // const cart = await commerce.cart.retrieve();
//     // setCart(cart);
//     setCart(await commerce.cart.retrieve());
//   };

//   const handleAddToCart = async (productID, quantity) => {
//     const item = await commerce.cart.add(productID, quantity);
//     setCart(item);
//   };
//   const handleUpdateCartQty = async (productID, quantity) => {
//     const item = await commerce.cart.update(productID, { quantity });
//     console.log(item + " Update1");

//     setCart(item);
//     console.log(item + " Update2");
//   };
//   const handleRemoveFromCart = async (productID) => {
//      await commerce.cart.remove(productID);
//   };
//   const handleEmptyCart = async () => {
//     const cart = await commerce.cart.empty();
//     console.log(cart + " Empty1");
//     setCart(cart);
//     console.log(cart + " Empty2");
//   };

//   const refreshCart = async () => {
//     const newCart = await commerce.cart.refresh();
//     setCart(newCart);
//   };

//   const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
//     try {
    //   const incomingOrder = await commerce.checkout.capture(
    //     checkoutTokenId,
    //     newOrder
    //   );

//       setOrder(incomingOrder);
//       refreshCart();
//     } catch (error) {
//       setErrorMessage(error.data.error.message);
//     }
//   };

//   useEffect(() => {
//     fectchProducts();
//     fetchCart();
//   }, []);

//   // console.log(products);
//   return (
//     <Router>
//       <div>
//         <Navbar totalItems={cart.total_items}></Navbar>
//         <Switch>
//           <Route exact path="/">
//             <Products
//               products={products}
//               onAddToCart={handleAddToCart}
//             ></Products>
//           </Route>
//           <Route exact path="/cart">
//             <Cart
//               cart={cart}
//               handleUpdateCartQty={handleUpdateCartQty}
//               handleRemoveFromCart={handleRemoveFromCart}
//               handleEmptyCart={handleEmptyCart}
//             ></Cart>
//           </Route>
//           <Route exact path="/checkout">
//             <Checkout
//               cart={cart}
//               order={order}
//               onCaptureCheckout={handleCaptureCheckout}
//               error={errorMessage}
//             />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
