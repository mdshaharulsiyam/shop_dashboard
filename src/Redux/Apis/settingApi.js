import { baseApi } from "../BaseUrl";

const settingApi = baseApi.injectEndpoints({
    // add Privacy  terms privacy
    endpoints: (build) => ({
        addAboutTermsPrivacy: build.mutation({
            query: (data) => ({
                url: 'settings/update-settings',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['settings']
        }),
        getAboutTermsPrivacy: build.query({
            query: (type) => ({
                url: `settings/get-settings/${type}`,
                method: 'GET'
            }),
            providesTags: ['settings']
        })
    })
})
export const {
    // add about
    useAddAboutTermsPrivacyMutation,
    // get about
    useGetAboutTermsPrivacyQuery
} = settingApi