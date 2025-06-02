import React from 'react'
import { useNavigate } from 'react-router-dom'
import profile from '../../assets/icons/itachi.jpg'
import { useSocketContext } from '../../Context/SocketContext'
import { useGetProfileQuery } from '../../Redux/Apis/authApi'
const Header = () => {
  //states
  const navigate = useNavigate()
  //  rtk query
  const { data } = useGetProfileQuery()
  const { notifications } = useSocketContext();
  const unreadNotifications = notifications?.filter((notification) => notification?.isRead === false);
  return (
    <div className='bg-[var(--bg-white-20)] end-center h-[110px] px-4 gap-6'>
      {/* <Badge onClick={() => navigate('/notification')} className='bg-[var(--bg-white)] rounded-full cursor-pointer' count={unreadNotifications.length || 0}>
                <IoIosNotifications size={40} />
            </Badge> */}
      <div onClick={() => {
        if (data?.data?.role == 'ADMIN' || data?.data?.role == 'SUPER_ADMIN') {
          navigate('/profile')
        } else if (data?.data?.role == 'VENDOR') {
          navigate('/vendor/shop-profile')
        }
      }} className='center-center gap-2 px-3 w-fit py-1 border border-[var(--bg-primary)] rounded-md cursor-pointer'>
        <img className='w-10 h-10 rounded-full object-cover' src={data?.data?.img ? `${data?.data?.img}` : profile} alt="" />
        <p className='text-base text-[var(--bg-primary)]'>{data?.data?.name}</p>
      </div>
    </div>
  )
}

export default Header
