import { commerce } from "../lib/commerce";

export const handleAddToCart = async (data) => {
  await commerce.cart.add(data.id, data.quantity, {
    ...Object.fromEntries(data.variant.map(item => Object.values(item)))
  });

}

export const handleUpdateCartQty = async (itemId, quantity) =>
  await commerce.cart.update(itemId, { quantity });

export const handleRemoveFromCart = async (productID) =>
  await commerce.cart.remove(productID);

export const handleEmptyCart = async () => await commerce.cart.empty();

export const refreshCart = async () => await commerce.cart.refresh();


export const getCartItems = async () => await commerce.cart.contents()

export const getCartInfo = async () => await commerce.cart.retrieve()