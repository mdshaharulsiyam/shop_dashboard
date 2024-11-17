import { baseApi } from "../BaseUrl";

const faqApi = baseApi.injectEndpoints({
    // get all faq
    endpoints: (builder) => ({
        //get all faq
        getAllFaq: builder.query({
            query: () => ({
                url: `faq/get-faqs`,
                method: "GET",
            }),
            providesTags: ['faq']
        }),
        // add faq
        addFaq: builder.mutation({
            query: (data) => {
                return {
                    url: 'faq/create-faq',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['faq']
        }),
        // delete faq
        deleteFaq: builder.mutation({
            query: (id) => {
                return {
                    url: `faq/delete-faq/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['faq']
        })
    }),
})
export const {
    // get all faq
    useGetAllFaqQuery,
    // add faq
    useAddFaqMutation,
    // delete faq
    useDeleteFaqMutation
} = faqApi