import { Form, Input } from 'antd'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { ResetPasswordFields } from '../../Utils/FormFields/ResetPassword'
import Button from '../../Components/Shared/Button'
import Password from 'antd/es/input/Password'
import { useResetPasswordMutation } from '../../Redux/Apis/authApi'
import Loading from '../../Components/Shared/Loading'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    //states
    const [password_type, set_password_type] = useState(null)
    const [confirm_password_type, set_confirm_password_type] = useState(null);
    const navigate = useNavigate()
    // rtk query  
    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    // handler
    const onSubmitLoginForm = value => {
        resetPassword(value).unwrap().then((res) => {
            if (res?.success) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('phone')
                toast.success(res.message || 'password Reset successfully please login')
                return navigate('/login')
            } else {
                toast.error('something went wrong')
            }
        }).catch((err) => toast.error(err?.data?.message || 'something went wrong'))
    }
    return (
        <div className='h-screen w-full center-center'>
            {
                isLoading && <Loading />
            }
            <Form
                className='max-w-[550px] w-full bg-[var(--bg-white)] p-10 py-20 rounded-md card-shadow'
                layout='vertical'
                onFinish={onSubmitLoginForm}
            >
                <p className='auth-heading text-center my-3'>reset Password</p>
                <p className='text text-center mb-8'>Please enter your new password</p>
                {
                    ResetPasswordFields?.map(item => {
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
                            <Input className='input' type={item?.name === 'confirm_password' ? `${confirm_password_type || item?.type}` : `${password_type || item?.type}`} placeholder={item?.placeholder} suffix={item?.name === 'password' ? (password_type ? <FaEye className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                                set_password_type(null)
                            }} /> : <FaEyeSlash className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                                set_password_type('text')
                            }} />) : item?.name === 'confirm_password' ? (confirm_password_type ? <FaEye className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                                set_confirm_password_type(null)
                            }} /> : <FaEyeSlash className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                                set_confirm_password_type('text')
                            }} />) : ''} />
                        </Form.Item>
                    })
                }
                <Button classNames={`button-black mt-8`} style={{
                    width: '100%',
                    borderRadius: '20px'
                }} text={`Reset Password`} />
            </Form>
        </div>
    )
}

export default ResetPassword
