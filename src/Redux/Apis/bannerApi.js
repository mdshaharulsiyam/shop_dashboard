import { baseApi } from "../BaseUrl";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // add Banner
        addBanner: builder.mutation({
            query: (data) => {
                return {
                    url: 'banner/create-banner',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['banner']
        }),
        // update Banner
        updateBanner: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `banner/update-banner/${id}`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['banner']
        }),
        // update active status
        updateBannerStatus: builder.mutation({
            query: (id) => {
                return {
                    url: `banner/activate-deactivate-banner/${id}`,
                    method: 'POST',
                }
            },
            invalidatesTags: ['banner']
        }),
        // get Banner
        getBanner: builder.query({
            query: (page) => {
                return {
                    url: `banner/get-banners?page=${page || 1}&order=asc&sort=order`,
                    method: 'GET',
                }
            },
            providesTags: ['banner']
        }),

        // delete Banner
        deleteBanner: builder.mutation({
            query: (id) => {
                return {
                    url: `banner/delete-banner/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['banner']
        }),
        // update Banner
        updateBannerOrder: builder.mutation({
            query: (data) => {
                return {
                    url: 'banner/update-banner-order',
                    method: 'PATCH',
                    body: data
                }
            },
            invalidatesTags: ['banner']
        })
    })
})
export const {
    // add Banner
    useAddBannerMutation,
    // update category
    useUpdateBannerMutation,
    // get Banner
    useGetBannerQuery,
    // delete Banner 
    useDeleteBannerMutation,
    // update active status
    useUpdateBannerStatusMutation,
    // update Banner
    useUpdateBannerOrderMutation
} = categoryApi