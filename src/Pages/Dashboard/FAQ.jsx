import React, { useState } from 'react'
import PageHeading from '../../Components/Shared/PageHeading'
import Button from '../../Components/Shared/Button'
import { MdDelete, MdNotInterested } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import { Modal } from 'antd'
import AddFaqForm from '../../Components/FAQ/AddFaqForm'
import { useAddFaqMutation, useDeleteFaqMutation, useGetAllFaqQuery } from '../../Redux/Apis/faq'
import Loading from '../../Components/Shared/Loading'
import toast from 'react-hot-toast'

const FAQ = () => {
    // sates 
    const [openModal, setOpenModal] = useState()
    //rtk query
    const { data, isLoading, isError } = useGetAllFaqQuery()
    const [addFaq, { isLoading: loading }] = useAddFaqMutation()
    const [deleteFaq, { isLoading: deleteLoading }] = useDeleteFaqMutation()
    //  handler 
    const deleteHandler = (id) => {
        toast((t) => (
            <span>
                <p>are you sure wants to delete this faq?</p>
                <span className='start-center gap-2 mt-1'>
                    <Button handler={() => {
                        toast.dismiss(t.id)
                        deleteFaq(id).unwrap().then((res) => toast.success(res?.message || 'Faq deleted successfully')).catch((err) => toast.error(err?.data?.message || 'something went wrong'))
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
    return (
        <div className='bg-[var(--bg-gray-20)] p-4 rounded-md'>
            {
                (loading || isLoading || deleteLoading) && <Loading />
            }
            <PageHeading text={`FAQ`} />
            <div className='grid-2 gap-4 mt-6'>
                {
                    data?.data?.map((item, i) => {
                        return <div className='w-full h-full' key={i}>
                            <div className='start-center gap-2'>
                                <p>Question</p> <Button handler={() => { toast.dismiss(); deleteHandler(item?._id); }} icon={<MdDelete />} classNames={`button-red`} style={{
                                    padding: '4px'
                                }} />
                            </div>
                            <p className='bg-[var(--bg-white)] p-2 rounded-md my-2 mb-4'>{item.question}</p>
                            <p>Answer</p>
                            <p className='leading-7 text-justify mt-2'>{item?.answer}</p>
                        </div>
                    })
                }
            </div>
            <Button handler={() => setOpenModal(true)} text={`Add new question`} classNames={`button-black mx-auto mt-10`} icon={<FaPlus />} />
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={false}
                centered
                width={600}
            >
                <AddFaqForm addFaq={addFaq} loading={loading} setOpenModal={setOpenModal} />
            </Modal>
        </div>
    )
}

export default FAQ
