import React, { Suspense } from 'react';
import { FaUserDoctor } from 'react-icons/fa6';
import { GrMoney } from 'react-icons/gr';
import { useGetDashboardDataQuery } from '../../Redux/Apis/dashboardApi';
import IncomeCard from '../Dashboard/IncomeCard';
import IncomeOverView from '../Dashboard/IncomeOverView';
import Loading from '../Shared/Loading';

const VendorHome = () => {
  const { data, isLoading } = useGetDashboardDataQuery();
  const formatData = [
    {
      name: 'Total Product',
      icon: <GrMoney size={36} />,
      total: data?.data?.totalProduct || 0
    },
    {
      name: 'Total Order',
      icon: <FaUserDoctor size={36} />,
      total: data?.data?.totalOrder || 0
    },

  ]
  return (
    <div className='bg-[var(--bg-gray-20)] p-4 rounded-md'>
      {
        isLoading && <Loading />
      }
      <div className='grid-2 gap-3'>
        {
          formatData?.map((item, i) => <div key={i} className='w-full h-full rounded-md p-4 py-6 bg-[var(--bg-white)]'>
            <IncomeCard item={item} />
          </div>)
        }
      </div>
      <div className='grid-2 gap-3 mt-5'>
        <Suspense fallback={''}>
          <IncomeOverView key={"product overview"} chartData={data?.data?.productGrowth} />
        </Suspense>
        <Suspense fallback={''}>
          {/* <AppointmentsOverview /> */}
          <IncomeOverView key={"oder overview"} chartData={data?.data?.orderGrowth} title='Order Overview' />
        </Suspense>
      </div>
      {/* <div className='bg-[var(--bg-white)] p-4 rounded-md mt-5'>
        <div className='between-center mb-3'>
          <p className='heading'>New Appointment</p>
          <Link className='text-[var(--color-blue)]' to={`/appointment`}>
            View all
          </Link>
        </div>
        <Suspense fallback={''}>
           <NewAppointment /> 
        </Suspense>
      </div> */}
    </div>
  )
}

export default VendorHome
