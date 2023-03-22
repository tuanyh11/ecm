import axios from "axios";
import { commerce } from "../lib/commerce";
import instanceAxios from "./config";
export const handleAddToCart = async ({id, quantity, variant = []}) => {
  await commerce.cart.add(id, quantity, {
    ...Object.fromEntries(variant.map((item) => Object.values(item))),
  });
};

export const handleUpdateCartQty = async (itemId, quantity) =>
  await commerce.cart.update(itemId, { quantity });

export const handleRemoveFromCart = async (productID) =>
  await commerce.cart.remove(productID);

export const handleEmptyCart = async () => await commerce.cart.empty();

export const refreshCart = async () => await commerce.cart.refresh();

export const getCartItems = async () => await commerce.cart.contents();

export const getCartInfo = async () => await commerce.cart.retrieve();

export const getProducts = async () => (await commerce.products.list()).data;


export const getProductById = async (id) =>
  await commerce.products.retrieve(id);

export const signUp = async (data) =>
  await instanceAxios.post("/users/sign-up", data);
export const signIn = async (data) =>
  await instanceAxios.post("/users/sign-in", data);

export const getListCountries = async (id) =>
  await commerce.services.localeListShippingCountries(id);
export const getOptionShipping = async ({ token, country, region }) =>
  await commerce.checkout.getShippingOptions(token, {
    country,
    region,
  });

export const getListSubdivision = async (id) =>
  await commerce.services.localeListSubdivisions(id);

export const generateToken = async (id) =>
  await commerce.checkout.generateToken(id, {
    type: " cart",
  });

export const sendOrder = async (data) => {
  await axios.post("http://localhost:5000/orders", data);
};

export const createCaptureCheckout = async ({checkoutTokenId, newOrder}) => {
  await commerce.checkout.capture(checkoutTokenId, newOrder);
}
  // 
