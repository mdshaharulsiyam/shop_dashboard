import { baseApi } from '../BaseUrl';
export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (params) => ({
                url: 'order/all',
                params,
            }),
            providesTags: ['Orders'],
        }),
        OrdersDetails: builder.query({
            query: (id) => ({
                url: `order/details/${id}`,
                method: "GET"
            }),
            providesTags: ['Orders'],
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: 'order/create',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['Orders'],
        }),
        updateOrder: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `order/update/${id}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: ['Orders'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `order/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orders'],
        }),
        updateDeliveryStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `order/update-delivery-status/${id}`,
                method: 'PATCH',
                body: { deliveryStatus: status },
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});

export const {
    useGetAllOrdersQuery,
    useOrdersDetailsQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useUpdateDeliveryStatusMutation,
} = orderApi;
