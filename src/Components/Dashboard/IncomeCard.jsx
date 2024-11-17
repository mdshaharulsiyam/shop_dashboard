import React from 'react'

const IncomeCard = ({ item }) => {
    return (
        <div className='center-center flex-col gap-3'>
            <p className='text-xl font-medium leading-7'>{item?.name}</p>
            {item?.icon}
            <p className='text-2xl leading-8 font-semibold'>{item?.total}</p>
        </div>
    )
}

export default IncomeCard
