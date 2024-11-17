import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import Loading from '../Shared/Loading';

const AddFaqForm = ({ addFaq, loading, setOpenModal }) => {
    const [form] = Form.useForm()
    //handler
    const onFinish = async (values) => {
        if (Array.isArray(values.faq)) {
            for (let i = 0; i < values.faq.length; i++) {
                const item = values.faq[i];
                try {
                    const res = await addFaq(item).unwrap();
                    toast.success(`FAQ ${i + 1} ${res?.message}` || 'FAQ added successfully');
                    i === values.faq.length - 1 && setOpenModal(false);
                } catch (err) {
                    toast.error(`FAQ ${i + 1} ${err?.data?.message}` || 'Something went wrong');
                    break;
                }
            }
        }
    };
    return (
        <Form className='w-full'
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            layout='vertical'
        >
            <p className='heading my-2'>Add FAQ</p>
            <Form.List name="faq">
                {(fields, { add, remove }) => {
                    return (
                        <>
                            {fields.map(({ key, name, ...restField }) => {
                                return (
                                    <div className='bg-[var(--bg-gray-20)] p-2 rounded-md mb-3'
                                        key={key}
                                    >

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'question']}
                                            label={<span>Question</span>}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'missing question ',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="question" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'answer']}
                                            label={<span>Answer</span>}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing answer',
                                                },
                                                // { validator: validateUnique },
                                            ]}
                                        >
                                            <TextArea className='h-[200px]' placeholder="answer" />
                                        </Form.Item >
                                        <button onClick={() => remove(name)} className='button-red ml-auto' style={{
                                            padding: '4px'
                                        }}>
                                            <RxCross2 size={20} />
                                        </button>
                                    </div>
                                )
                            })}
                            <Form.Item>
                                <button type="button" className='button-black ml-auto' onClick={() => add()} >
                                    <FaPlus /> Add field
                                </button>
                            </Form.Item>
                        </>
                    )
                }}
            </Form.List>
            <Form.Item className=''>
                <button onClick={() => toast.dismiss()} type="submit" disabled={loading} className='button-black mx-auto disabled:bg-slate-400 disabled:cursor-not-allowed' htmlType="submit">
                    {loading ? <Loading /> : 'Save'}
                </button>
            </Form.Item>
        </Form>
    )
}

export default AddFaqForm
