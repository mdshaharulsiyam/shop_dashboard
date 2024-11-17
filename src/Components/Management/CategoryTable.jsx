import React, { useState } from 'react'
import UserImageName from '../Shared/UserImageName'
import {  Table } from 'antd'
import {  MdDelete, MdEdit, MdNotInterested } from 'react-icons/md'
import { useDeleteCategoryMutation, useGetCategoryQuery } from '../../Redux/Apis/categoryApi'
import Loading from '../Shared/Loading'
import toast from 'react-hot-toast'
import Button from '../Shared/Button'


const CategoryTable = ({ set_selected_data, set_open_category_banner_modal, setAction }) => {
    // states
    const [page, setPage] = useState(new URLSearchParams(location.search).get('page') || 1)
    // rtk query
    const { data, isLoading, isError, error } = useGetCategoryQuery(page)
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()
    // handler
    const handleDelete = id => {
        toast.dismiss()
        toast((t) => (
            <span>
                <p>are you sure wants to delete this Category?</p>
                <span className='start-center gap-2 mt-1'>
                    <Button handler={() => {
                        toast.dismiss(t.id)
                        deleteCategory(id).unwrap().then((res) => toast.success(res?.message || 'Category deleted successfully')).catch((err) => toast.error(err?.data?.message || 'something went wrong'))
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
            title: 'Category Name',
            dataIndex: 'category',
            key: 'category',
            render: (_, record) => <UserImageName name={record?.name} image={record?.img} />
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
    return (
        <>
            <Table dataSource={data?.data} columns={columns} pagination={{
                pageSize: data?.pagination.itemsPerPage || 10,
                total: data?.pagination?.totalItems || 0,
                current: page || 1,
                onChange: (page) => setPage(page),
                showSizeChanger: false
            }} />
            {
                isDeleting && <Loading />
            }
        </>
    )
}

export default CategoryTable
