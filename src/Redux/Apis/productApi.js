import { baseApi } from "../BaseUrl";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all products with pagination
        getAllProducts: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => ({
                url: `product/all?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Product"],
        }),

        // Fetch a single product by ID
        getProductById: builder.query({
            query: (id) => ({
                url: `product/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Product", id }],
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
                url: `product/${id}`,
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
        }),

        // Delete a product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;

export default productApi;
