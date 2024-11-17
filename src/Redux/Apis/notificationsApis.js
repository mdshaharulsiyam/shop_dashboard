import { baseApi } from "../BaseUrl";

const notificationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get notifications
        getNotifications: builder.query({
            query: ({ page, limit }) => ({ url: `notification/get-notifications?page=${page || 1}&limit=${limit || 50}`, method: 'GET' }),
            providesTags: ['notification']
        }),
        // read notifications
        readSingleNotification: builder.mutation({
            query: ({ data }) => {
                return { url: `notification/update-notification`, body: data, method: 'PATCH', }
            },
            invalidatesTags: ['notification']
        }),
        // read all notifications
        readAllNotifications: builder.mutation({
            query: () => {
                return { url: `notification/read-all`, body: {}, method: 'PATCH', }
            },
            invalidatesTags: ['notification']
        }),
    })
})
export const {
    // useGetNotificationsQuery
    useGetNotificationsQuery,
    // useReadSingleNotificationMutation
    useReadSingleNotificationMutation,
    // useReadAllNotificationsMutation
    useReadAllNotificationsMutation
} = notificationsApi