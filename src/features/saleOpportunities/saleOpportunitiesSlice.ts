import { TagDescription } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import { SaleOpportunity } from '../../models/saleOpportunity.model';

type TNewSaleOpportunity = {
    name: string;
    status: 'NEW' | 'CLOSED_WON' | 'CLOSED_LOST';
    customerUUID: string;
};

type TUpdateSaleOpportunity = TNewSaleOpportunity & {
    uuid: string;
};

type TSaleOpportunity = {
    uuid: string;
};

type TDeleteSaleOpportunity = {
    uuid: string;
};

type QueryArg = void;
type ResultType = {
    data: SaleOpportunity[];
    message: string;
};

const RESOURCE_ENDPOINT = '/sales-opportunity';

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSaleOpportunities: builder.query<ResultType, QueryArg>({
            query: () => RESOURCE_ENDPOINT,
            providesTags: (result = { data: [], message: '' }, error, arg): TagDescription<"SaleOpportunities">[] => {
                const tags: TagDescription<"SaleOpportunities">[] = [];

                if (result && result.data) {
                    tags.push({ type: 'SaleOpportunities', id: 'LIST' });

                    result.data.forEach((item) => {
                        tags.push({ type: 'SaleOpportunities', id: item.uuid });
                    });
                }

                return tags;
            },
        }),
        getSaleOpportunity: builder.query({
            query: (saleOpportunity: TSaleOpportunity,) => ({
                url: `${RESOURCE_ENDPOINT}/${saleOpportunity.uuid}`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: 'SaleOpportunities', id: arg.uuid }]
        }),
        createSaleOpportunity: builder.mutation({
            query: (saleOpportunity: TNewSaleOpportunity) => ({
                url: RESOURCE_ENDPOINT,
                method: 'POST',
                body: saleOpportunity,
            }),
            invalidatesTags: ['SaleOpportunities'],
        }),
        updateSaleOpportunity: builder.mutation({
            query: (saleOpportunity: TUpdateSaleOpportunity) => ({
                url: RESOURCE_ENDPOINT,
                method: 'PUT',
                body: saleOpportunity,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'SaleOpportunities', id: arg.uuid }]
        }),
        deleteSaleOpportunity: builder.mutation({
            query: (saleOpportunity: TDeleteSaleOpportunity) => ({
                url: `${RESOURCE_ENDPOINT}/${saleOpportunity.uuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'SaleOpportunities', id: arg.uuid }]
        }),
    }),
});

export const {
    useGetSaleOpportunitiesQuery,
    useGetSaleOpportunityQuery,
    useCreateSaleOpportunityMutation,
    useUpdateSaleOpportunityMutation,
    useDeleteSaleOpportunityMutation,
} = extendedApiSlice;