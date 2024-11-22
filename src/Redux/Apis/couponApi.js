import { baseApi } from "../BaseUrl";

const couponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all coupons
        getCoupons: builder.query({
            query: () => "coupon/all", // Replace with your actual endpoint
            providesTags: ["Coupon"],
        }),

        // Fetch a single coupon by ID
        getCouponById: builder.query({
            query: (id) => `coupon/${id}`, // Replace with your actual endpoint
            providesTags: (result, error, id) => [{ type: "Coupon", id }],
        }),

        // Create a new coupon
        createCoupon: builder.mutation({
            query: (newCoupon) => ({
                url: "coupon/create", // Replace with your actual endpoint
                method: "POST",
                body: newCoupon,
            }),
            invalidatesTags: ["Coupon"],
        }),

        // Update an existing coupon
        updateCoupon: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `coupon/update/${id}`, // Replace with your actual endpoint
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Coupon", id }],
        }),

        // Delete a coupon
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `coupon/delete/${id}`, // Replace with your actual endpoint
                method: "DELETE",
            }),
            invalidatesTags: ["Coupon"],
        }),
    }),
});

export const {
    useGetCouponsQuery,
    useGetCouponByIdQuery,
    useCreateCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
} = couponApi;

export default couponApi;
