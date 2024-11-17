import React from 'react'
import AppointmentTable from '../Shared/AppointmentTable'
import { useGetAppointmentQuery } from '../../Redux/Apis/appoinmentApis'
import Loading from '../Shared/Loading'

const NewAppointment = () => {
    const { data, isLoading } = useGetAppointmentQuery({ page: 1 })
    return (
        <>
            {
                isLoading && <Loading />
            }
            <AppointmentTable pagination={false} data={data?.data?.slice(0, 5)} />
        </>
    )
}

export default NewAppointment
