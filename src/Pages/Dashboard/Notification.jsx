import PageHeading from '../../Components/Shared/PageHeading'
import Button from '../../Components/Shared/Button'
import { MdDelete } from 'react-icons/md'
import { useSocketContext } from '../../Context/SocketContext'
import Loading from '../../Components/Shared/Loading'
import { useReadAllNotificationsMutation, useReadSingleNotificationMutation } from '../../Redux/Apis/notificationsApis'


const Notification = () => {
    const { isLoadingNotifications, notifications, totalNotifications, setNotificationLimit, notificationLimit } = useSocketContext();
    //rtk query
    const [readSingleNotification] = useReadSingleNotificationMutation()
    const [readAllNotifications] = useReadAllNotificationsMutation()
    return (
        <div className='bg-[var(--bg-white-20)] p-4 rounded-md'>
            {
                isLoadingNotifications && <Loading />
            }
            <PageHeading text="Notifications" />
            <div className='between-center mt-5 mb-5'>
                <p className='heading '>Total {totalNotifications} Notifications</p>
                <div className='text-end'>
                    <Button style={{ padding: '10px 20px' }} text={"read all"} classNames="button-blue w-full mt-5 " handler={() => readAllNotifications()} ></Button>
                </div>
            </div>
            <div className='start-start gap-2 flex-col'>
                {
                    notifications?.map((item, i) => (
                        <div onClick={() => {
                            const data = { notificationIds: [item?._id] }
                            readSingleNotification({ data })
                        }} className={`grid-cols-7 w-full grid gap-4 card-shadow rounded-md p-2 cursor-pointer ${item?.isRead ? 'bg-[var(--bg-white)]' : 'bg-[var(--bg-gray-20)]'}`} key={i}>
                            <div className='between-center col-span-7 w-full gap-4'>
                                <div>
                                    <p className='font-medium'>{item?.title?.slice(0, 100)}</p>
                                    <p className='text-sm'>{item?.body?.slice(0, 100)}</p>
                                </div>
                                <div>
                                    <p className='text-xs'>{item?.createdAt?.split('T')?.[1]?.split('.')[0]}</p>
                                    <p className='text-xs'>{item?.createdAt?.split('T')[0]}</p>
                                </div>
                            </div>
                            {/* <Button style={{ padding: '10px' }} classNames="button-red w-fit ml-auto" icon={<MdDelete />}>
                 
                            </Button> */}
                        </div>
                    ))
                }
            </div>

            <Button style={{ padding: '10px' }} text={"Load More"} classNames="button-blue w-full mt-5 " handler={() => setNotificationLimit(notificationLimit + 30)}></Button>

        </div>
    );
}

export default Notification;
