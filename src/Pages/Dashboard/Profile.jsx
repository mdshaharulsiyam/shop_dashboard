import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/Shared/PageHeading'
import profileImage from '../../assets/icons/itachi.jpg'
import { MdEdit } from 'react-icons/md'
import UpdateProfileForm from '../../Components/Profile/UpdateProfileForm'
import UpdatePassword from '../../Components/Profile/UpdatePassword'
import { useGetProfileQuery } from '../../Redux/Apis/authApi'
import { url } from '../../Utils/BaseUrl'
const Profile = () => {
    // states  
    const [tab, set_tab] = useState('edit_profile')
    const [image, setImage] = useState(null)
    const { data, isLoading, isError, error, isFetching } = useGetProfileQuery()
    return (
        <div className='bg-[var(--bg-gray-20)] p-4 rounded-md'>
            <PageHeading text={`Profile`} />
            <div className='center-center flex-col gap-6 mt-6 pb-4'>
                <div className='w-[60%]  mx-auto rounded-md bg-[var(--bg-white)] p-6 center-center flex-col gap-3 relative'>
                    <img src={image ? URL.createObjectURL(image) : data?.data?.img ? `${url}/${data?.data?.img}` : profileImage} className='w-24 h-24 object-cover rounded-full' alt="profileImage" />
                    <p className='heading'>{data?.data?.name}</p>
                    {
                        tab === 'edit_profile' && <label htmlFor="profileImage">
                            <MdEdit size={24} className='absolute right-2 top-2 cursor-pointer' />
                            <input onChange={(e) => {
                                setImage(e.target.files[0])
                            }} type="file" hidden id='profileImage' />
                        </label>
                    }
                </div>
                <div className='center-center gap-3'>
                    <button onClick={() => set_tab('edit_profile')} className={`${tab === 'edit_profile' ? 'button-black' : 'button-white'}`}>
                        Update Profile
                    </button>
                    <button onClick={() => set_tab('change_password')} className={`${tab === 'change_password' ? 'button-black' : 'button-white'}`}>
                        Change Password
                    </button>
                </div>
                {
                    tab === 'edit_profile' ? < UpdateProfileForm image={image} data={data?.data} /> : <UpdatePassword />
                }
            </div>
        </div>
    )
}

export default Profile
