import { baseApi } from "../BaseUrl";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all products with pagination
        getAllProducts: builder.query({
            query: ({ page = 1, limit = 10, search = "", isFeatured, isApproved } = {}) => {
                const params = new URLSearchParams();

                params.append("page", page);
                params.append("limit", limit);

                if (search) params.append("search", search);
                if (isFeatured !== undefined) params.append("isFeatured", isFeatured);
                if (isApproved !== undefined) params.append("isApproved", isApproved);

                return {
                    url: `product/all?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["Product"],
        }),


        // Fetch product details by ID
        getProductDetails: builder.query({
            query: (id) => ({
                url: `product/details/${id}`,
                method: "GET",
            }),
            providesTags: ['Product'],
        }),

        // Create a new product
        createProduct: builder.mutation({
            query: (newProductData) => ({
                url: "product/create",
                method: "POST",
                body: newProductData,
            }),
            invalidatesTags: ["Product"],
        }),

        // Update an existing product
        updateProduct: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `product/update/${id}`,
                method: "PATCH",
                body: updatedData,
                // For file upload, use FormData
            }),
            invalidatesTags: ['Product'],
        }),

        // Delete a product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `product/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),

        // Approve a product
        approveProduct: builder.mutation({
            query: (id) => ({
                url: `product/approve/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Product"],
        }),

        // Feature a product
        featureProduct: builder.mutation({
            query: (id) => ({
                url: `product/feature/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useApproveProductMutation,
    useFeatureProductMutation,
} = productApi;

export default productApi;
