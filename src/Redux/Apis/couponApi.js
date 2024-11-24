import { baseApi } from "../BaseUrl";

const couponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all coupons
        getCoupons: builder.query({
            query: () => "coupon/all?page=1", // Replace with your actual endpoint
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
                url: "coupon/create",
                method: "POST",
                body: newCoupon,
            }),
            invalidatesTags: ["Coupon"],
        }),

        // Update an existing coupon
        updateCoupon: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `coupon/update/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags: ['Coupon'],
        }),

        // Delete a coupon
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `coupon/delete/${id}`,
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
