import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);
import ChartsHeading from './ChartsHeading'
import { Select } from 'antd'
import { useGetAppointmentOverviewQuery } from '../../Redux/Apis/dashboardApi';

const AppointmentsOverview = () => {
    // states 
    const [year, setYear] = useState(new Date().getFullYear())
    // rtk query 
    const { data: appointment } = useGetAppointmentOverviewQuery(year)
    const { January, February, March, April, May, June, July, August, September, October, November, December } = appointment?.data?.monthlyData || {}
    // chart 
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Data',
                data: [January || 0, February || 0, March || 0, April || 0, May || 0, June || 0, July || 0, August || 0, September || 0, October || 0, November || 0, December || 0],
                backgroundColor: '#007bff',
                borderRadius: 5,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 200,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };
    // chart end
    //data
    const growthData = [
        {
            name: 'Yearly Growth',
            total: `${appointment?.data?.yearlyComparison}%`
        },
        {
            name: 'Monthly',
            total: `${appointment?.data?.monthlyComparison}%`
        },
        {
            name: 'Day',
            total: `${appointment?.data?.dailyComparison}%`
        },
    ]
    return (
        <div className='w-full h-full bg-[var(--bg-white)] rounded-md p-4'>
            <div className='between-center mb-6'>
                <ChartsHeading heading={`Appointments Overview`} growthData={growthData} />
                <Select defaultValue={appointment?.data?.currentYear} className='min-w-32' placeholder='select year' onChange={(year) => setYear(year)} options={appointment?.data?.total_years.map((item) => ({ value: item, label: item }))} />
            </div>
            <div className='h-[300px]'>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default AppointmentsOverview
