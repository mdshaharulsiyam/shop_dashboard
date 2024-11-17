import { baseApi } from "../BaseUrl";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // add category
        addCategory: builder.mutation({
            query: (data) => {
                return {
                    url: 'category/create-category',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['category']
        }),
        // update category
        updateCategory: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `category/update-category/${id}`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['category']
        }),
        // get category
        getCategory: builder.query({
            query: (page) => {
                return {
                    url: `category?page=${page || 1}`,
                    method: 'GET',
                }
            },
            providesTags: ['category']
        }),

        // delete category
        deleteCategory: builder.mutation({
            query: (id) => {
                return {
                    url: `category/delete-category/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['category']
        }),

    })
})
export const {
    // add category
    useAddCategoryMutation,
    // update category
    useUpdateCategoryMutation,
    // get category
    useGetCategoryQuery,
    // delete category 
    useDeleteCategoryMutation
} = categoryApi