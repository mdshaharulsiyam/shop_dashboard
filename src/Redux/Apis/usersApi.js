import { baseApi } from "../BaseUrl";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all user
        getAllUser: builder.query({
            query: ({ page, filter }) => {
                return {
                    url: `users?page=${page || 1}${filter?.email ? `&email=${filter?.email}` : ''}${filter?.search ? `&search=${filter?.search}` : ''}`,
                    method: 'GET'
                }
            },
            providesTags: ['users']
        }),
        // block user
        blockUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/block/${id}`,
                    method: 'PATCH',
                    body: {}
                }
            },
            invalidatesTags: ['users']
        })
    })
})

export const {
    // get all user 
    useGetAllUserQuery,
    //  block user
    useBlockUserMutation
} = userApi