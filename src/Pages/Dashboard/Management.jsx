import React, { Suspense, useEffect, useState } from 'react'
import PageHeading from '../../Components/Shared/PageHeading'
import { TiPlus } from 'react-icons/ti'
import CategoryTable from '../../Components/Management/CategoryTable'
import BannerTable from '../../Components/Management/BannerTable'
import { Modal } from 'antd'
import Category_Form from '../../Components/Management/Category_Form'
const Management = () => {
    const [Files, setFiles] = useState([])
    const [open_category_banner_modal, set_open_category_banner_modal] = useState(false)
    const [category, setCategory] = useState(true)
    const [selected_data, set_selected_data] = useState({})
    const [action, setAction] = useState('add')
 
    return (
        <div className='bg-[var(--bg-white)] p-4 rounded-md'>
            <PageHeading text={`Management`} />
            <div className='between-center my-4'>
                <div className='start-center gap-6'>
                    <button onClick={() => setCategory(true)} className={`${category ? 'button-black' : 'button-white'}`}>
                        Category
                    </button>
                    <button onClick={() => setCategory(false)} className={`${!category ? 'button-black' : 'button-white'}`}>
                        Banner
                    </button>
                </div>
                <button onClick={() => { set_open_category_banner_modal(true); setAction('add') }} className='button-black'>
                    <TiPlus size={24} /> Add {category ? 'Category' : 'Banner'}
                </button>
            </div>
            {
                category ? <Suspense fallback={''}>
                    <CategoryTable
                        set_selected_data={set_selected_data}
                        set_open_category_banner_modal={set_open_category_banner_modal}
                        setAction={setAction}
                    />
                </Suspense> : <Suspense fallback={''}>
                    <BannerTable
                        set_selected_data={set_selected_data}
                        set_open_category_banner_modal={set_open_category_banner_modal}
                        setAction={setAction}
                    />
                </Suspense>
            }
            <Modal
                open={open_category_banner_modal}
                onCancel={() => { set_open_category_banner_modal(false); setFiles([]) }}
                centered
                footer={false}
            >
                <Category_Form
                />
            </Modal>
        </div>
    )
}

export default Management
