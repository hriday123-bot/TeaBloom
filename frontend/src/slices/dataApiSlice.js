import { DATA_URL } from "../constants";
import {apiSlice} from './apiSlice';

export const dataApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getData:builder.query({
            query:()=>({
                url:DATA_URL,
            }),
            keepUnusedDataFor:5   
        }),
        getDataById:builder.query({
            query:(id)=>({
                url:`${DATA_URL}/${id}`,
            }),
            keepUnusedDataFor:5,
            providesTags:['Data']
        }),

    }),
});
export const {useGetDataQuery,useGetDataByIdQuery} = dataApiSlice;