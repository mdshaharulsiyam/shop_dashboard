import React from 'react'
import Sidebar from '../Components/Shared/Sidebar'
import Header from '../Components/Shared/Header'
import { Outlet } from 'react-router-dom'
import { useGetProfileQuery } from '../Redux/Apis/authApi'
import VendorSidebar from '../Components/Shared/VendorSidebar'
const Dashboard = () => {
    const { data, isLoading, isError, error, isFetching } = useGetProfileQuery()
    return (
        <div className='flex justify-between items-center gap-0 h-screen overflow-y-scroll'>
            <div className='w-[300px] h-screen overflow-y-scroll pb-10 box-border bg-[var(--primary-bg)]'>
                {
                    isLoading ? <></> : data?.data?.role == 'VENDOR' ? <VendorSidebar /> : <Sidebar />
                }
            </div>
            <div className='w-[calc(100%-300px)] h-screen'>
                <Header />
                <div className='w-full p-5 rounded-md h-[calc(100dvh-110px)] overflow-y-scroll'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
