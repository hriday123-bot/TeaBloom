import { DATA_URL,UPLOAD_URL } from "../constants";
import {apiSlice} from './apiSlice';

export const dataApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getData:builder.query({
            query:()=>({
                url:DATA_URL,
            }),
            providesTags:['Data'], 
            keepUnusedDataFor:5,  
        }),
        getDataById:builder.query({
            query:(id)=>({
                url:`${DATA_URL}/${id}`,
            }),
            keepUnusedDataFor:5,
            providesTags:['Data']
        }),
        createData:builder.mutation({
            query:()=>({
                url:DATA_URL,
                method:'POST'
            }),
            invalidatesTags:['Data'],
        }),
        updateData:builder.mutation({
            query:(data)=>({
                url:`${DATA_URL}/${data.dataId}`,
                method:'PUT',
                body:data,
            }),
            invalidatesTags:['Data'],
        }),
        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:'POST',
                body:data,
            }),
            invalidatesTags:['Data'],
        }),
        deleteData:builder.mutation({
            query:(id)=>({
                url:`${DATA_URL}/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Data'],
        }),

    }),
});
export const {useGetDataQuery,
             useGetDataByIdQuery,
             useCreateDataMutation,
             useUpdateDataMutation,
             useUploadProductImageMutation,
             useDeleteDataMutation} = dataApiSlice;