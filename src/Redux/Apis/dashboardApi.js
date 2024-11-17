import { baseApi } from "../BaseUrl";

const dashboardApi = baseApi.injectEndpoints({
    //  get dashboard data 
    endpoints: (builder) => ({
        getDashboardData: builder.query({
            query: () => ({ url: 'overview/admin-overview', method: 'GET' }),
            providesTags: ['dashboard']
        }),
        getIncomeOverview: builder.query({
            query: (year) => ({ url: `overview/income-overview?year=${year}`, method: 'GET' }),
            providesTags: ['dashboard']
        }),
        getAppointmentOverview: builder.query({
            query: (year) => ({ url: `/overview/appointment-overview?year=${year}`, method: 'GET' }),
            providesTags: ['dashboard']
        }),
    })
});

export const {
    // useGetDashboardDataQuery
    useGetDashboardDataQuery,
    // useGetIncomeOverviewQuery
    useGetIncomeOverviewQuery,
    // useGetAppointmentOverviewQuery
    useGetAppointmentOverviewQuery

} = dashboardApi