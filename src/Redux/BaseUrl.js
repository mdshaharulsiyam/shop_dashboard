import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseApi = createApi({
    reducerPath: 'medicalStartup',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://13.43.16.29:5000",
        headers: {
            Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["auth", 'category','doctor','banner'],
})