
import toast from 'react-hot-toast'
import UserImageName from './UserImageName'
import { Table } from 'antd'
import { useTransferbalanceMutation } from '../../Redux/Apis/paymentApis'
import { MdOutlinePayment } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import Loading from './Loading'
import Button from './Button'

const AppointmentTable = ({ data, pagination }) => {
    //    // rtk query
    const [transferbalance, { isLoading }] = useTransferbalanceMutation()

    // handler 
    // give doctor payment  
    const handleDoctorPayment = (record) => {
        toast.dismiss()
        toast((t) => (
            <span>
                <p>Confirm Payment for {record?.doctorId?.name} amount ${record?.doctorId?.appointment_fee}</p>
                <span className='start-center gap-2 mt-1'>
                    <Button style={{
                        padding: '3px ',
                        borderRadius: '3px'
                    }} classNames={`button-red `} text={`no`} icon={<RxCross2 />} handler={() => toast.dismiss(t.id)}>

                    </Button>
                    <Button handler={() => {
                        toast.dismiss()
                        transferbalance({ doctorId: record?.doctorId?._id, appointmentId: record?._id }).unwrap().then((res) => { console.log(res); toast.success(res?.message || 'Category deleted successfully') }).catch((err) => toast.error(err?.data?.message || 'something went wrong'))
                    }} icon={<MdOutlinePayment />} text={`pay`} classNames={`button-green`} style={{
                        padding: '4px'
                    }} >

                    </Button>
                </span>
            </span>
        ));
    }
    // table columns
    const columns = [
        // {
        //     title: '#Sl',
        //     dataIndex: 'key',
        //     key: 'key',
        // },
        {
            title: 'Patient Name',
            dataIndex: 'userId',
            key: 'userId',
            render: (_, record) => {
                return <UserImageName name={record?.userId?.name} image={record?.userId?.img} />
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_) => <p>{_.split('T')[0]}</p>
        },
        {
            title: 'Consulting Doctor',
            dataIndex: 'doctorId',
            key: 'doctorId',
            render: (_, record) => {
                return <UserImageName name={record?.doctorId?.name} image={record?.doctorId?.img} />
            }
        },
        {
            title: 'Doctor Type',
            dataIndex: 'doctorId',
            key: 'doctorId',
            render: (_, record) => <p>{record?.doctorId?.specialization}</p>
        },
        {
            title: 'Fee',
            dataIndex: 'doctorId',
            key: 'doctorId',
            render: (_, record) => <p>${record?.doctorId?.appointment_fee}</p>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {
                const color = record?.status === 'pending' ? 'orange' : record?.status === 'completed' ? 'green' : record?.status === 'accepted' ? 'blue' : 'red'
                return <button style={{
                    color: `${color}`,
                    border: `1.5px solid ${color}`
                }} className={`button-green`}>{status}</button>
            }
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => {
                const isDisabled = record?.status === 'completed' && record?.payment_status && !record?.doctor_payment ? false : true;
                const color = (record?.status === 'completed' && record?.payment_status && !record?.doctor_payment) ? 'orange' : (!record?.status === 'completed' && record?.payment_status && !record?.doctor_payment) ? 'green' : 'red'
                return <button onClick={() => handleDoctorPayment(record)} disabled={isDisabled} style={{
                    color: `white`,
                    background: isDisabled ? 'gray' : `${color}`,
                    border: `1.5px solid ${isDisabled ? 'gray' : `${color}`}`
                }} className='button-green font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed'>
                    {(record?.status === 'completed' && record?.payment_status && !record?.doctor_payment) ? 'pay' : record?.doctor_payment ? 'paid' : 'pending'}
                </button>
            }
        }

    ]
    return (
        <>
            {
                isLoading && <Loading />
            }
            <Table dataSource={data} columns={columns} pagination={pagination ? {
                pageSize: pagination?.limit || 10,
                total: pagination?.total || 0,
                current: pagination?.current || 1,
                onChange: (page) => {
                    if (pagination?.handler) {
                        pagination?.handler(page)
                    }
                },
                showSizeChanger: false
            } : false} />
        </>
    )
}

export default AppointmentTable
