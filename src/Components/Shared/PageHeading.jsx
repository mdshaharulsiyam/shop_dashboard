import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const PageHeading = ({ text }) => {
    return (
        <div className='start-center gap-4'>
            <Link style={{
                padding:'10px',
                border:'none'
            }} to={-1} className='card-shadow button-white'>
                <IoArrowBackOutline size={24} />
            </Link>
            <p className='page-heading'>{text}</p>
        </div>
    )
}

export default PageHeading
