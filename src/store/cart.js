import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import {create} from 'zustand';
import { getCartInfo } from '../api';

const useStore = create((set) => ({
  products: [],
  cart: {},
  updateCart: (cart) => {
    set(() => ({cart}))
  },
  setter: set,
  useCartQuery:  () => {
     
     const cartData  = useQuery({
      queryKey: ["get-cart-info"],
      queryFn: getCartInfo,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        set((state) => ({ cart: data}));
      },
      
    });
    const {data }= cartData
    useQuery({
      queryKey: ["get-cart-success"],
      queryFn: async () => cartData,
      onSuccess: ({ data, ...rest}) => {
        set((state) => ( {...state, ...rest}));
        // console.log(data);
      },
      enabled: Boolean(data)
    })
  }
}));

export default useStore;

