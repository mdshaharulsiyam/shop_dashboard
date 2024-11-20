import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from '../Utils/BaseUrl'
export const baseApi = createApi({
    reducerPath: 'medicalStartup',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        headers: {
            Authorization: `Bearer ${JSON.parse((localStorage.getItem('token'))) || ""}`,
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["auth", 'category',],
})