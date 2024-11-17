import { baseApi } from "../BaseUrl";

const appointmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get appointment
        getAppointment: builder.query({
            query: ({ page, filter }) => ({
                url: `appointment/get-my-appointments?page=${page || 1}${filter?.search ? `&search=${filter?.search}` : ''}${filter?.doctor_payment || filter?.doctor_payment === false ? `&doctor_payment=${filter?.doctor_payment}` : ''}${filter?.payment_status || filter?.payment_status === false ? `&payment_status=${filter?.payment_status}` : ''}${filter?.status ? `&status=${filter?.status}` : ''}`,
                method: 'GET'
            }),
            providesTags: ['appointment']
        }),
    })
})

export const {
    // useGetAppointmentQuery
    useGetAppointmentQuery
} = appointmentApi

