import { TagDescription } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import { Customer } from "../../models/customer.model";

type TNewCustomer = {
    firstName: string;
    lastName?: string;
    status: 'ACTIVE' | 'NON_ACTIVE' | 'LEAD';
    email: string;
};

type TUpdateCustomer = TNewCustomer & {
    uuid: string;
};

type TCustomer = {
    uuid: string;
};

type TDeleteCustomer = {
    uuid: string;
};


type QueryArg = void;
type ResultType = {
    data: Customer[];
    message: string;
};

const RESOURCE_ENDPOINT = '/customers';

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<ResultType, QueryArg>({
            query: () => RESOURCE_ENDPOINT,
            providesTags: (result = { data: [], message: '' }, error, arg): TagDescription<"Customers">[] => {
                const tags: TagDescription<"Customers">[] = [];

                if (result && result.data) {
                    tags.push({ type: 'Customers', id: 'LIST' });

                    result.data.forEach((item) => {
                        tags.push({ type: 'Customers', id: item.uuid });
                    });
                }

                return tags;
            },
        }),
        getCustomer: builder.query({
            query: (customer: TCustomer,) => ({
                url: `${RESOURCE_ENDPOINT}/${customer.uuid}`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: 'Customers', id: arg.uuid }]
        }),
        createCustomer: builder.mutation({
            query: (customer: TNewCustomer) => ({
                url: RESOURCE_ENDPOINT,
                method: 'POST',
                body: customer,
            }),
            invalidatesTags: ['Customers'],
        }),
        updateCustomer: builder.mutation({
            query: (customer: TUpdateCustomer) => ({
                url: RESOURCE_ENDPOINT,
                method: 'PUT',
                body: customer,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Customers', id: arg.uuid }]
        }),
        deleteCustomer: builder.mutation({
            query: (customer: TDeleteCustomer) => ({
                url: `${RESOURCE_ENDPOINT}/${customer.uuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Customers', id: arg.uuid }]
        }),
    }),
});

export const {
    useGetCustomersQuery,
    useGetCustomerQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = extendedApiSlice;