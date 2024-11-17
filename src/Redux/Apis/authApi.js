import { baseApi } from "../BaseUrl";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // user login
        loginUser: builder.mutation({
            query: (data) => {
                return {
                    url: 'auth/sign-in',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['auth', 'category']
        }),
        // send verify email
        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    url: 'auth/send-verify-email',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['auth']
        }),
        // verify code 
        verifyCode: builder.mutation({
            query: (data) => {
                return {
                    url: 'auth/verify-code',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['auth']
        }),
        // reset password 
        resetPassword: builder.mutation({
            query: (data) => {
                return {
                    url: 'auth/reset-password',
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: `Bearer ${JSON.parse((localStorage.getItem('accessToken'))) || ""}`,
                    }
                }
            },
            invalidatesTags: ['auth']
        }),
        // change password 
        changePassword: builder.mutation({
            query: (data) => {
                return {
                    url: 'auth/change-password',
                    method: 'PATCH',
                    body: data
                }
            },
            invalidatesTags: ['auth']
        }),
        // update user 
        updateUser: builder.mutation({
            query: (data) => {
                return {
                    url: 'auth/update-user',
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['auth']
        }),
        // update Doctor 
        updateDoctor: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `auth/update-doctor/${id}`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['auth']
        }),
        // get profile 
        getProfile: builder.query({
            query: () => {
                const token = localStorage.getItem('token');
                if (token) {
                    return {
                        url: 'auth/profile',
                        method: 'GET',
                    };
                } else {
                    console.log('No token found, API not called.');
                    return null;
                }
            },
            providesTags: ['auth'],
        })
    })
})
export const {
    //user login
    useLoginUserMutation,
    // send verify email
    useForgetPasswordMutation,
    // verify code
    useVerifyCodeMutation,
    //reset password 
    useResetPasswordMutation,
    //change password
    useChangePasswordMutation,
    // update user 
    useUpdateUserMutation,
    // update doctor
    useUpdateDoctorMutation,
    // get profile 
    useGetProfileQuery,
} = authApi