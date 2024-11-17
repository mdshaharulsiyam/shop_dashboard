import { Form, Input } from 'antd'
import React from 'react'
import Button from '../../Components/Shared/Button'
import { useNavigate } from 'react-router-dom'
import { useVerifyCodeMutation } from '../../Redux/Apis/authApi'
import Loading from '../../Components/Shared/Loading'
import toast from 'react-hot-toast'
const Otp = () => {
    //states
    const navigate = useNavigate();
    // rtk query
    const [verifyCode, { isLoading }] = useVerifyCodeMutation()
    // handler
    const onSubmitLoginForm = value => {
        const data = {
            ...value,
            phone: JSON.parse(localStorage.getItem('phone'))
        }
        verifyCode(data).unwrap().then((res) => {
            if (res?.success) {
                localStorage.setItem('accessToken', JSON.stringify(res?.accessToken))
                toast.success(res.message || 'Phone Number verified successfully')
                return navigate('/reset-password')
            } else {
                toast.error('something went wrong')
            }
        }).catch((err) => toast.error(err?.data?.message || 'something went wrong'))
    }
    const onChange = (text) => {

    };
    const sharedProps = {
        onChange,
    };
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
                <p className='auth-heading text-center my-3'>Verify Your Email</p>
                <p className='text text-center mb-8'>We sent a reset link to contact@dscode...com
                    enter 5 digit code that mentioned in the email</p>
                <Form.Item
                    className='text-center'
                    name={`code`}
                    rules={[
                        {
                            required: true,
                            message: 'please input your otp'
                        }
                    ]}
                >
                    <Input.OTP length={6} {...sharedProps} />
                </Form.Item>
                <Button classNames={`button-black mt-8`} style={{
                    width: '100%',
                    borderRadius: '20px'
                }} text={`Verify Code`} />
            </Form>
        </div>
    )
}
export default Otp
