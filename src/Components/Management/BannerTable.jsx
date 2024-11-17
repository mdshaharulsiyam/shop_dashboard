import React, { useState } from 'react'
import UserImageName from '../Shared/UserImageName'
import { Modal, Table } from 'antd'
import {  MdDelete, MdEdit,MdNotInterested } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'
import ChangeBannerOrder from './ChangeBannerOrder'
import Category_Banner_Form from './Category_Form'
import { useGetBannerQuery, useUpdateBannerOrderMutation, useUpdateBannerStatusMutation, useDeleteBannerMutation } from '../../Redux/Apis/bannerApi'
import Loading from '../Shared/Loading'
import toast from 'react-hot-toast'
import Button from '../Shared/Button'

const BannerTable = ({ set_selected_data, set_open_category_banner_modal, setAction }) => {
    // states
    const [page, setPage] = useState(new URLSearchParams(location.search).get('page') || 1)
    const [openOrderChangeModal, setOpenOrderChangeModal] = useState(false)
    //rtk query
    const { data, isLoading, isError, error } = useGetBannerQuery(page)
    const [updateBannerStatus, { isLoading: isLoadingUpdateBannerStatus }] = useUpdateBannerStatusMutation()
    const [updateBannerOrder, { isLoading: isLoadingUpdateBannerOrder }] = useUpdateBannerOrderMutation()
    const [deleteBanner, { isLoading: isLoadingDeleteBanner }] = useDeleteBannerMutation()
    // handler
    //update banner status
    const UpdateBannerStatus = (id, isActive) => {
        toast.dismiss()
        updateBannerStatus(id).unwrap().then((res) => {
            if (res?.success) {
                toast.success(res?.message || `Banner status ${isActive ? 'activated' : 'deactivated'} successfully`)
            } else {
                toast.error(res?.message || 'something went wrong')
            }
        }).catch((err) => toast.error(err?.data?.message || 'something went wrong'))
    }
    // delete banner
    const handleDelete = id => {
        toast.dismiss()
        toast((t) => (
            <span>
                <p>are you sure wants to delete this Banner?</p>
                <span className='start-center gap-2 mt-1'>
                    <Button handler={() => {
                        toast.dismiss(t.id)
                        deleteBanner(id).unwrap().then((res) => toast.success(res?.message || 'Category deleted successfully')).catch((err) => toast.error(err?.data?.message || 'something went wrong'))
                    }} icon={<MdDelete />} classNames={`button-red`} style={{
                        padding: '4px'
                    }} />
                    <Button style={{
                        padding: '3px ',
                        borderRadius: '3px'
                    }} classNames={`button-green`} icon={<MdNotInterested />} handler={() => toast.dismiss(t.id)}>
                        no
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
        //     key: 'key'
        // },
        {
            title: (<div className='start-center gap-3'>
                Order
                <button onClick={() => setOpenOrderChangeModal(true)} style={{
                    padding: '3px 10px'
                }} className='button-black' type="button">
                    change
                </button>
            </div>),
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: 'Banner',
            dataIndex: 'banner',
            key: 'banner',
            render: (_, record) => <UserImageName image={record?.img} />
        },
        {
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (_, record) => {
                return <button onClick={() => UpdateBannerStatus(record?._id, record?.isActive)}>
                    {_ ? <FaCheck size={24} className='text-[var(--color-green)] hover:scale-110 active:scale-95 transition-all' /> : <RxCross2 size={24} className='text-[var(--color-red)] hover:scale-110 active:scale-95 transition-all' />}
                </button>
            }
        },
        {
            title: 'actions',
            dataIndex: 'key',
            key: 'key ',
            render: (_, record) => <div className='start-center gap-3 w-fit'>
                <button onClick={() => {
                    set_selected_data(record)
                    setAction('update')
                    set_open_category_banner_modal(true)
                }} style={{
                    padding: '10px'
                }} className='button-black'>
                    <MdEdit size={24} />
                </button>
                <button onClick={() => handleDelete(record?._id)} style={{
                    padding: '10px'
                }} className='button-red'>
                    <MdDelete size={24} />
                </button>
            </div>
        },
    ]
    return (//onClick={() => handleDelete(record?._id)}
        <>
            <Table dataSource={data?.data} columns={columns} pagination={{
                pageSize: data?.pagination?.itemsPerPage || 10,
                total: data?.pagination?.totalItems || 0,
                current: page || 1,
                onChange: (page) => setPage(page),
                showSizeChanger: false
            }} />
            {
                (isLoading || isLoadingUpdateBannerStatus || isLoadingUpdateBannerOrder) && <Loading />
            }
            <Modal
                open={openOrderChangeModal}
                onCancel={() => setOpenOrderChangeModal(false)}
                footer={false}
                centered
                width={600}
            >
                <ChangeBannerOrder updateBannerOrder={updateBannerOrder} data={data?.data} closeModal={() => setOpenOrderChangeModal(false)} />
            </Modal>
        </>
    )
}


export default BannerTable
