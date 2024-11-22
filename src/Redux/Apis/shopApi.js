import { baseApi } from "../BaseUrl";

const shopApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createShopRequest: builder.mutation({
            query: (newShopData) => ({
                url: 'shop/create-request',
                method: 'POST',
                body: newShopData,
            }),
            invalidatesTags: ['shop']
        }),

        // Endpoint to get all shops
        getAllShops: builder.query({
            query: () => 'shop/all-shop',
            providesTags: ['shop']
        }),

        // Endpoint to update a shop
        updateShop: builder.mutation({
            query: ({ id, updatedShopData }) => ({
                url: `shop/update/${id}`,
                method: 'PUT',
                body: updatedShopData,
            }),
            invalidatesTags: ['shop']
        }),

        // Endpoint to delete a shop
        deleteShop: builder.mutation({
            query: (id) => ({
                url: `shop/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['shop']
        }),

        // Endpoint to block/unblock a shop
        blockShop: builder.mutation({
            query: (id) => ({
                url: `shop/block/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['shop']
        }),
        ApproveShop: builder.mutation({
            query: (id) => ({
                url: `shop/approve/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['shop']
        }),
    }),
});

export const {
    useCreateShopRequestMutation,
    useGetAllShopsQuery,
    useUpdateShopMutation,
    useDeleteShopMutation,
    useBlockShopMutation,
} = shopApi;

export default shopApi;