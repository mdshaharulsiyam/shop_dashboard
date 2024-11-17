import { baseApi } from "../BaseUrl";

const doctorApis = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        // get all doctor
        getAllDoctor: builder.query({
            query: ({ page, filter }) => ({
                url: `doctors?page=${page || 1}${filter?.block || filter?.block === false ? `&block=${filter?.block}` : ''}${filter?.search ? `&search=${filter?.search}` : ''}${filter?.approved || filter?.approved === false ? `&approved=${filter?.approved}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['doctor']
        }),
        // approve block doctor
        approveDoctor: builder.mutation({
            query: ({ id, field }) => ({
                url: `doctors/block/${id}`,
                method: 'PATCH',
                body: { field }
            }),
            invalidatesTags: ['doctor']
        }),
        // delete doctor
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `doctors/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['doctor']
        }),
    })
})
export const {
    // get all doctor
    useGetAllDoctorQuery,
    // approve block doctor
    useApproveDoctorMutation,
    // delete doctor
    useDeleteDoctorMutation
} = doctorApis