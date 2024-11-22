import React, { useRef, useState, useEffect } from 'react';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoSettings } from 'react-icons/io5';
import Button from './Button';
import { MdArrowForwardIos } from 'react-icons/md';
import { HiLogout } from 'react-icons/hi';
import { VendorSidebarLink } from '../../Utils/Sideber/SidebarLink';

const VendorSidebar = () => {
    // State
    const location = useLocation()
    const [open, setOpen] = useState(false);
    const [setting_active, set_setting_active] = useState(false)
    const navigate = useNavigate()
    const ref = useRef(null);
    const toggleHandler = () => {
        setOpen(!open);
    };
    // effects 
    // active parents by targeting children
    useEffect(() => {
        if (!ref.current) return
        if (ref.current.querySelector('.active')) {
            setOpen(true);
            set_setting_active(true);
        } else {
            set_setting_active(false);
        }
    }, [ref, location.pathname])
    return (
        <div className='px-4 pb-10 flex justify-start flex-col gap-3 sidebar'>
            <p className='text-6xl text-center text-[var(--bg-white)] my-4 font-bold'></p>
            {VendorSidebarLink?.map((item) => (
                <NavLink onClick={() => { setOpen(false); set_setting_active(false) }} to={item?.path}
                    style={{
                        width: '100%',
                        justifyContent: 'start',
                        paddingLeft: '14px',
                        paddingRight: '14px',
                    }}
                    className='button-white w-full whitespace-nowrap links'
                    key={item?.path}
                >
                    {item?.icon} {item?.label}
                </NavLink>
            ))}
            <div
                ref={ref}
                className={`flex justify-start flex-col gap-1 transition-all duration-300 overflow-y-hidden`}
                style={{
                    height: open ? `${ref.current.scrollHeight}px` : '0',
                }}
            >
            </div>
            <button onClick={() => {
                localStorage.removeItem('token')
                return navigate(`/login`)
            }}
                style={{
                    width: '100%',
                    justifyContent: 'start',
                    paddingLeft: '14px',
                    paddingRight: '14px',
                    border: 'none',
                }}
                className='button-white w-full whitespace-nowrap links'
            >
                <HiLogout />  Logo Out
            </button>
        </div >
    );
}

export default VendorSidebar
