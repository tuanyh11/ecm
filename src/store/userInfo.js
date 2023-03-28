import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import {create} from 'zustand';
import { getCartInfo } from '../api';
import {persist} from 'zustand/middleware'

const useUserInfo = create(persist((set, get) => ({
    user: null,
    login(userInfo) {
        set((state) => ({user: userInfo}))
    }
}), {
    name: 'USER_INFO',
}));

export default useUserInfo;

