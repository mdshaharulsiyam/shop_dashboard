import { Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Button from '../../Components/Shared/Button'
import { UpdatePasswordFields } from '../../Utils/FormFields/UpdatePassword'
import { useChangePasswordMutation } from '../../Redux/Apis/authApi'
import toast from 'react-hot-toast'
import Loading from '../Shared/Loading'

const UpdatePassword = () => {
    //states
    const [form] = Form.useForm()
    const [old_password_type, set_old_password_type] = useState(null)
    const [password_type, set_password_type] = useState(null)
    const [confirm_password_type, set_confirm_password_type] = useState(null);
    // rtk query 
    const [changePassword, { isLoading }] = useChangePasswordMutation()
    // handler
    const onSubmitResetForm = value => {
        if (value?.old_password === value.password) return toast.error('your old password cant be your new password')
        if (value?.confirm_password !== value.password) return toast.error("confirm password doesn't match")
        changePassword(value).unwrap().then((res) => {
            if (res.success) {
                toast.success(res.message || 'Password Changed Successfully')
                form.resetFields()
            } else {
                toast.error('something went wrong')
            }
        }).catch((err) => toast.error(err.data?.message || 'something went wrong'))
    }
    const OnResetFields = () => {
        form.resetFields()
    }
    useEffect(() => {
        form.setFieldsValue()
    }, [form])
    return (
        <Form
            className='max-w-[550px] w-full bg-[var(--bg-white)] p-10 rounded-md card-shadow'
            layout='vertical'
            onFinish={onSubmitResetForm}
            form={form}
        >
            {
                isLoading && <Loading />
            }
            {
                UpdatePasswordFields?.map(item => {
                    return <Form.Item key={item?.name} className='pb-3'
                        label={<span className='input-label'>{item?.label}</span>}
                        name={item?.name}
                        rules={[
                            {
                                message: item?.message,
                                required: item?.required
                            }
                        ]}
                    >
                        <Input className='input' type={item?.name === 'confirm_password' ? `${confirm_password_type || item?.type}` : item?.name === 'old_Password' ? `${old_password_type || item?.type}` : `${password_type || item?.type}`} placeholder={item?.placeholder} suffix={item?.name === 'password' ? (password_type ? <FaEye className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                            set_password_type(null)
                        }} /> : <FaEyeSlash className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                            set_password_type('text')
                        }} />) : item?.name === 'confirm_password' ? (confirm_password_type ? <FaEye className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                            set_confirm_password_type(null)
                        }} /> : <FaEyeSlash className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                            set_confirm_password_type('text')
                        }} />) : item?.name === 'old_Password' ? (old_password_type ? <FaEye className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                            set_old_password_type(null)
                        }} /> : <FaEyeSlash className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                            set_old_password_type('text')
                        }} />) : ''} />
                    </Form.Item>
                })
            }
            <div className='center-center gap-3'>
                <Button classNames={`button-white mt-8`} type={`button`} handler={OnResetFields} style={{
                    borderRadius: '20px'
                }} text={`Reset`} />
                <Button classNames={`button-black mt-8`} style={{
                    borderRadius: '20px'
                }} text={`Confirm`} />
            </div>
        </Form>
    )
}

export default UpdatePassword
