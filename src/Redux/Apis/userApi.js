import { baseApi } from "../BaseUrl";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Endpoint to get all users
        getAllUsers: builder.query({
            query: (search) => ({
                url: 'auth/admin-get-all-user',
                method: 'GET',
                params: { search }
            }),
            providesTags: ['user'],
        }),

        // Endpoint to block/unblock a user
        blockUser: builder.mutation({
            query: (id) => ({
                url: `auth/admin-block-user/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['user'],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useBlockUserMutation,
} = userApi;

export default userApi;
