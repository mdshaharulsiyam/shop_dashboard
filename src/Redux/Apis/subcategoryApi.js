import { baseApi } from "../BaseUrl"; // Ensure this points to your base API configuration

const subcategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all subcategories with optional pagination
        getSubcategories: builder.query({
            query: (page = 1) => `sub-category/all?page=${page}`,
            providesTags: ['Subcategory'],
        }),

        // Add a new subcategory
        addSubcategory: builder.mutation({
            query: (data) => ({
                url: "sub-category/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Subcategory'],
        }),

        // Update an existing subcategory
        updateSubcategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `sub-category/update/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['Subcategory'],
        }),

        // Delete a subcategory
        deleteSubcategory: builder.mutation({
            query: ({ id, categoryId }) => ({
                url: `sub-category/delete/${id}`,
                method: "DELETE",
                body: { categoryId }
            }),
            invalidatesTags: ['Subcategory'],
        }),
    }),
});

export const {
    useGetSubcategoriesQuery,
    useAddSubcategoryMutation,
    useUpdateSubcategoryMutation,
    useDeleteSubcategoryMutation,
} = subcategoryApi;
