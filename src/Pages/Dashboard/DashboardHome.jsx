import { Suspense } from 'react'
import { FaCircleUser, FaUserDoctor } from 'react-icons/fa6'
import { GrMoney } from 'react-icons/gr'
import { SlCalender } from 'react-icons/sl'
import IncomeCard from '../../Components/Dashboard/IncomeCard'
import IncomeOverView from '../../Components/Dashboard/IncomeOverView'
import AppointmentsOverview from '../../Components/Dashboard/AppointmentsOverview'
import { Link } from 'react-router-dom'
import NewAppointment from '../../Components/Dashboard/NewAppointment'
import { useGetDashboardDataQuery } from '../../Redux/Apis/dashboardApi'
import Loading from '../../Components/Shared/Loading'

const DashboardHome = () => {
    const { data, isLoading } = useGetDashboardDataQuery()

    const { pending, accepted, rejected, completed } = data?.data?.total_appointment || {}
    const formatData = [
        {
            name: 'Total Income',
            icon: <GrMoney size={36} />,
            total: `$${data?.data?.total_deduction.toFixed(2) || 0}`
        },
        {
            name: 'Total Doctor',
            icon: <FaUserDoctor size={36} />,
            total: data?.data?.total_doctor || 0
        },
        {
            name: 'Total Patient',
            icon: <FaCircleUser size={36} />,
            total: data?.data?.total_user || 0
        },
        {
            name: 'Total Appointment',
            icon: <SlCalender size={36} />,
            total: pending + accepted + rejected + completed || 0
        },
    ]
    return (
        <div className='bg-[var(--bg-gray-20)] p-4 rounded-md'>
            {
                isLoading && <Loading />
            }
            <div className='grid-4 gap-3'>
                {
                    formatData?.map((item, i) => <div key={i} className='w-full h-full rounded-md p-4 py-6 bg-[var(--bg-white)]'>
                        <IncomeCard item={item} />
                    </div>)
                }
            </div>
            <div className='grid-2 gap-3 mt-5'>
                <Suspense fallback={''}>
                    <IncomeOverView />
                </Suspense>
                <Suspense fallback={''}>
                    <AppointmentsOverview />
                </Suspense>
            </div>
            <div className='bg-[var(--bg-white)] p-4 rounded-md mt-5'>
                <div className='between-center mb-3'>
                    <p className='heading'>New Appointment</p>
                    <Link className='text-[var(--color-blue)]' to={`/appointment`}>
                        View all
                    </Link>
                </div>
                <Suspense fallback={''}>
                    <NewAppointment />
                </Suspense>
            </div>
        </div>
    )
}

export default DashboardHome
