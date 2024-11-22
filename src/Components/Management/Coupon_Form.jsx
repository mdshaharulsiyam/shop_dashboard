import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useCreateCouponMutation, useUpdateCouponMutation } from "../../Redux/Apis/couponApi";
import toast from "react-hot-toast";

const Coupon_Form = ({ closeModal, initialData }) => {
    const [form] = Form.useForm();
    const [createCoupon] = useCreateCouponMutation();
    const [updateCoupon] = useUpdateCouponMutation();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    const handleFinish = async (values) => {
        try {
            if (initialData) {
                // Update coupon
                await updateCoupon({ id: initialData._id, ...values }).unwrap();
                toast.success("Coupon updated successfully");
            } else {
                // Create coupon
                await createCoupon(values).unwrap();
                toast.success("Coupon created successfully");
            }
            closeModal();
        } catch (error) {
            toast.error("Failed to save coupon");
        }
    };

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
                name="code"
                label="Coupon Code"
                rules={[{ required: true, message: "Please enter the coupon code" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="discount"
                label="Discount (%)"
                rules={[{ required: true, message: "Please enter the discount percentage" }]}
            >
                <InputNumber min={0} max={100} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
                name="totalAvailable"
                label="Total Count"
                rules={[{ required: true, message: "Please enter the discount percentage" }]}
            >
                <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <div className="flex justify-end gap-4">
                <Button onClick={closeModal}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                    {initialData ? "Update" : "Create"}
                </Button>
            </div>
        </Form>
    );
};

export default Coupon_Form;
