import { Form, Input } from 'antd'
import { useEffect } from 'react'
import { UpdateProfileFields } from '../../Utils/FormFields/UpdateProfile'
import Button from '../Shared/Button'
import { makeFormData } from '../../Utils/makeFormData'
import { useUpdateUserMutation } from '../../Redux/Apis/authApi'
import toast from 'react-hot-toast'
import Loading from '../Shared/Loading'

const UpdateProfileForm = ({ image, data }) => {
    const [form] = Form.useForm();
    // rtk  query
    const [updateProfile, { isLoading }] = useUpdateUserMutation()
    //handler
    const onUpdateProfile = values => {
        if (image) {
            values.img = image
        }
        const formData = makeFormData(values)
        updateProfile(formData).unwrap().then((res) => {
            if (res?.success) {
                toast.success(res.message || 'Profile Updated successfully')
            } else {
                toast.error('something went wrong')
            }
        }).catch((err) => toast.error(err?.data?.message || 'something went wrong'))
    }
    // rtk query 


    //effects
    useEffect(() => {
        if (!data) return
        form.setFieldsValue({ ...data })
    }, [form, data])
    return (
        <Form
            onFinish={onUpdateProfile}
            form={form}
            className='w-[60%] grid-2 mx-auto bg-[var(--bg-white)] p-10 rounded-md card-shadow'
            layout='vertical'
        >
            {
                isLoading && <Loading />
            }
            {
                UpdateProfileFields?.map((item, i) => {
                    return <Form.Item key={item?.name} className={`${i === UpdateProfileFields.length - 1 ? 'col-span-2' : ''} pb-3`}
                        label={<span className='input-label'>{item?.label}</span>}
                        name={item?.name}
                        rules={[
                            {
                                message: item?.message,
                                required: item?.required
                            }
                        ]}
                    >
                        <Input className={`input ${item?.name === 'email' ? 'pointer-events-none' : ''}`} type={item?.type} placeholder={item?.placeholder} />
                    </Form.Item>
                })
            }
            <div className='center-center col-span-2 '>
                <Button classNames={`button-black`} style={{
                    borderRadius: '20px'
                }} text={` Update Profile`} />
            </div>
        </Form>
    )
}

export default UpdateProfileForm
