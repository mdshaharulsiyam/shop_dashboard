import { Form, Input, Spin } from 'antd'
import React, { useState } from 'react'
import { LoginFields } from '../../Utils/FormFields/Login'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../Components/Shared/Button'
import { useGetProfileQuery, useLoginUserMutation } from '../../Redux/Apis/authApi'
import toast from 'react-hot-toast'
import Loading from '../../Components/Shared/Loading'

const Login = () => {
    const { data, isLoading: fetchingProfile, isError, error } = useGetProfileQuery()
    const navigate = useNavigate()
    const location = useLocation()
    if (localStorage.getItem('token') && (!fetchingProfile && data?.data?.role === 'ADMIN')) {
        navigate(location?.state || '/')
    }
    //states
    const [password_type, set_password_type] = useState(null)
    const [LoginUser, { isLoading }] = useLoginUserMutation()

    // handler
    const onSubmitLoginForm = (value) => {
        LoginUser(value).unwrap().then((res) => {
            if (res.data?.role !== 'ADMIN') {
                return toast.error('You are not authorized to access this page.')
            }
            localStorage.setItem('token', JSON.stringify(res?.token))
            toast.success(res.data?.message || 'logged in successfully')
            window.location.reload()
            return navigate(location?.state || '/')
        })
            .catch((err) => toast.error(err.data.message || 'something went wrong'))
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
                <p className='auth-heading text-center my-3'>Login to Account</p>
                <p className='text text-center mb-8'>Please enter your email and password to continue</p>
                {
                    LoginFields?.map(item => {
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
                            <Input className='input' type={password_type || item?.type} placeholder={item?.placeholder} suffix={item?.name === 'password' ? (password_type ? <FaEye className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                                set_password_type(null)
                            }} /> : <FaEyeSlash className='text-lg hover:scale-105 active:scale-95 cursor-pointer' onClick={() => {
                                set_password_type('text')
                            }} />) : ''} />
                        </Form.Item>
                    })
                }
                <Form.Item
                    name={`remember`}
                >
                    <div className=' between-center'>
                        <div className='start-center w-fit  gap-2'>
                            <Input className='w-fit cursor-pointer ' id='checkbox' type='checkbox' />
                            <label className='text-[var(--color-gray)] ml-1 cursor-pointer' htmlFor='checkbox'>
                                Remember Password
                            </label>
                        </div>
                        <Link className='text ' to={`/forget-password`}>
                            Forget Password?
                        </Link>
                    </div>
                </Form.Item>
                <Button classNames={`button-black mt-8`} style={{
                    width: '100%',
                    borderRadius: '20px'
                }} text={`Sign in`} />
            </Form>
        </div>
    )
}

export default Login
