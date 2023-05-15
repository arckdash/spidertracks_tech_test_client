import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'spidertracksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    tagTypes: ['Customers', 'SaleOpportunities'],
    endpoints: (builder) => ({})
})