import {apiSlice} from './apiSlice';
import { ORDERS_URL } from '../constants';

export const orderApiSlice =apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order},
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Orders'],
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Orders'],
        })
       
    }),
});

export const { useCreateOrderMutation,useGetOrderDetailsQuery } = orderApiSlice;
