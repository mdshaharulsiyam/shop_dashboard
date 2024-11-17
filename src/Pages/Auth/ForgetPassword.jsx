import { Form, Input } from 'antd'
import React from 'react'
import { ForgetPasswordFields } from '../../Utils/FormFields/ForgetPassword'
import Button from '../../Components/Shared/Button'
import { useForgetPasswordMutation } from '../../Redux/Apis/authApi'
import Loading from '../../Components/Shared/Loading'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation()
    const navigate = useNavigate()
    //states
    // handler
    const onSubmitLoginForm = value => {
        forgetPassword(value).unwrap().then((res) => {
            if (res?.success) {
                localStorage.setItem('phone', JSON.stringify(value?.phone))
                toast.success(res.message || 'a verification code has been sent to Phone Number')
                return navigate('/otp')
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
                <p className='auth-heading text-center my-3 mb-6'>Forget Password</p>
                {
                    ForgetPasswordFields?.map(item => {
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
                            <Input className='input' type={item?.type} placeholder={item?.placeholder} />
                        </Form.Item>
                    })
                }
                <Button classNames={`button-black mt-8`} style={{
                    width: '100%',
                    borderRadius: '20px'
                }} text={`Send a Code`} />
            </Form>
        </div>
    )
}


export default ForgetPassword
