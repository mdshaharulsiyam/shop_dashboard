import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const IncomeOverView = ({ chartData, title = "Product Overview" }) => {
  // states 

  const { jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec } = chartData || {}
  // chart
  const canvasRef = React.useRef(null);
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Data',
        data: [jan || 0, feb || 0, mar || 0, apr || 0, may || 0, jun || 0, jul || 0, aug || 0, sep || 0, oct || 0, nov || 0, dec || 0],
        borderColor: '#007bff',
        borderWidth: 2,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(0, 123, 255, 1)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
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
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  // chart end
  //data

  //handler
  return (//showSearch onSearch={(e)=>console.log(e)}
    <div className='w-full h-full bg-[var(--bg-white)] rounded-md p-4'>
      <p>{title}</p>
      {/* <Select className='min-w-32' defaultValue={income?.data?.currentYear} placeholder='select year' onChange={(year) => setYear(year)} options={income?.data?.total_years.map((item) => ({ value: item, label: item }))} /> */}
      <div className='h-[300px]'>
        <Line ref={canvasRef} data={data} options={options} />
      </div>
    </div>
  );
};


export default IncomeOverView
