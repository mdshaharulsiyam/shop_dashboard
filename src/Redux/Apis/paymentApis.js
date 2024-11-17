import toast from "react-hot-toast";
import { baseApi } from "../BaseUrl";

const paymentApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // give doctor payment
        transferbalance: builder.mutation({
            query: ({ doctorId, appointmentId }) => {
                if (!appointmentId || !doctorId) {
                    toast.error(`please select ${appointmentId ? 'doctor' : 'appointment'} id`)
                    return false
                } else {
                    return {
                        url: `payment/transfer-ballance`,
                        method: 'POST',
                        body: { doctorId, appointmentId }
                    }
                }

            },
            invalidatesTags: ['appointment', 'payment']
        }),
        // get payment history
        getPaymentHistory: builder.query({
            query: ({ page }) => {
                return {
                    url: `payment/user-payment-history?page=${page || 1}`,
                    method: 'GET'
                }
            },
            providesTags: ['payment']
        }),
        // get payment history overview
        getPaymentHistoryOverview: builder.query({
            query: () => {
                return {
                    url: `payment/income-overview`,
                    method: 'GET'
                }
            },
            providesTags: ['payment']
        }),
    })
})

export const {
    //useTransferbalanceMutation
    useTransferbalanceMutation,
    // useGetPaymentHistoryQuery
    useGetPaymentHistoryQuery,
    // useGetPaymentHistoryOverviewQuery
    useGetPaymentHistoryOverviewQuery
} = paymentApis