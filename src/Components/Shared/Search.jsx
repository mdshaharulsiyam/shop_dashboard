import { Button, Form, Input } from 'antd'
import React, { useEffect, useRef } from 'react'
import { CiSearch } from 'react-icons/ci'
import { RxCross2 } from 'react-icons/rx'

const Search = ({ placeholder, handler, icon }) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({})
    }, [])
    return (
        <Form
            form={form}
        >
            <Form.Item
                name={`search`}
            >
                <Input onChange={(e) => {
                    if (handler) {
                        handler(e.target.value)
                    }
                }} prefix={icon ? icon : <CiSearch />} suffix={<button type='button'><RxCross2 className='cursor-pointer' onClick={() => {
                    handler('')
                    form.resetFields()

                }} /></button>} placeholder={placeholder ? placeholder : 'search here ...'} />
            </Form.Item>
        </Form>
    )
}

export default Search
