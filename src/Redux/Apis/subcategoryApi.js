import { baseApi } from "../BaseUrl"; // Ensure this points to your base API configuration

const subcategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all subcategories with optional pagination
        getSubcategories: builder.query({
            query: (page = 1) => `subcategory?page=${page}`,
            providesTags: ['Subcategory'],
        }),

        // Add a new subcategory
        addSubcategory: builder.mutation({
            query: (data) => ({
                url: "subcategory/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Subcategory'],
        }),

        // Update an existing subcategory
        updateSubcategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `subcategory/update/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['Subcategory'],
        }),

        // Delete a subcategory
        deleteSubcategory: builder.mutation({
            query: (id) => ({
                url: `subcategory/delete/${id}`,
                method: "DELETE",
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
