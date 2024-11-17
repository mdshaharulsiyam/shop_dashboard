import React from 'react'

const ChartsHeading = ({ heading, growthData }) => {
    return (
        <div>
            <p className='heading'>{heading}</p>
            <div className='start-center gap-4 mt-2'>
                {
                    growthData?.map((item,i)=><div key={i} className='start-start flex-col gap-1'>
                        <p>{item?.name}</p>
                        <p>{item?.total}</p>
                    </div>)
                }
            </div>
        </div>
    )
}

export default ChartsHeading
